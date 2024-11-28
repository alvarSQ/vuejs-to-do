import { useAuthStore } from '@/stores/auth';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import router from '@/router';


const axiosApiInstance = axios.create()

axiosApiInstance.interceptors.request.use(config => {
    const { accessToken, refreshToken, expiresInMins } = storeToRefs(useAuthStore());
    config.headers['Content-Type'] = 'application/json';
    if (config.url?.includes('me')) {
        config.headers['Authorization'] = `Bearer ${accessToken.value}`;
        return config;
    }
    if (config.url?.includes('refresh')) {
        config.data = {
            refreshToken: refreshToken.value,
            expiresInMins: expiresInMins.value,
        }
        return config;
    }
    return config;
}, error => { return Promise.reject(error); });

axiosApiInstance.interceptors.response.use(response => {
    return response
}, async function (error) {
    const authStore = useAuthStore();
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
            await authStore.authUser('refresh')
            return await axiosApiInstance(originalRequest)
        } catch (err) {
            console.log(err);
        }
    } else {
        authStore.logUserOut()
        router.push('/login')
    }
});

export default axiosApiInstance

