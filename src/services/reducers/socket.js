import { SOCKET_OPEN, SOCKET_CLOSE, SOCKET_ERROR } from "../actions/socket";

const initialState = {
  isError: false,
  isConnected: false,
  errorMessage: "",
}

export const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case SOCKET_OPEN:
      return {
        ...state,
        isError: false,
        isConnected: true,
      }
    case SOCKET_CLOSE:
      return {
        ...state,
        isError: false,
        isConnected: false,
      }
    case SOCKET_ERROR:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload,
      }
    default:
      return state;
  }
}