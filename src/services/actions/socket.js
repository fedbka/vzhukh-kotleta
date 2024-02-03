export const SOCKET_CONNECT = "SOCKET_CONNECT";
export const socketConnect = (payload) => ({
  type: SOCKET_CONNECT,
  payload: payload,
});

export const SOCKET_DISCONNECT = "SOCKET_DISCONNECT";
export const socketDisconnect = () => ({
  type: SOCKET_DISCONNECT,
});

export const SOCKET_OPEN = "SOCKET_OPEN";
export const socketOpen = (payload) => ({
  type: SOCKET_OPEN,
  payload: payload,
});

export const SOCKET_CLOSE = "SOCKET_CLOSE";
export const socketClose = (payload) => ({
  type: SOCKET_CLOSE,
  payload: payload,
});

export const SOCKET_ERROR = "SOCKET_ERROR";
export const socketError = (payload) => ({
  type: SOCKET_ERROR,
  payload: payload,
});

export const SOCKET_INBOUND_MESSAGE = "SOCKET_INBOUND_MESSAGE";
export const socketInboundMessage = (payload) => ({
  type: SOCKET_INBOUND_MESSAGE,
  payload: payload,
});

export const SOCKET_OUTBOUND_MESSAGE = "SOCKET_OUTBOUND_MESSAGE";
export const socketOutboundMessage = (payload) => ({
  type: SOCKET_OUTBOUND_MESSAGE,
  payload: payload,
});


export const socketActions = {
  connectOn: SOCKET_CONNECT,
  onConnect: [socketConnect],
  disconnectOn: SOCKET_DISCONNECT,
  onDisconnect: [],
  onOpen: [socketOpen, ],
  onClose: [socketClose, ],
  onError: [socketError, ],
  onInboundMessage: [socketInboundMessage, ],
  onOutboundMessage: socketOutboundMessage,
};
