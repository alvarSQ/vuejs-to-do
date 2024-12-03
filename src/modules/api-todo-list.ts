import { useAuthStore } from "@/stores/auth";
import axios from "axios";
import { storeToRefs } from "pinia";

const axiosTodo = axios.create();

axiosTodo.interceptors.request.use(
  (config) => {
    const { userId } = storeToRefs(useAuthStore());
    if (config.url?.includes("user")) {
      config.method = 'GET'
      config.url += `/${userId.value}`
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosTodo;
