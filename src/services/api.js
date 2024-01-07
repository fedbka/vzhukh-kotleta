const BASE_URL = "https://norma.nomoreparties.space/api";

class vzukhKotletaApi {

  constructor(BASE_URL, authorizationToken = "") {

    this._BASE_URL = BASE_URL;
    this._authorizationToken = authorizationToken;
    this._config = {
      BASE_URL: BASE_URL,
      headers: {
        ...(this._authorizationToken ? { "authorization": this._authorizationToken } : {}),
        "Content-Type": "application/json; charset=utf-8",
      }
    }
  }

  _request = async (endpoint, method = "GET", body = "") => {

    const params = {
      "method": method,
      "headers": this._config.headers,
    }

    if (method !== "GET" && body) params.body = JSON.stringify(body);

    const res = await fetch(`${this._config.BASE_URL}/${endpoint}`, params);
    if (res.ok) return res.json();
    return await Promise.reject(res);
  }

  getIngridients = () => this._request("ingredients");

  getIngridientsTypes = async () => {
    return await new Promise(resolve =>
      setTimeout(() =>
        resolve({
          success: true,
          data: [
            { id: "bun", name: "Булки" },
            { id: "sauce", name: "Соусы" },
            { id: "main", name: "Начинки" },
          ],
        }), 100)
    );
  };

  makeOrder = (ingridients) => this._request("orders", "POST", ingridients);

  registerUser = (userProfile) => this._request("auth/register", "POST", userProfile);

  loginUser = (userProfile) => this._request("auth/login", "POST", userProfile);

  logoutUser = (refreshToken) => this._request("auth/logout", "POST", { token: refreshToken });

  passwordRecovery = (email) => this._request("password-reset", "POST", { email });

  passwordReset = (password, token) => this._request("password-reset/reset", "POST", { password, token })

}

const Api = new vzukhKotletaApi(BASE_URL);

export default Api;
