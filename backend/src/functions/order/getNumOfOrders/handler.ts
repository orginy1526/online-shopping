import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";

const getNumOfOrders = async () => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "OrderTable",
  };
  const orders = await dynamoDb.scan(params).promise();

  return formatJSONResponse({ orders_number: orders.Count });
};

export const main = middyfy(getNumOfOrders);
