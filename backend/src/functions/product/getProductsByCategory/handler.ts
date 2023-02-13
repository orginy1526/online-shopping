import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";

const getProductsByCategory = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "ProductTable",
    FilterExpression: "#category = :category",
    ExpressionAttributeNames: {
      "#category": "category",
    },
    ExpressionAttributeValues: {
      ":category": event.pathParameters.category,
    },
  };
  const products = await dynamoDb.scan(params).promise();

  return formatJSONResponse({ products: products.Items });
};

export const main = middyfy(getProductsByCategory);
