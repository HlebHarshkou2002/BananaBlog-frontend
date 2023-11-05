import axios from "axios";
// process.env.REACT_APP_API_URL

const instance = axios.create({
    baseURL: "https://bananablog-backend-production.up.railway.app",
});

instance.interceptors.request.use((config) => { // мидлвар который будет проверять на каждый запрос есть ли токен и вшивать его в Authorization
    config.headers.Authorization = window.localStorage.getItem('token');
    return config;
})

export default instance;