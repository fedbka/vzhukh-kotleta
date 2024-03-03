import { api } from "./api.ts";
import type { TGetIngredientsResponse, TIngredients } from "../../types/types.ts";

export const ingredientsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredients, void>({
      query: () => "ingredients",
      transformResponse: (response: TGetIngredientsResponse) =>
        response.success ? response.data ? response.data : [] : [],
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
