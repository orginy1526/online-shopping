import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";

const getUser = async (event: { pathParameters: { id: any; }; }) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  const params = {
    TableName: "UserTable",
    Key: { id },
  };
  const user = await dynamoDb.get(params).promise();

  return formatJSONResponse({ user: user.Item });
};

export const main = middyfy(getUser);
