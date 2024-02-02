
import axios from 'axios';
import { showSnackbar } from '../utils/snackbar-utils';

const axiosClient = axios.create({
    baseURL: `http://13.233.244.254/test/v1`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})


axiosClient.interceptors.request.use(
    config=>{
        return config;
    },
    error=>{
        Promise.reject(error)
    }
)

axiosClient.interceptors.response.use(
    response=>{
        const data = response.data["data"];
        const message = response.data["message"];

        if(message){
            showSnackbar(message, { variant: 'success' });
        }

        return data;
    },
    error=>{
        return Promise.reject(error)
    }
)

export default axiosClient;