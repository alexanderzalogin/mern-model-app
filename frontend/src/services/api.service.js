const API_URL = '/api/v1/';

export async function sendRequest(url, options) {
    const response = await fetch(API_URL + url, options);
    return await response.json();
}

export function createRequestOptions(method, body, headerOptions = null) {
    return {
        method,
        headers: {
            'Content-Type': 'application/json',
            headerOptions
        },
        body: JSON.stringify(body)
    }
}
