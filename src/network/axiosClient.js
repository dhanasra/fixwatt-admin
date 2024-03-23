
import axios from 'axios';
import { showSnackbar } from '../utils/snackbar-utils';
import Cookies from 'js-cookie';
import { clearCookies } from '../utils/utils';

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
        if ((config.url.includes("/service") || config.url.includes("/category") || config.url.includes("/technician"))  
            && (config.method === "post" || config.method === "put")) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }
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
            // showSnackbar(message, { variant: 'success' });
        }

        return data;
    },
    error=>{
        const originalRequest = error.config;
        console.log(originalRequest)
        if (
            error.response.status === 401
        ) {
          clearCookies();
          window.location.href = 'https://fixwatt-admin.web.app/';
        }
        return Promise.reject(error)
    }
)

export default axiosClient;