import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";
import userModel from "./userModel";
import { v4 } from "uuid";

const addUser: ValidatedEventAPIGatewayProxyEvent<typeof userModel> = async (
  event
) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const id = v4();
  const created_at = new Date().toLocaleDateString();

  const user = {
    id,
    first_name: event.body.first_name,
    last_name: event.body.last_name,
    email: event.body.email,
    password: event.body.password,
    city: event.body.city,
    street: event.body.street,
    created_at,
  };
  const params = {
    TableName: "UserTable",
    Item: user,
  };
  await dynamoDb.put(params).promise();

  return formatJSONResponse({ user:user });
};

export const main = middyfy(addUser);
