// Ingredients types
export type TKindOfIngredient = "bun" | "sauce" | "main";

export type TIngredient = {
  _id: string;
  name: string;
  type: TKindOfIngredient;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TIngredients = TIngredient[];

export type TIngredientsState = {
  data: TIngredients;
};

export type TKindsOfIngredients = [
  { id: "bun"; name: "Булки" },
  { id: "sauce"; name: "Соусы" },
  { id: "main"; name: "Начинки" }
];

export type TGetIngredientsResponse = {
  success: boolean;
  data?: TIngredients;
};
// Cart types

export type TCartIngredient = TIngredient & { uuid: string };

export type TCartIngredients = TCartIngredient[];

export type TCartState = {
  data: TCartIngredients;
};

// auth & user Api types

export type TUser = {
  email: string;
  name: string;
};

export type TUserState = {
  name: string;
  email: string;
  isAuthenticated: boolean;
  isRecoveringPassword: boolean;
  isPasswordRecovered: boolean;
};

export type TLoginUserRequest = {
  email: string;
  password: string;
};

export type TLoginUserResponse = {
  success: boolean;
  user?: TUser;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
};

export type TLogoutUserRequest = {
  token: string;
};

export type TLogoutUserResponse = {
  success: boolean;
  message?: string;
};

export type TUpdateUserRequest = {
  name: string;
  email: string;
  password: string;
};

export type TUpdateUserResponse = {
  success: string;
  user?: TUser;
};

export type TResetPasswordRequest = {
  email: string;
};
export type TResetPasswordResponse = {
  success: boolean;
  message: string;
};

export type TRecoveryPasswordRequest = {
  password: string;
  token: string;
};

export type TRecoveryPasswordResponse = {
  success: boolean;
  message: string;
};

export type TRegisterUserRequest = {
  email: string;
  name: string;
  password: string;
};

export type TRegisterUserResponse = {
  success: boolean;
  user?: TUser;
  accessToken?: string;
  refreshToken?: string;
};

export type TRefreshTokenResponce = {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
};

export type TGetUserResponce = {
  success: boolean;
  user?: TUser;
}

export type TAuthState = {
  authenticated: boolean;
  user: TUser;
};


// orders
export type TOrderOwner = TUser & {
  createdAt: string;
  updatedAt: string;
};
export type TOrderStatus = "created" | "pending" | "canceled" | "done";

export type TOrderConfirmation = {
  ingredients: TIngredients;
  _id: string;
  owner: TOrderOwner;
  status: TOrderStatus;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
};

export type TSendOrderRequest = {
  ingredients: string[];
};

export type TSendOrderResponse = {
  success: boolean;
  name?: string;
  order?: TOrderConfirmation;
};

export type TOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: TOrderStatus;
  updatedAt: string;
  _id: string;
};

export type TOrders = TOrder[];

export type TGetOrdersResponse = {
  success: boolean;
  orders?: TOrders;
  total?: number;
  totalToday?: number;
  message?: string;
}

export type TOrdersState = {
  orderConfirmation: TOrderConfirmation | Record<string, never>;
  orders: TOrders;
  ordersIsLoading: boolean;
  ordersIsSuccess: boolean;
  ordersIsError: boolean;
  ordersQuantityForAllTime: number;
  ordersQuantityForToday: number;
};

export type TSocketMiddlewareOptions = {
  connectActionType: string;
  disconnectActionType: string;
  inboundMessageActionType: string;
};
