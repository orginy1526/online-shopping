import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";

const getOrder = async (event: { pathParameters: { id: any } }) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "OrderTable",
    FilterExpression: "#user_id = :user_id",
    ExpressionAttributeNames: {
      "#user_id": "user_id",
    },
    ExpressionAttributeValues: {
      ":user_id": event.pathParameters.id,
    },
  };
  const order = await dynamoDb.scan(params).promise();
  order.Items.forEach((item) => {
    const dateString = item.sk;
    item.timestamp = new Date(dateString).getTime() / 1000;
  });

  order.Items.sort((a, b) => a.timestamp - b.timestamp);

  return formatJSONResponse({ order: order.Items[0] });
};

export const main = middyfy(getOrder);
