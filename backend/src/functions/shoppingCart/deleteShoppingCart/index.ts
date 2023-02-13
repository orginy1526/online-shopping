import { handlerPath } from "@libs/handler-resolver";
import shoppingCartModel from "./shoppingCartModel";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "delete",
        path: "shoppingCart/deleteShoppingCart",cors:true,
        request: {
          schemas: {
            "application/json": shoppingCartModel,
          },
        },
      },
    },
  ],
};
