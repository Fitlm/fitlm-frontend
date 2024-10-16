import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:import.meta.env.PROD ?
    '':'http://localhost:4000'
})

axiosInstance.interceptors.request.use(function (config) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
    return config;
}, function (error) {
    return Promise.reject(error);
})

axiosInstance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.data === 'jwt expired') {
        window.location.reload();               //토큰의 만료 시간이 1시간이 지나고 나서 refresh를 통해 토큰을 재 할당하는 방법...
    }
    return Promise.reject(error);
})


export default axiosInstance;

//axios import