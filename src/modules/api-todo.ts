import { useAuthStore } from "@/stores/auth";
import axios, { AxiosError } from "axios";
import { storeToRefs } from "pinia";
import router from "@/router";
import { computed } from 'vue';

const axiosTodo = axios.create();

axiosTodo.interceptors.request.use(
  (config) => {
    const { userId } = storeToRefs(useAuthStore());
    if (config.url?.includes("user")) {      
      config.url += `/${userId.value}`
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosTodo.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async function (error) {
//     const authStore = useAuthStore();
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         await authStore.authUser("refresh");
//         return await axiosTodo(originalRequest);
//       } catch (err) {
//         console.log((err as AxiosError).response?.data);
//       }
//     } else {
//       authStore.logUserOut();
//       router.push("/login");
//     }
//   }
// );

export default axiosTodo;
