<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "@/stores/todo";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import axios, { AxiosError } from "axios";

const todoStore = useTodoStore();
const { isLoading, userId } = storeToRefs(useAuthStore());

const newTask = ref({
  todo: todoStore.newTask,
  completed: false,
  userId: userId.value,
});

const addTask = async () => {
  if (newTask.value.todo) {
    isLoading.value = true;
    try {
      const response = await axios.post("https://dummyjson.com/todos/add", {
        ...newTask.value,
      });
      const tempResp = response.data
      tempResp.id = todoStore.todoDataByUserId.reduce((max, el) => (el.id > max ? el.id : max), 0) + 1
      todoStore.todoDataByUserId.push(tempResp);
      newTask.value.todo = "";
    } catch (err) {
      console.log((err as AxiosError).response);
    } finally {
      isLoading.value = false;
    }
  }
};
</script>

<template>
  <form class="form-addtask">
    <input type="text" v-model="newTask.todo" />
    <button class="btn" @click.prevent="addTask">Add task</button>
  </form>
</template>

<style lang="scss">
@use "@/assets/scss/var.scss" as *;

.form-addtask {
  display: flex;
  justify-content: center;
  width: wmax($width-content);
  margin-top: hmax(40);
  border-radius: 20px;
  input {
    width: 100%;
    padding-right: 45px;
    padding-left: 20px;
    border-radius: 20px;
  }
  .btn {
    margin-left: -40px;
  }
  @media (max-width: 640px) {
    width: 95% !important;
    margin-top: 0;
  }
}
</style>
