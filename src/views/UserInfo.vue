<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import Preloader from "@/components/UI/preloader.vue";
import Title from "@/components/UI/title.vue";

const authStore = useAuthStore();

const fieldsUser = ref(["id", "username", "email", "firstName", "lastName", "gender"]);

onMounted(async () => await authStore.getUserData());
</script>

<template>
  <div class="container">
    <Preloader v-if="authStore.isLoading" />
    <div class="content" v-else>
      <Title>
        <p>{{ authStore.userInfo.firstName }}</p>
      </Title>
      <ul class="list">
        <template v-for="(value, key, index) of authStore.userInfo">
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
