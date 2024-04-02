import axios from 'axios';

export async function fetchData(endpoint, context, method = 'GET', data = null) {
    try {
        const headers = {
            Authorization: `Bearer ${context.$store.getters.get__token}`,
        };

        const config = {
            headers,
            method,
            url: `${context.$store.getters.get__url}/${endpoint}`,
        };

        if (data) {
            config.data = data;
        }
        
        const response = await axios(config);

        return response.data;
    } catch (error) {
        throw new Error(`Error al intentar obtener los datos de ${endpoint}: ${error.message}`);
    }
}

export async function getData(endpoint, context) {
    return fetchData(endpoint, context, 'GET');
}

export async function postData(endpoint, context, data) {
    return fetchData(endpoint, context, 'POST', data);
}

export async function putData(endpoint, context, data) {
    return fetchData(endpoint, context, 'PUT', data);
}

export async function deleteData(endpoint, context, data) {
    return fetchData(endpoint, context, 'DELETE', data);
}