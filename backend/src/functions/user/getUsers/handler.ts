import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";

const getUsers = async () => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "UserTable",
  };
  const users = await dynamoDb.scan(params).promise();

  return formatJSONResponse({ users: users.Items });
};

export const main = middyfy(getUsers)
