import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";

const getProducts = async () => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "ProductTable",
  };
  const products = await dynamoDb.scan(params).promise();

  return formatJSONResponse({ products: products.Items });
};

export const main = middyfy(getProducts);
