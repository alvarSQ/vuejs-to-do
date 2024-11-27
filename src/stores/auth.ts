import { defineStore } from 'pinia';
import { ref } from 'vue';

const URL = 'https://dummyjson.com/auth';

export const useAuthStore = defineStore('auth', () => {

  const expiresInMins = 1 // сколько живет accessToken
  const user = ref({} as IUserInfo)

  const accessToken = user.value.accessToken
  const refreshToken = user.value.refreshToken

  const authUser = async (userLogin: IUserLogin) => {
    if (userLogin.username && userLogin.password) {
      userLogin.expiresInMins = expiresInMins
      try {
        const data = await fetch(`${URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userLogin)
        });
        if (data) {
          accessToken.value = (data as IUserInfo).accessToken;
          refreshToken.value = (data as IUserInfo).refreshToken;
        }
      } catch (e) {
        (e as Error).message.includes('400') ? alert('Неправильное имя или пароль') : alert('Ошибка соединения')
      }
    } else alert('заполни все поля')
  }

  const refreshAuthUser = async () => {
    try {
      const data = await $fetch(`${URL}/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: `${refreshToken.value}`,
          expiresInMins: expiresInMins,
        }),
      });
      if (data) {
        accessToken.value = (data as IUserInfo).accessToken;
        refreshToken.value = (data as IUserInfo).refreshToken;
      }
    } catch (e) {
      (e as Error).message.includes('400') ? alert('Неправильное имя или пароль') : alert('Ошибка соединения')
    }
  }

  const logUserOut = () => {
    accessToken.value = '';
    refreshToken.value = null;
  }


  return { user, accessToken, refreshToken, authUser, refreshAuthUser, logUserOut }
}
)
