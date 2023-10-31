import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use((config) => { // мидлвар который будет проверять на каждый запрос есть ли токен и вшивать его в Authorization
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
})

export default instance;