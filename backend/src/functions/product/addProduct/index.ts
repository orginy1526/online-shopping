import productModel from "../productModel";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "product/addProduct",
        request: {
          schemas: {
            "application/json": productModel,
          },
        },
        cors:true,
      },
    },
  ],
};
