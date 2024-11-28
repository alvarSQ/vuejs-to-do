<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import UIPreloader from "@/components/UI/preloader.vue";
import { AxiosError } from "axios";
import axiosApiInstance from '@/modules/api'

const router = useRouter();
const authStore = useAuthStore();

const user = ref({} as IUserInfo);

const logout = () => {
  authStore.logUserOut();
  router.push("/login");
};

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
    authStore.isLoading = false;
  }
};

onMounted(async () => await getUserData());
</script>

<template>
  <div class="container">
    <UIPreloader v-if="authStore.isLoading" />
    <p v-else>Привет {{ user.firstName }}</p>

    <button class="btn" @click="logout">logout</button>
  </div>
</template>
