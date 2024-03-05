import {
  type TSendOrderRequest,
  type TSendOrderResponse,
} from "../../types/types.ts";
import { getTokens } from "../utils/tokens.ts";
import { api } from "./api.ts";

export const ordersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendOrder: builder.mutation<TSendOrderResponse, TSendOrderRequest>({
      query: ({ ingredients }) => {
        const { accessToken } = getTokens();
        return {
          url: "orders",
          method: "POST",
          body: { ingredients },
          headers: {
            Authorization: accessToken,
          },
        };
      },
    }),
  }),
});

export const { useSendOrderMutation } = ordersApi;
