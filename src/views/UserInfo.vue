<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import UIPreloader from "@/components/UI/preloader.vue";
import { AxiosError } from "axios";
import axiosApiInstance from "@/modules/api-auth";
import Title from "@/components/UI/title.vue";

const router = useRouter();
const authStore = useAuthStore();

const user = ref({} as IUserInfo);

const fieldsUser = ref(["id", "username", "email", "firstName", "lastName", "gender"]);



const getUserData = async () => {
  authStore.isLoading = true;
  try {
    const response = await axiosApiInstance.get(`https://dummyjson.com/auth/me`);
    if (response.data) {
      user.value = response.data as IUserInfo;
    }
  } catch (err) {
    console.log((err as AxiosError).response?.data);
  } finally {
    authStore.userName = user.value.firstName
    authStore.userId = user.value.id
    authStore.isLoading = false;
  }
};

onMounted(async () => await getUserData());
</script>

<template>
  <div class="container">
    <UIPreloader v-if="authStore.isLoading" />
    <div class="content" v-else>
      <Title>
        <p>{{ user.firstName }}</p>
      </Title>
      <ul class="list">
        <template v-for="(value, key, index) of user">
          <li v-if="fieldsUser.indexOf(key) > -1">
          <div class="flex-center">
            <p class="fon">{{ key + ": " }}</p>
            <p :class="{ 'task-ready': false }">
              {{ value }}
            </p>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style>
.fon {
  margin-left: -10px;
  padding-left: 20px;
  padding-right: 5px;
  background-color: #2c2c2c;
}
</style>
