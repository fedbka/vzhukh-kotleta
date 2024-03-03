import { api } from "./api.ts";
import type {
  TSendOrderRequest,
  TSendOrderResponse,
} from "../../types/types.ts";
import { getTokens } from "../utils/tokens.ts";

export const ordersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendOrder: builder.mutation<TSendOrderResponse, unknown>({
      query: ({ ingredients }: TSendOrderRequest) => {
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
