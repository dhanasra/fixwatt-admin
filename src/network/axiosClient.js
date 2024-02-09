
import axios from 'axios';
import { showSnackbar } from '../utils/snackbar-utils';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
    // baseURL: `http://13.233.244.254/test/v1`,
    baseURL: `https://spiderlings.in/test/v1`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})


axiosClient.interceptors.request.use(
    config=>{
        const accessToken = Cookies.get('refreshToken');
        if(accessToken){
            config.headers['x-refresh-token'] = `${accessToken}`;
        }
        return config;
    },
    error=>{
        Promise.reject(error)
    }
)

axiosClient.interceptors.response.use(
    response=>{
        const res = response.data;

        const data = res["data"];
        const message = res["message"];

        if(res.status === 422){
            showSnackbar(data?.errors[0]?.msg ?? message, { variant: 'error' });
            return null;
        }else if(res.status === 200){
            showSnackbar(message, { variant: 'success' });
        }

        return data;
    },
    error=>{
        return Promise.reject(error)
    }
)

export default axiosClient;