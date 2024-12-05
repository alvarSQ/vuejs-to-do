<script setup lang="ts">
import ListTask from "@/components/ListTask.vue";
import FormAddTask from "@/components/UI/form-add-task.vue";
import Title from "@/components/UI/title.vue";
import Pagination from "@/components/UI/pagination.vue";
import { ref } from 'vue';
import { useTodoStore } from "@/stores/todo";

const todoStore = useTodoStore();

const isPag = ref(false)
</script>

<template>
  <div class="container">
    <div class="content">
      <Title><p>TO-DO-LIST</p></Title>
      <FormAddTask />
      <div class="line-big verybig"></div>
      <ul class="list">
        <ListTask />
      </ul>
      <Pagination v-if="isPag"/>
      <button class="btn" style="margin-top: 30px; font-family: Inter" @click="todoStore.toTodoPagination(1, 8), isPag = !isPag" v-else>проверить пагинацию</button> 
    </div>
  </div>
</template>

<style lang="scss"></style>
