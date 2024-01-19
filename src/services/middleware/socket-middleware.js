export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsConnect, wsConnecting, wsDisconnect, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      
      if (type === wsConnect) {
        socket = new WebSocket(`${payload}`);
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = event => {
          dispatch(onOpen(event));
        };

        socket.onerror = event => {
          dispatch(onError(event));
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch(onMessage(restParsedData));
        };

        socket.onclose = event => {
          dispatch(onClose(event));
        };

        if (type === wsSendMessage) {
             const message = { ...payload};
          socket.send(JSON.stringify(message));
        }

        if (type === wsDisconnect && socket.readyState === 1) {
          socket.close(1000);
          socket = null;
        }
      }

      next(action);
    };
  };
};