import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";
import shoppingCartModel from "../addShoppingCart/shoppingCartModel";
import { v4 } from "uuid";

const addShoppingCart: ValidatedEventAPIGatewayProxyEvent<
  typeof shoppingCartModel
> = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const id = v4();
  const created_at = new Date().toLocaleDateString();

  const shoppingCart = {
    id,
    user_id: event.body.user_id,
    products: event.body.products,
    price: event.body.price,
    cart_status: event.body.cart_status,
    created_at,
  };
  const params = {
    TableName: "ShoppingCartTable",
    Item: shoppingCart,
  };
  await dynamoDb.put(params).promise();

  return formatJSONResponse({ shoppingCart });
};

export const main = middyfy(addShoppingCart);
