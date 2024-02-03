import { getTokens } from "./tokens";

export const baseUrl = () => "wss://norma.nomoreparties.space/orders";

export const feedEndpoint = () => {
  const params = { point: "/all", withAuthorization: false };
  return endpoint(params);
};

export const orderHistoryEndpoint = () => {
  const params = { point: "", withAuthorization: true };
  return endpoint(params);
}

const endpoint = ({ point = "", withAuthorization = false }) => {
  const { accessToken } = withAuthorization ? getTokens() : {};
  const url = baseUrl() + (!point ? "" : point) + (!accessToken ? "" : "?token=" + accessToken.split(' ')[1]);
  return url;
}