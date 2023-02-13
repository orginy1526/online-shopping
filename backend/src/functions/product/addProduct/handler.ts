import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";
import productModel from "../productModel";
import { v4 } from "uuid";

const addProduct: ValidatedEventAPIGatewayProxyEvent<
  typeof productModel
> = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const id = v4();
  const created_at = new Date().toLocaleDateString();

  const product = {
    id,
    category: event.body.category,
    user_id: event.body.user_id,
    product_name: event.body.product_name,
    price: event.body.price,
    image: event.body.image,
    created_at,
  };
  const params = {
    TableName: "ProductTable",
    Item: product,
  };
  await dynamoDb.put(params).promise();

  return formatJSONResponse({ product: product });
};

export const main = middyfy(addProduct);
