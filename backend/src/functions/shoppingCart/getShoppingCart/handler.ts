import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";

const getShoppingCart = async (event: { pathParameters: { id: any } }) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "ShoppingCartTable",
    FilterExpression: "#user_id = :user_id",
    ExpressionAttributeNames: {
      "#user_id": "user_id",
    },
    ExpressionAttributeValues: {
      ":user_id": event.pathParameters.id,
    },
  };
  const shoppingCart = await dynamoDb.scan(params).promise();
  shoppingCart.Items.forEach((item) => {
    const dateString = item.sk;
    item.timestamp = new Date(dateString).getTime() / 1000;
  });

  shoppingCart.Items.sort((a, b) => a.timestamp - b.timestamp);

  return formatJSONResponse({ shoppingCart: shoppingCart.Items[0] });
};

export const main = middyfy(getShoppingCart);
