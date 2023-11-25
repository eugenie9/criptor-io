const getSource = (id: string) => {
  switch (id) {
    case "beincrypto":
      return {
        name: "BeInCrypto",
        img: "https://beincrypto.com/feed/",
        logo: "https://pbs.twimg.com/profile_images/1625052512217604096/40L-tsAx_400x400.jpg",
      };
    case "bitcoin_news":
      return {
        name: "Bitcoin News",
        img: "https://news.bitcoin.com/feed/",
        logo: "https://cryptomeister.com/wp-content/uploads/bitcoin-com-logo-1.png",
      };
    case "bitcoin_magazine":
      return {
        name: "Bitcoin Magazine",
        img: "https://bitcoinmagazine.com/feed",
        logo: "https://play-lh.googleusercontent.com/70cmIQiHpCI5TSDTrDYWYKhJhlLMtsh1A-XAu9JIgFh_EXbForpcbBxXiT9XzVCaRW4",
      };
    case "coin_gape":
      return {
        name: "Coin Gape",
        img: "https://coingape.com/feed/",
        logo: "https://pbs.twimg.com/profile_images/1515280697468112898/fbw5bH_J_400x400.jpg",
      };
    case "crypto_potato":
      return {
        name: "Crypto Potato",
        img: "https://cryptopotato.com/feed/",
        logo: "https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/roa33uraq1nbt0c35gby",
      };
    case "crypto_slate":
      return {
        name: "Crypto Slate",
        img: "https://cryptoslate.com/feed/",
        logo: "https://cryptoslate.com/wp-content/uploads/2018/05/c-logo.jpg",
      };
    case "defiant":
      return {
        name: "The Defiant",
        img: "https://thedefiant.substack.com/feed/",
        logo: "https://images.contactout.com/companies/b51893061168f2899b10e66322ffdbb9",
      };
    case "forkast":
      return {
        name: "Forkast",
        img: "https://forkast.news/feed/",
        logo: "https://forkast.news/wp-content/uploads/2021/06/Forkast-Logo-Only.png",
      };
    case "protos":
      return {
        name: "Protos",
        img: "https://protos.com/feed/",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbYL3ZAxSMaBxFLMMOlHVrJ5c6tSzMMFuhIjsp1y5JEALgDMY_CWr0onnUSiqhgprvqiY",
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
