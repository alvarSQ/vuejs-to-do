<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const userInput = reactive({
  username: "",
  password: ""
});

const userInputAuth = async () => {
  await authStore.authUser(userInput);
  router.push("/");
};
</script>

<template>
  <div class="container">
      <div class="dark">
        <div class="modal">
          <div class="title">Авторизация</div>
          <form class="text-field" @submit.prevent="userInputAuth">
            <div>
              <label class="text-field__label" for="login">Логин</label>

              <input
                class="text-field__input"
                type="text"
                name="login"
                id="login"
                placeholder="Введите ваш логин"
                v-model="userInput.username"
              />
            </div>

            <div>
              <label class="text-field__label" for="password">Пароль</label>

              <input
                class="text-field__input"
                type="password"
                name="password"
                id="password"
                placeholder="Введите ваш пароль"
                v-model="userInput.password"
                autocomplete="on"
              />
            </div>

            <button class="btn">Отправить</button>
          </form>
        </div>
      </div>
  </div>
</template>

<style scoped lang="scss">
.title {
  font-size: 1.2em;
  font-weight: 600;
  text-align: center;
  color: #022246;
}

label {
  color: #022246;
}

.text-field {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.text-field__label {
  display: block;
  margin-bottom: 0.25rem;
}

.text-field__input {
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #7da4d1;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &::placeholder {
    color: #212529;
    opacity: 0.4;
  }
  &:focus {
    color: #212529;
    background-color: #fff;
    border-color: #7da4d1;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(158, 158, 158, 0.25);
  }
}

.modal {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 390px;
  padding: 20px;
  gap: 20px;
  border-radius: 15px;
  background-color: white;
  @media (max-width: 390px) {
    width: 280px;
  }
}

.dark {
  background: #033268;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}
</style>
