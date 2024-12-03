import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { AxiosError } from 'axios';
import axiosApiInstance from '@/modules/api-auth'

const URL = 'https://dummyjson.com/auth';

export const useAuthStore = defineStore('auth', () => {

  const expiresInMins = ref(1) // сколько живет accessToken
  const isLoading = ref(false)

  const userInfo = ref({} as IUserInfo);
  const userName = ref('')
  const userId = ref(1)
  const userImg = ref('')

  const getUserName = computed(() => userName.value)

  const accessToken = ref('')
  const refreshToken = ref('')

  const authUser = async (type: string, userLogin?: IUserLogin) => {
    isLoading.value = true
    try {
      const response = await axiosApiInstance.post(`${URL}/${type}`, {
        ...userLogin
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


  return { isLoading, userId, userName, getUserName, accessToken, refreshToken, userImg, expiresInMins, authUser, logUserOut }
},
  {
    persist: {
      pick: ['accessToken', 'refreshToken', 'userName', 'userId', 'userImg'],
    },
  }
)
