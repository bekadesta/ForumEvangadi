import axios from 'axios';

const axiosbase = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

export default axiosbase
