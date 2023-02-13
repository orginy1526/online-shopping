import productModel from "../productModel";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "put",
        path: "product/updateProduct/{id}",cors:true,
        request: {
          schemas: {
            "application/json": productModel,
          },
        },
      },
    },
  ],
};
