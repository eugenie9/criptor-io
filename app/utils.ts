const getSource = (id: string) => {
  switch (id) {
    case "beincrypto":
      return {
        name: "BeInCrypto",
        img: "https://beincrypto.com/feed/",
        logo: "/images/beincrypto-logo.jpeg",
      };
    case "bitcoin_news":
      return {
        name: "Bitcoin News",
        img: "https://news.bitcoin.com/feed/",
        logo: "/images/bitcoin-news-logo.png",
      };
    case "bitcoin_magazine":
      return {
        name: "Bitcoin Magazine",
        img: "https://bitcoinmagazine.com/feed",
        logo: "/images/bitcoin-magazine-logo.png",
      };
    case "coin_gape":
      return {
        name: "Coin Gape",
        img: "https://coingape.com/feed/",
        logo: "/images/coin-gape-logo.jpeg",
      };
    case "crypto_potato":
      return {
        name: "Crypto Potato",
        img: "https://cryptopotato.com/feed/",
        logo: "/images/crypto-potato-logo.webp",
      };
    case "crypto_slate":
      return {
        name: "Crypto Slate",
        img: "https://cryptoslate.com/feed/",
        logo: "/images/crypto-slate-logo.jpeg",
      };
    case "defiant":
      return {
        name: "The Defiant",
        img: "https://thedefiant.substack.com/feed/",
        logo: "/images/defiant-logo.jpeg",
      };
    case "forkast":
      return {
        name: "Forkast",
        img: "https://forkast.news/feed/",
        logo: "/images/forkast-logo.png",
      };
    case "protos":
      return {
        name: "Protos",
        img: "https://protos.com/feed/",
        logo: "/images/protos-logo.png",
      };
    default:
      return {
        name: "",
        img: "",
        logo: "",
      };
  }
};

const getHowManyTimePassed = (date: number) => {
  const now = new Date();
  const diff = now.getTime() - date;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor(
    ((diff % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) / (1000 * 60)
  );

  if (days > 0) {
    if (days == 1) return `${days} day ago`;
    else return `${days} days ago`;
  } else if (hours > 0) {
    if (hours == 1) return `${hours} hour ago`;
    else return `${hours} hours ago`;
  } else if (minutes > 0) {
    if (minutes == 1) return `${minutes} minute ago`;
    else return `${minutes} minutes ago`;
  }
};

export { getSource, getHowManyTimePassed };
