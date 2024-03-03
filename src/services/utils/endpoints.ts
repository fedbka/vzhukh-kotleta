import { getTokens } from "./tokens.ts";

export const baseUrl = () : string => "wss://norma.nomoreparties.space/orders";

export const feedEndpoint = () : string => {
  const params = { point: "/all", withAuthorization: false };
  return endpoint(params);
};

export const orderHistoryEndpoint = () : string => {
  const params = { point: "", withAuthorization: true };
  return endpoint(params);
}

const endpoint = ({ point = "", withAuthorization = false }) : string => {
  const { accessToken } = getTokens();
  const url = baseUrl() + (!point ? "" : point) + (!withAuthorization || !accessToken ? "" : "?token=" + accessToken.split(' ')[1]);
  return url;
}