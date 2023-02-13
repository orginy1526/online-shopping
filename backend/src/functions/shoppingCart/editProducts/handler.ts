import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";

const editProducts = async (event: {
  body: {
    id: string;
    products: object;
    created_at: string;
  };
}) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "ShoppingCartTable",
    Key: { id: event.body.id, created_at: event.body.created_at },
    UpdateExpression:
      "SET products = :products",
    ExpressionAttributeValues: {
      ":products": event.body.products,
    },
    ReturnValues: "ALL_NEW",
  };
  const updated_shoppingCart = await dynamoDb.update(params).promise();

  return formatJSONResponse({
    updated_shoppingCart: updated_shoppingCart.Attributes,
  });
};

export const main = middyfy(editProducts);
