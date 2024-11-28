import { defineStore } from 'pinia';
import { ref } from 'vue';
import { AxiosError } from 'axios';
import axiosApiInstance from '@/modules/api'

const URL = 'https://dummyjson.com/auth';

export const useAuthStore = defineStore('auth', () => {

  const expiresInMins = ref(1) // сколько живет accessToken
  const isLoading = ref(false)

  const accessToken = ref('')
  const refreshToken = ref('')

  const authUser = async (type: string, userLogin?: IUserLogin) => {
    isLoading.value = true
    try {
      const response = await axiosApiInstance.post(`${URL}/${type}`, {
        ...userLogin,
        // grant_type: 'refreshToken',
        // returnSecureToken: true
      })
      if (response.data) {
        accessToken.value = (response.data as IUserInfo).accessToken;
        refreshToken.value = (response.data as IUserInfo).refreshToken;
      }
    } catch (err) {
      console.log((err as AxiosError).response?.data)
    } finally {
      isLoading.value = false
    }
  }

  const logUserOut = () => {
    accessToken.value = '';
    refreshToken.value = '';
  }


  return { isLoading, accessToken, refreshToken, expiresInMins, authUser, logUserOut }
},
  {
    persist: {
      pick: ['accessToken', 'refreshToken'],
    },
  }
)
