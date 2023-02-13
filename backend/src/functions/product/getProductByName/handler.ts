import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";

const getProductByName = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "ProductTable",
    FilterExpression: "#product_name = :product_name",
    ExpressionAttributeNames: {
      "#product_name": "product_name",
    },
    ExpressionAttributeValues: {
      ":product_name": event.pathParameters.name,
    },
  };
  const product = await dynamoDb.scan(params).promise();

  return formatJSONResponse({ product: product.Items });
};

export const main = middyfy(getProductByName);
