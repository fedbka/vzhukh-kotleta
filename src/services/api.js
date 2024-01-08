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

    const response = await fetch(`${this._config.BASE_URL}/${endpoint}`, params);
    if (!response.ok) return await Promise.reject(response);

    const json = await response.json();
    if (!json || !json.success) return Promise.reject(json);

    return json;

  }

  _requestWithRefesh = async (endpoint, method = "GET", body = "", accessToken = "", refreshToken = "", saveTockensCallback = null) => {

    const params = {
      "method": method,
      "headers": { ...this._config.headers, ...(accessToken ? { "authorization": accessToken } : {}) },
    }

    if (method !== "GET" && body) params.body = JSON.stringify(body);

    const response = await fetch(`${this._config.BASE_URL}/${endpoint}`, params);
    
    if (!response.ok) return await Promise.reject(response);
    
    const json = await response.json();
    if (json && json.success) return response;

    if (json.message !== "jwt expired") return Promise.reject(json);

    const updateTokensResponse = await this.refreshToken(refreshToken);

    if (!updateTokensResponse || !updateTokensResponse.success) return Promise.reject(updateTokensResponse);

    saveTockensCallback({ ...updateTokensResponse });

    return this._request(endpoint, method, body, updateTokensResponse.accessToken);

  }

  getIngridients = () => this._request("ingredients");

  getIngridientsTypes = async () => {
    return Promise.resolve({
      success: true,
      data: [
        { id: "bun", name: "Булки" },
        { id: "sauce", name: "Соусы" },
        { id: "main", name: "Начинки" },
      ],
    })
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
