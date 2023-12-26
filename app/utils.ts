import stopWords from "@/stopWords.json";

const getSource = (id: string) => {
  switch (id) {
    case "beincrypto":
      return {
        name: "BeInCrypto",
        logo: "/images/beincrypto-logo.jpeg",
      };
    case "bitcoin_news":
      return {
        name: "Bitcoin News",
        logo: "/images/bitcoin-news-logo.png",
      };
    case "bitcoin_magazine":
      return {
        name: "Bitcoin Magazine",
        logo: "/images/bitcoin-magazine-logo.png",
      };
    case "coin_gape":
      return {
        name: "Coin Gape",
        logo: "/images/coin-gape-logo.jpeg",
      };
    case "crypto_potato":
      return {
        name: "Crypto Potato",
        logo: "/images/crypto-potato-logo.webp",
      };
    case "crypto_slate":
      return {
        name: "Crypto Slate",
        logo: "/images/crypto-slate-logo.jpeg",
      };
    case "defiant":
      return {
        name: "The Defiant",
        logo: "/images/defiant-logo.jpeg",
      };
    case "forkast":
      return {
        name: "Forkast",
        logo: "/images/forkast-logo.png",
      };
    case "protos":
      return {
        name: "Protos",
        logo: "/images/protos-logo.png",
      };
    default:
      return {
        name: "",
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

const calculateMinutesToRead = (content: string) => {
  const wordsPerMinute = 200;
  const _content = content.replace(/<[^>]*>/g, "").split(/\s/g);
  const numberOfWords = _content.filter((word) => word !== "").length;
  return Math.ceil(numberOfWords / wordsPerMinute);
};

const remove = [
  "figure",
  "img",
  "amp",
  "target_",
  "object",
  "blank",
  "wfull",
  "rounded",
];

const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const monthsShort = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sept",
  "oct",
  "nov",
  "dec",
];

const extractKeywords = (content: string) => {
  // remove all figures
  let cleanText = content.replace(/<figure[^>]*>.*?<\/figure>/g, "");
  // remove all images
  cleanText = cleanText.replace(/<img[^>]*>/g, "");
  // remove all class attributes
  cleanText = cleanText.replace(/class="[^"]*"/g, "");
  // remove all html tags
  cleanText = cleanText.replace(/<[^>]*>/g, "");

  // remove all special characters
  cleanText = cleanText.replace(/[^\w\s]/gi, "");
  // remove all numbers
  cleanText = cleanText.replace(/\d+/g, "");
  // remove all extra spaces
  cleanText = cleanText.replace(/\s+/g, " ").trim();

  // convert to lowercase
  cleanText = cleanText.toLowerCase();

  // remove all months
  months.forEach((month) => {
    cleanText = cleanText.replace(new RegExp(month, "g"), "");
  });

  // remove all months
  monthsShort.forEach((month) => {
    cleanText = cleanText.replace(new RegExp(month, "g"), "");
  });

  // remove all the words starting with remove
  remove.forEach((word) => {
    cleanText = cleanText.replace(new RegExp(word, "g"), "");
  });

  // remove all stop words
  cleanText = cleanText
    .split(" ")
    .filter((word) => !stopWords.includes(word))
    .join(" ");

  // remove all extra spaces
  cleanText = cleanText.replace(/\s+/g, " ").trim();

  // split into words
  const words = cleanText.split(" ");

  // split into bigrams
  const bigrams = [];
  for (let i = 0; i < words.length - 1; i++) {
    bigrams.push(words[i] + " " + words[i + 1]);
  }

  // count the frequency of each word
  const frequency: {
    [key: string]: number;
  } = {};
  words.forEach((word) => {
    if (frequency[word]) {
      frequency[word]++;
    } else {
      frequency[word] = 1;
    }
  });

  // count the frequency of each bigram
  const frequency2: {
    [key: string]: number;
  } = {};
  bigrams.forEach((bigram) => {
    if (frequency2[bigram]) {
      frequency2[bigram]++;
    } else {
      frequency2[bigram] = 1;
    }
  });

  // sort the words by frequency
  const sortedWords = Object.entries(frequency).sort((a, b) => b[1] - a[1]);

  // sort the bigrams by frequency
  const sortedBigrams = Object.entries(frequency2).sort((a, b) => b[1] - a[1]);

  const keywords: string[] = [];

  sortedWords.slice(0, 10).forEach((word) => {
    keywords.push(word[0]);
  });

  sortedBigrams.slice(0, 10).forEach((bigram) => {
    keywords.push(bigram[0]);
  });

  return keywords;
};

export {
  getSource,
  getHowManyTimePassed,
  calculateMinutesToRead,
  extractKeywords,
};
