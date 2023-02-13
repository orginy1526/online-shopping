import userModel from "./userModel";
import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "user/addUser",
        request: {
          schemas: {
            "application/json": userModel,
          },
        },
        cors: true,
      },
    },
  ],
};
