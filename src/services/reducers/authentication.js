import { LOGIN_USER_FAILED, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_FAILED, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS, PASSWORD_RECOVERY_FAILED, PASSWORD_RECOVERY_REQUEST, PASSWORD_RECOVERY_SUCCESS, PASSWORD_RESET_FAILED, PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, REGISTER_USER_FAILED, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, RESET_USER_PROFILE, SET_USER_PROFILE, UPDATE_USER_PROFILE_FAILED, UPDATE_USER_PROFILE_REQUEST, UPDATE_USER_PROFILE_SUCCESS } from "../actions/authentication";

const initialState = {
  isFetching: false,
  userAuthenticated: false,
  passwordResetCodeSent: false,
  userProfile: { name: '', email: '' },
}

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        isFetching: true,
        userAuthenticated: false,
      }
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        isFetching: false,
      }
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        userAuthenticated: true,
      }
    }
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        isFetching: true,
      }
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        userAuthenticated: true,
      }
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        isFetching: false,
        userAuthenticated: false,
      }
    }
    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        isFetching: true,
        userAuthenticated: false,
      }
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        userAuthenticated: false,
      }
    }
    case LOGOUT_USER_FAILED: {
      return {
        ...state,
        isFetching: false,
        userAuthenticated: false,
      }
    }

    case PASSWORD_RECOVERY_REQUEST: {
      return {
        ...state,
        userAuthenticated: false,
        passwordResetCodeSent: false,
      }
    }
    case PASSWORD_RECOVERY_SUCCESS: {
      return {
        ...state,
        passwordResetCodeSent: true,
      }
    }
    case PASSWORD_RECOVERY_FAILED: {
      return {
        ...state,
        passwordResetCodeSent: false,
      }
    }

    case PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        userAuthenticated: false,
        passwordResetCodeSent: false,
      }
    }
    case PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        passwordResetCodeSent: true,
      }
    }
    case PASSWORD_RESET_FAILED: {
      return {
        ...state,
        passwordResetCodeSent: false,
      }
    }

    case SET_USER_PROFILE: {
      return {
        ...state,
        userProfile: {...action.payload},
      }
    }
    case RESET_USER_PROFILE: {
      return {
        ...state,
        isFetching: false,
        userProfile: initialState.userProfile,
        userAuthenticated: false,
      }
    }
    case UPDATE_USER_PROFILE_REQUEST: {
      return {
        ...state,
      }
    }
    case UPDATE_USER_PROFILE_SUCCESS: {
      return {
        ...state,
      }
    }
    case UPDATE_USER_PROFILE_FAILED: {
      return {
        ...state,
      }
    }


    default: {
      return { ...state };
    }
  }
}
