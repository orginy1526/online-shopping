import orderModel from "./orderModel";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "order/addOrder",cors:true,
        request: {
          schemas: {
            "application/json": orderModel,
          },
        },
      },
    },
  ],
};
