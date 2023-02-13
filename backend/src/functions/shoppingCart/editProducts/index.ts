import shoppingCartModel from "./productModel";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "put",
        path: "shoppingCart/editProducts",cors:true,
        request: {
          schemas: {
            "application/json": shoppingCartModel,
          },
        },
      },
    },
  ],
};
