const baseUrl = "https://norma.nomoreparties.space/api";

class IngridientsApi {
    
    constructor(baseUrl, authorizationToken = '') {

        this._baseUrl = baseUrl;
        this._authorizationToken = authorizationToken;
        this._config = {
            baseUrl: baseUrl,
            headers: {
                ...( this._authorizationToken ? { 'authorization': this._authorizationToken} : {}),
                'Content-Type': 'application/json; charset=utf-8',
            }
        }
    }

    _request = (endpoint, method = 'GET', body = '') => {
    
        const params = {
            'method': method,
            'headers': this._config.headers,
        }
        
        if (method !== 'GET' && body) params.body = JSON.stringify(body);
    
        return fetch(`${this._config.baseUrl}/${endpoint}`, params)
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(res);
            });
    }
    
    getIngridients = () => this._request('ingredients');

    getOrderDetails = (ingridients) => this._request('orders', 'POST', ingridients);
    
}

const ingridientsApi = new IngridientsApi(baseUrl);

export default ingridientsApi;
