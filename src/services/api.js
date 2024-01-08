const BASE_URL = "https://norma.nomoreparties.space/api";

class vzukhKotletaApi {

  constructor(BASE_URL) {

    this._BASE_URL = BASE_URL;
    this._config = {
      BASE_URL: BASE_URL,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    }
  }

  _request = async (endpoint, method = "GET", body = "", accessToken = "") => {

    const params = {
      "method": method,
      "headers": { ...this._config.headers, ...(accessToken ? { "authorization": accessToken } : {}) },
    }

    if (method !== "GET" && body) params.body = JSON.stringify(body);

    const res = await fetch(`${this._config.BASE_URL}/${endpoint}`, params);
    
    if (res.ok) return await res.json();

    return await Promise.reject(res);
  }

  _requestWithRefesh = async (endpoint, method = "GET", body = "", accessToken = "", refreshToken = "", saveTockensCallback = null) => {

    const params = {
      "method": method,
      "headers": { ...this._config.headers, ...(accessToken ? { "authorization": accessToken } : {}) },
    }

    if (method !== "GET" && body) params.body = JSON.stringify(body);
    
    const res = await fetch(`${this._config.BASE_URL}/${endpoint}`, params);    

    if (res.ok) return await res.json();

    if (res.message !== "jwt expired") return await Promise.reject(res);

    const updateTokensRes = await this.refreshToken(refreshToken);

    if (updateTokensRes && updateTokensRes.success) {

      saveTockensCallback(updateTokensRes.accessToken, updateTokensRes.refreshToken);

      return this._request(endpoint, method, body, updateTokensRes.accessToken);

    }

    return await Promise.reject(updateTokensRes);

  }

  getIngridients = () => this._request("ingredients");

  getIngridientsTypes = async () => {
    return await new Promise(resolve =>
      resolve({
        success: true,
        data: [
          { id: "bun", name: "Булки" },
          { id: "sauce", name: "Соусы" },
          { id: "main", name: "Начинки" },
        ],
      })
    );
  };

  makeOrder = (ingridients, accessToken) => this._request("orders", "POST", ingridients, accessToken);

  registerUser = (userProfile) => this._request("auth/register", "POST", userProfile);

  loginUser = (userProfile) => this._request("auth/login", "POST", userProfile);

  logoutUser = (refreshToken) => this._request("auth/logout", "POST", { token: refreshToken });

  passwordRecovery = (email) => this._request("password-reset", "POST", { email });

  passwordReset = (password, token) => this._request("password-reset/reset", "POST", { password, token })

  refreshToken = (refreshToken) => this._request("auth/token", "POST", { token: refreshToken });

  getUserProfile = (accessToken) => this._request("auth/user", "GET", {}, accessToken);

  updateUserProfile = (userProfile, accessToken, refreshToken, saveTockensCallback) => this._requestWithRefesh("auth/user", "PATCH", { ...userProfile }, accessToken, refreshToken, saveTockensCallback);

}

const Api = new vzukhKotletaApi(BASE_URL);

export default Api;
