export const socketMiddleware = (socketActions) => {
  return store => {
    let socket = null;
    let messageProccessing = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload, messageProccessingHandler } = action;
      const { connectOn, disconnectOn, onOpen, onClose, onError, onInboundMessage, onOutboundMessage } = socketActions;

      if (type === connectOn) {
        socket = new WebSocket(payload);
        if (typeof messageProccessing === "function") {
          messageProccessing = messageProccessingHandler;
        }
      }

      if (socket) {
        socket.onopen = event => {
          onOpen && onOpen.forEach(func => dispatch(func(event)));
        };

        socket.onerror = event => {
          onError && onError.forEach(func => dispatch(func(event)));
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          let { success, ...message } = parsedData;
          if (typeof messageProccessing === "function") {
            message = messageProccessing(message);
          }
          onInboundMessage && onInboundMessage.forEach(func => dispatch(func(message)));
        };

        socket.onclose = event => {
          onClose && onClose.forEach(func => dispatch(func(event)));
        };

        if (type === onOutboundMessage) {
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        }

        if (type === disconnectOn && socket.readyState === 1) {
          socket.close(1000);
          socket = null;
          messageProccessing = null;
        }
      }

      next(action);
    };
  };
};