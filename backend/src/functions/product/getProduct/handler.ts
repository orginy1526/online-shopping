import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";

const getProduct = async (event: { pathParameters: { id: any; }; }) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  const params = {
    TableName: "ProductTable",
    Key: { id },
  };
  const product = await dynamoDb.get(params).promise();

  return formatJSONResponse({ product: product.Item });
};

export const main = middyfy(getProduct);
