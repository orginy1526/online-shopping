import type { AWS } from "@serverless/typescript";

import addUser from "@functions/user/addUser";
import getUsers from "@functions/user/getUsers";
import getUser from "@functions/user/getUser";
import addProduct from "@functions/product/addProduct";
import getProducts from "@functions/product/getProducts";
import getProduct from "@functions/product/getProduct";
import getNumOfProducts from "@functions/product/getNumOfProducts";
import updateProduct from "@functions/product/updateProduct";
import getProductByName from "@functions/product/getProductByName";
import getProductByCategory from "@functions/product/getProductsByCategory";
import addOrder from "@functions/order/addOrder";
import getOrder from "@functions/order/getOrder";
import getNumOfOrders from "@functions/order/getNumOfOrders";
import addShoppingCart from "@functions/shoppingCart/addShoppingCart";
import getShoppingCart from "@functions/shoppingCart/getShoppingCart";
import getShoppingCartStatus from "@functions/shoppingCart/getShoppingCartStatus";
import updateShoppingCart from "@functions/shoppingCart/updateShoppingCart";
import deleteShoppingCart from "@functions/shoppingCart/deleteShoppingCart";
import editProducts from "@functions/shoppingCart/editProducts";

const serverlessConfiguration: AWS = {
  service: "translating-to-ts",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "dynamodb:DescribeTable",
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem",
            ],
            Resource: "arn:aws:dynamodb:us-east-1:138391825348:table/UserTable",
          },
          {
            Effect: "Allow",
            Action: [
              "dynamodb:DescribeTable",
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem",
            ],
            Resource:
              "arn:aws:dynamodb:us-east-1:138391825348:table/ProductTable",
          },
          {
            Effect: "Allow",
            Action: [
              "dynamodb:DescribeTable",
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem",
            ],
            Resource:
              "arn:aws:dynamodb:us-east-1:138391825348:table/OrderTable",
          },
          {
            Effect: "Allow",
            Action: [
              "dynamodb:DescribeTable",
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem",
            ],
            Resource:
              "arn:aws:dynamodb:us-east-1:138391825348:table/ShoppingCartTable",
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: {
    addUser,
    getUsers,
    getUser: getUser,
    addProduct,
    getProducts,
    getProduct,
    getNumOfProducts,
    updateProduct,
    getProductByName,
    getProductByCategory,
    addOrder,
    getOrder,
    getNumOfOrders,
    addShoppingCart,
    getShoppingCart,
    getShoppingCartStatus,
    updateShoppingCart,
    deleteShoppingCart,
    editProducts,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    dynamodb: {
      start: {
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev",
    },
  },
  resources: {
    Resources: {
      UserTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "UserTable",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        },
      },
      ProductTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "ProductTable",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        },
      },
      OrderTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "OrderTable",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
            {
              AttributeName: "created_at",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
            {
              AttributeName: "created_at",
              KeyType: "RANGE",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        },
      },
      ShoppingCartTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "ShoppingCartTable",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
            {
              AttributeName: "created_at",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
            {
              AttributeName: "created_at",
              KeyType: "RANGE",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
