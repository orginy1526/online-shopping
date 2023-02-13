import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";

const getNumOfProducts = async () => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "ProductTable",
  };
  const products = await dynamoDb.scan(params).promise();

  return formatJSONResponse({ products_number: products.Count });
};

export const main = middyfy(getNumOfProducts);
