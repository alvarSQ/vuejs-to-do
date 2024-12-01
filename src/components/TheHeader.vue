<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute()

const routeName = computed(() => route.name)

const logout = () => {
  authStore.logUserOut();
  router.push("/login");
};
</script>

<template>
  <header>
    <div class="navbar">
      <div class="container">
        <div class="navbar-content">
          <div class="flex-center" style="cursor: pointer;" @click="routeName !== 'user' ? router.push('/user') : router.push('/')">
            <div class="logo-img"></div>
            <p class="logo-name" v-if="routeName !== 'user'">{{ authStore.getUserName }}</p>
            <p class="logo-name" v-else> Home </p>
          </div>
          <p style="cursor: pointer;" @click="logout" >logout</p>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use "@/assets/scss/var.scss" as *;

.logo-img {
  width: wmax(70);
  height: wmax(70);
  border-radius: 50px;
  background-color: black;
  @media (max-width: 640px) {
    width: 50px;
    height: 50px;
  }
}
</style>
