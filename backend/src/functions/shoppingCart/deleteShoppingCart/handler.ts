import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";

const deleteShoppingCart = async (event: { body: { id: string; created_at: string; }; }) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  await dynamoDb
    .delete({
      TableName: "ShoppingCartTable",
      Key: {
        id: event.body.id,
        created_at: event.body.created_at,
      },
    })
    .promise();

  return formatJSONResponse({ msg: "deleted successfully" });
};

export const main = middyfy(deleteShoppingCart);
