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

export const SET_USER_PROFILE = "SET_USER_PROFILE";
export const setUserProfile = (userProfile) => ({
  type: SET_USER_PROFILE,
  payload: userProfile,
});

export const RESET_USER_PROFILE = "RESET_USER_PROFILE";
export const resetUserProfile = () => ({
  type: RESET_USER_PROFILE,
});

export const UPDATE_USER_PROFILE_REQUEST = "UPDATE_USER_PROFILE_REQUEST";
export const updateUserProfileRequest = () => ({
  type: UPDATE_USER_PROFILE_REQUEST,
});

export const UPDATE_USER_PROFILE_SUCCESS = "UPDATE_USER_PROFILE_SUCCESS";
export const updateUserProfileSuccess = () => ({
  type: UPDATE_USER_PROFILE_SUCCESS,
});

export const UPDATE_USER_PROFILE_FAILED = "UPDATE_USER_PROFILE_SUCCESS";
export const updateUserProfileFailed = () => ({
  type: UPDATE_USER_PROFILE_FAILED,
});

export const registerUserProfile = ({ name, email, password }) => {
  return (dispatch) => {
    dispatch(registerUserRequest());
    return Api.registerUser({ name, email, password })
      .then((res) => {
        if (res && res.success) {
          setTokens(res);
          dispatch(registerUserSuccess());
          dispatch(setUserProfile(res.user));
        } else {
          dispatch(registerUserFailed());
          dispatch(resetUserProfile());
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(registerUserFailed());
        dispatch(resetUserProfile());
      });
  };
}

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch(loginUserRequest());
    return Api.loginUser({ email, password })
      .then((res) => {
        if (res && res.success) {
          setTokens(res);
          dispatch(loginUserSuccess());
          dispatch(setUserProfile(res.user));
        } else {
          dispatch(loginUserFailed());
          dispatch(resetUserProfile());
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(loginUserFailed());
        dispatch(resetUserProfile());
      });
  }

}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutUserRequest());
    const { refreshToken } = getTokens();
    return Api.logoutUser(refreshToken)
      .then((res) => {
        dispatch(logoutUserSuccess());
        dispatch(resetUserProfile());
      })
      .catch((err) => {
        console.log(err);
        dispatch(logoutUserFailed());
      })
      .finally(() => {
        eraseTokens();
      });
  }

}

export const passwordRecovery = ({ email }) => {
  return (dispatch) => {
    dispatch(passwordRecoveryRequest());
    return Api.passwordRecovery(email)
      .then((res) => {
        if (res && res.success) {
          dispatch(passwordRecoverSuccess());
        } else {
          dispatch(passwordRecoveryFailed());
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(passwordRecoveryFailed());
      });
  }

}

export const passwordReset = ({ password, token }) => {
  return (dispatch) => {
    dispatch(passwordResetRequest());
    return Api.passwordReset(password, token)
      .then((res) => {
        if (res && res.success) {
          dispatch(passwordResetSuccess());
        } else {
          dispatch(passwordResetFailed());
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(passwordResetFailed());
      });
  }

}

export const autoLoginUser = () => {
  return (dispatch) => {
    dispatch(loginUserRequest());
    const { refreshToken } = getTokens();
    if (refreshToken) {
      return Api.refreshToken(refreshToken)
        .then((res) => {
          if (res && res.success) {
            dispatch(loginUserSuccess());
            setTokens(res);
          } else {
            dispatch(loginUserFailed());
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(loginUserFailed);
        })
    } else {
      return Promise.reject({ success: false, message: "You are not authorized" });
    }
  }
}

export const getUserProfile = () => {
  return (dispatch) => {
    const { accessToken } = getTokens();
    if (accessToken) {
      return Api.getUserProfile(accessToken)
        .then((res) => {
          if (res && res.success) {
            dispatch(setUserProfile(res.user));
          } else {
            dispatch(resetUserProfile());
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(resetUserProfile());
        })
    } else {
      dispatch(resetUserProfile());
      return Promise.reject({ success: false, message: "You are not authorized" });
    }
  }
}

export const updateUserProfile = (userProfile) => {
  return (dispatch) => {
    const { accessToken, refreshToken } = getTokens();
    if (accessToken && refreshToken) {
      return Api.updateUserProfile(userProfile, accessToken, refreshToken, setTokens)
        .then((res) => {
          if (res && res.success) {
            dispatch(setUserProfile(res.user));
          }
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      return Promise.reject({ success: false, message: "You are not authorized" });
    }
  }
}

export const getTokens = () => {
  return {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  }
}

export const setTokens = ({ accessToken, refreshToken }) => {
  accessToken ? localStorage.setItem("accessToken", accessToken) : localStorage.removeItem("accessToken");
  refreshToken ? localStorage.setItem("refreshToken", refreshToken) : localStorage.removeItem("refreshToken");
}

export const eraseTokens = () => setTokens({ accessToken: '', refreshToken: '' });