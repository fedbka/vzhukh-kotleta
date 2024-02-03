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