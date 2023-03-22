export default class IngridientsApi {
    
    constructor(baseUrl, authorizationToken = '') {

        this._baseUrl = baseUrl;
        this._authorizationToken = authorizationToken;
        this._config = {
            baseUrl: baseUrl,
            headers: {
                ...( authorizationToken ? { 'authorization': authorizationToken} : {}),
                'Content-Type': 'application/json',
            }
        }
    }

    _request = (request, method = 'GET', body = '') => {
    
        const params = {
            'method': method,
            'headers': this._config.headers,
        }
        
        if (method !== 'GET' && body) params.body = JSON.stringify(body);

        return fetch(`${this._config.baseUrl}/${request}`, params)
            .then(res => {
                if (res.ok) return res.json();
                return Promise.reject(res);
            });
    }
    
    getIngridients = () => this._request('ingredients');
    
}