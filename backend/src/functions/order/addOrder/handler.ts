import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";
import orderModel from "./orderModel";
import { v4 } from "uuid";

const addOrder: ValidatedEventAPIGatewayProxyEvent<typeof orderModel> = async (
  event
) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const id = v4();
  const created_at = new Date().toLocaleDateString();

  const order = {
    id,
    user_id: event.body.user_id,
    shopping_cart_id: event.body.shopping_cart_id,
    final_price: event.body.final_price,
    city: event.body.city,
    street: event.body.street,
    date_to_deliver: event.body.date_to_deliver,
    four_last_credit_digits: event.body.four_last_credit_digits,
    created_at,
  };
  const params = {
    TableName: "OrderTable",
    Item: order,
  };
  await dynamoDb.put(params).promise();

  return formatJSONResponse({ order });
};

export const main = middyfy(addOrder);
