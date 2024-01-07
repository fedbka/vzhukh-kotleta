import Api from "../api";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const registerUserRequest = () => ({
  type: REGISTER_USER_REQUEST,
});

export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const registerUserSuccess = () => ({
  type: REGISTER_USER_SUCCESS,
});

export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";
export const registerUserFailed = () => ({
  type: REGISTER_USER_FAILED,
});

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST,
});

export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const loginUserSuccess = () => ({
  type: LOGIN_USER_SUCCESS,
});

export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED";
export const loginUserFailed = () => ({
  type: LOGIN_USER_FAILED,
});

export const LOGOUT_USER_REQUEST = "LOGOUT_USER_REQUEST";
export const logoutUserRequest = () => ({
  type: LOGOUT_USER_REQUEST,
});

export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
});

export const LOGOUT_USER_FAILED = "LOGOUT_USER_FAILED";
export const logoutUserFailed = () => ({
  type: LOGOUT_USER_FAILED,
});

export const PASSWORD_RECOVERY_REQUEST = "PASSWORD_RECOVERY_REQUEST";
export const passwordRecoveryRequest = () => ({
  type: PASSWORD_RECOVERY_REQUEST,
});

export const PASSWORD_RECOVERY_SUCCESS = "PASSWORD_RECOVERY_SUCCESS";
export const passwordRecoverSuccess = () => ({
  type: PASSWORD_RECOVERY_SUCCESS,
});

export const PASSWORD_RECOVERY_FAILED = "PASSWORD_RECOVERY_FAILED";
export const passwordRecoveryFailed = () => ({
  type: PASSWORD_RECOVERY_FAILED,
});


export const PASSWORD_RESET_REQUEST = "PASSWORD_RESET_REQUEST";
export const passwordResetRequest = () => ({
  type: PASSWORD_RESET_REQUEST,
});

export const PASSWORD_RESET_SUCCESS = "PASSWORD_RESET_SUCCESS";
export const passwordResetSuccess = () => ({
  type: PASSWORD_RESET_SUCCESS,
});

export const PASSWORD_RESET_FAILED = "PASSWORD_RESET_FAILED";
export const passwordResetFailed = () => ({
  type: PASSWORD_RESET_FAILED,
});

export const SET_USER_AUTHENTICATED = "SET_USER_AUTHENTICATED";
export const SET_USER_PROFILE = "SET_USER_PROFILE";
export const RESET_USER_PROFILE = "RESET_USER_PROFILE";

export const setUserAuthenticated = (value) => ({
  type: SET_USER_AUTHENTICATED,
  payload: value,
});

export const setUserProfile = (userProfile) => ({
  type: SET_USER_PROFILE,
  payload: userProfile,
});

export const resetUserProfile = () => ({
  type: RESET_USER_PROFILE,
});

export const registerUserProfile = ({ name, email, password }) => {
  return (dispatch) => {
    dispatch(registerUserRequest());
    return Api.registerUser({ name, email, password })
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(registerUserSuccess());
        dispatch(setUserProfile(res.user));
      })
      .catch((err) => {
        dispatch(registerUserFailed());
        console.log(err);
      });
  };
}

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch(loginUserRequest());
    return Api.loginUser({ email, password })
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(loginUserSuccess());
        dispatch(setUserProfile(res.user));
      })
      .catch((err) => {
        dispatch(loginUserFailed());
      });
  }

}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutUserRequest());
    return Api.logoutUser(localStorage.getItem("refreshToken"))
      .then((res) => {
        console.log(res);
        dispatch(logoutUserSuccess());
        dispatch(resetUserProfile());
      })
      .catch((err) => {
        dispatch(logoutUserFailed());
      })
      .finally(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      });
  }

}

export const passwordRecovery = ({ email }) => {
  return (dispatch) => {
    dispatch(passwordResetRequest());
    return Api.passwordRecovery(email)
      .then((res) => {
        console.log(res);
        dispatch(passwordResetSuccess());
      })
      .catch((err) => {
        dispatch(passwordResetFailed());
      });
  }

}

export const passwordReset = ({ password, token }) => {
  return (dispatch) => {
    dispatch(passwordResetRequest());
    return Api.passwordReset( password, token )
      .then((res) => {
        console.log(res);
        dispatch(passwordResetSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(passwordResetFailed());
      });
  }

}

