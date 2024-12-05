<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "@/stores/todo";

const todoStore = useTodoStore();

const onClickHandler = async (page: number) => {
  await todoStore.toTodoPagination(page, 8);
};

const currentPage = ref(1);
</script>

<template>
  <vue-awesome-paginate
    :total-items="todoStore.paginationTotal"
    :items-per-page="8"
    :max-pages-shown="3"
    v-model="currentPage"
    @click="onClickHandler"
  />
</template>

<style lang="scss">
@use "@/assets/scss/var.scss" as *;

.pagination-container {
  display: flex;
  gap: 10px;
  @media (max-width: 360px) {
    gap: 5px;
  }
}

.paginate-buttons {
  height: wmax(50);
  width: wmax(50);
  border-radius: 50px;
  cursor: pointer;
  background-color: #999;
  color: black;
  font-size: wmax(24);
  @media (max-width: 1124px) {
    height: 25px;
    width: 25px;    
    font-size: 12px;
  }
  @media (max-width: 360px) {
    font-size: 10px;
  }
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #222;
  color: white;
}

.active-page:hover {
  background-color: #575757;
}
</style>
