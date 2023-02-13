import shoppingCartModel from "../addShoppingCart/shoppingCartModel";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "shoppingCart/addShoppingCart",cors:true,
        request: {
          schemas: {
            "application/json": shoppingCartModel,
          },
        },
      },
    },
  ],
};