import { Middleware, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { TSocketMiddlewareOptions } from "../../types/types.ts";

export function socketMiddleware(
  socketActions: TSocketMiddlewareOptions
): Middleware {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action: UnknownAction | unknown) => {
      console.log(action);
      const { dispatch } = store;
      const { type, payload } = action as PayloadAction<unknown>;
      const { connectActionType, disconnectActionType, inboundMessageActionType } = socketActions;

      if (type === connectActionType) {
        socket = new WebSocket(payload as string);
      }

      if (type === disconnectActionType && socket) {
        socket.close(1000);
        socket = null;
      }

      if (socket) {
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { success, ...message } = parsedData;
          dispatch({ type: inboundMessageActionType, payload: message})
        };
      }

      next(action);
    };
  };
}
