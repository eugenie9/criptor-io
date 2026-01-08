import memoizee from "memoizee";

const getCryptoPrices = async () => {
  try {
    const data = await fetch(
      'https://api.binance.com/api/v3/ticker/tradingDay?symbols=["BTCUSDT","ETHUSDT","BNBUSDT","XRPUSDT","SOLUSDT","TRXUSDT","DOGEUSDT","ADAUSDT","BCHUSDT","LINKUSDT"]',
      {
        method: "GET",
        redirect: "follow",
      }
    );
    const prices = await data.json();
    return prices;
  } catch (error) {
    return [];
  }
};

const memoizedGetCryptoPrices = memoizee(getCryptoPrices, {
  promise: true,
  maxAge: 1 * 60 * 1000,
});

const getMarketData = async () => {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/global");
    const result = await response.json();
    return result.data;
  } catch (error) {
    return {};
  }
};

const memoizedGetMarketData = memoizee(getMarketData, {
  promise: true,
  maxAge: 2 * 60 * 1000,
});

export default {
  getCryptoPrices: memoizedGetCryptoPrices,
  getMarketData: memoizedGetMarketData,
};
