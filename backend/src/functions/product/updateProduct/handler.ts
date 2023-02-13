import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import * as AWS from "aws-sdk";

const updateProduct = async (event) => {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  const id = event.pathParameters.id;

  const params = {
    TableName: "ProductTable",
    Key: { id },
    UpdateExpression:
      "SET category = :category, user_id = :user_id, product_name = :product_name, price = :price, image = :image",
    ExpressionAttributeValues: {
      ":category": event.body.category,
      ":user_id": event.body.user_id,
      ":product_name": event.body.product_name,
      ":price": event.body.price,
      ":image": event.body.image,
    },
    ReturnValues: "ALL_NEW",
  };
  const updated_product = await dynamoDb.update(params).promise();

  return formatJSONResponse({ updated_product: updated_product.Attributes });
};

export const main = middyfy(updateProduct);
