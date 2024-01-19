export const BASEURL = "wss://norma.nomoreparties.space/orders/all";

export const FEED_WS_CONNECT = "FEED_WS_CONNECT";
export const feedConnect = () => ({
  type: FEED_WS_CONNECT,
  payload: BASEURL,
});

export const FEED_WS_IS_CONNECTING = "FEED_WS_CONNECTING";
export const feedIsConnecting = () => ({
  type: FEED_WS_IS_CONNECTING,
});

export const FEED_WS_DISCONNECT = "FEED_WS_DISCONNECT";
export const feedDisconnect = () => ({
  type: FEED_WS_DISCONNECT,
});

export const FEED_WS_OPEN = "FEED_WS_OPEN";
export const feedOnOpen = (payload) => ({
  type: FEED_WS_OPEN,
  payload: payload,
});

export const FEED_WS_CLOSE = "FEED_WS_CLOSE";
export const feedOnClose = (payload) => ({
  type: FEED_WS_CLOSE,
  payload: payload,
});

export const FEED_WS_INBOUND_MESSAGE = "FEED_WS_INBOUND_MESSAGE";
export const feedOnMessage = (payload) => ({
  type: FEED_WS_INBOUND_MESSAGE,
  payload: payload,
});

export const FEED_WS_ERROR = "FEED_WS_ERROR";
export const feedOnError = (payload) => ({
  type: FEED_WS_ERROR,
  payload: payload,
});

export const feedMiddlewareActions = {
  wsConnect: FEED_WS_CONNECT,
  wsDisconnect: FEED_WS_DISCONNECT,
  wsConnecting: feedIsConnecting,
  onOpen: feedOnOpen,
  onClose: feedOnClose,
  onError: feedOnError,
  onMessage: feedOnMessage,
};
