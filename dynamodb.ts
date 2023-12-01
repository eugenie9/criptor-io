import { DynamoDB } from "aws-sdk";
import memoizee from "memoizee";

const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE || "news-rss";
const DYNAMODB_FULL_TABLE =
  process.env.DYNAMODB_FULL_TABLE || "news-rss-full-date";

const dynamo = new DynamoDB.DocumentClient({
  region: "eu-central-1",
});

const getArticlesForSource = async (
  source: string,
  lastEvaluatedKey?: number
) => {
  const params = {
    TableName: DYNAMODB_TABLE,
    KeyConditionExpression: "#source = :source",
    ExpressionAttributeNames: {
      "#source": "source",
    },
    ExpressionAttributeValues: {
      ":source": source,
    },
    ScanIndexForward: false,
    Limit: 9,
    ExclusiveStartKey: lastEvaluatedKey
      ? { source, date: lastEvaluatedKey }
      : undefined,
  };

  const data = await dynamo.query(params).promise();

  return {
    items: data.Items,
    lastEvaluatedKey: data.LastEvaluatedKey?.date,
  };
};

const memoizedGetArticlesForSource = memoizee(getArticlesForSource, {
  promise: true,
  maxAge: 1000 * 60 * 2,
});

const getArticles = async (
  pubDate: string,
  lastEvaluated?: TLastEvaluatedKeyForAllSources
) => {
  const _pubDate = pubDate.split(" ")?.[1]?.split("-");
  const [year, month, day] = _pubDate;
  // if month or day is double digit, remove leading zero
  const _month = month[0] === "0" ? month[1] : month;
  const _day = day[0] === "0" ? day[1] : day;
  const _pubDateFormatted = `News ${year}-${_month}-${_day}`;

  const params = {
    TableName: DYNAMODB_FULL_TABLE,
    KeyConditionExpression: "#pubDate = :pubDate",
    ExpressionAttributeNames: {
      "#pubDate": "pubDate",
    },
    ExpressionAttributeValues: {
      ":pubDate": _pubDateFormatted,
    },
    ScanIndexForward: false,
    Limit: 9,
    ExclusiveStartKey: lastEvaluated ? lastEvaluated : undefined,
  };

  const data = await dynamo.query(params).promise();

  return {
    items: data.Items,
    lastEvaluatedKey: data.LastEvaluatedKey,
  };
};

const memoizedGetArticles = memoizee(getArticles, {
  promise: true,
  maxAge: 1000 * 60 * 2,
});

const dynamoDBController = {
  getArticles: memoizedGetArticles,
  getArticlesForSource: memoizedGetArticlesForSource,
};

export default dynamoDBController;
