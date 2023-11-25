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
  maxAge: 1000 * 60 * 10,
});

const getArticles = async (
  pubDate: string,
  lastEvaluated?: TLastEvaluatedKeyForAllSources
) => {
  const params = {
    TableName: DYNAMODB_FULL_TABLE,
    KeyConditionExpression: "#pubDate = :pubDate",
    ExpressionAttributeNames: {
      "#pubDate": "pubDate",
    },
    ExpressionAttributeValues: {
      ":pubDate": pubDate,
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
  maxAge: 1000 * 60 * 10,
});

const dynamoDBController = {
  getArticles: memoizedGetArticles,
  getArticlesForSource: memoizedGetArticlesForSource,
};

export default dynamoDBController;
