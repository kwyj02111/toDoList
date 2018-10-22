import axios from 'axios';

export function getData(url, params) {
    return axios.get(`${url}`, {params : params});
}

export function postData(url, params) {
    return axios.post(`${url}`, params);
}

export function putData(url, params) {
    return axios.put(`${url}`, params);
}