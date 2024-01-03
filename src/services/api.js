const baseUrl = "https://norma.nomoreparties.space/api";

class IngridientsApi {

  constructor(baseUrl, authorizationToken = '') {

    this._baseUrl = baseUrl;
    this._authorizationToken = authorizationToken;
    this._config = {
      baseUrl: baseUrl,
      headers: {
        ...(this._authorizationToken ? { 'authorization': this._authorizationToken } : {}),
        'Content-Type': 'application/json; charset=utf-8',
      }
    }
  }

  _request = async (endpoint, method = 'GET', body = '') => {

    const params = {
      'method': method,
      'headers': this._config.headers,
    }

    if (method !== 'GET' && body) params.body = JSON.stringify(body);

    const res = await fetch(`${this._config.baseUrl}/${endpoint}`, params);
    if (res.ok) return res.json();
    return await Promise.reject(res);
  }

  getIngridients = () => this._request('ingredients');

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

  makeOrder = (ingridients) => this._request('orders', 'POST', ingridients);

}

const ingridientsApi = new IngridientsApi(baseUrl);

export default ingridientsApi;
