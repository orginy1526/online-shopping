import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";

const updateShoppingCart = async (event: {
  body: {
    id: string;
    user_id: string;
    products: object;
    price: number;
    cart_status: string;
    created_at: string;
  };
}) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "ShoppingCartTable",
    Key: { id: event.body.id, created_at: event.body.created_at },
    UpdateExpression:
      "SET user_id = :user_id, products = :products, price = :price, cart_status = :cart_status",
    ExpressionAttributeValues: {
      ":user_id": event.body.user_id,
      ":products": event.body.products,
      ":price": event.body.price,
      ":cart_status": event.body.cart_status,
    },
    ReturnValues: "ALL_NEW",
  };
  const updated_shoppingCart = await dynamoDb.update(params).promise();

  return formatJSONResponse({
    updated_shoppingCart: updated_shoppingCart.Attributes,
  });
};

export const main = middyfy(updateShoppingCart);
