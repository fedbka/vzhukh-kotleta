export const getTokens = (): { accessToken: string; refreshToken: string } => {
  return {
    accessToken: localStorage.getItem("accessToken") ?? "",
    refreshToken: localStorage.getItem("refreshToken") ?? "",
  };
};

export const setTokens = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}): void => {
  accessToken
    ? localStorage.setItem("accessToken", accessToken)
    : localStorage.removeItem("accessToken");
  refreshToken
    ? localStorage.setItem("refreshToken", refreshToken)
    : localStorage.removeItem("refreshToken");
};

export const eraseTokens = (): void =>
  setTokens({ accessToken: "", refreshToken: "" });
