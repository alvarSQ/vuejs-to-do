<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import ListTask from "@/components/ListTask.vue";
import FormAddTask from '@/components/UI/form-add-task.vue';
import Title from '@/components/UI/title.vue';

const router = useRouter();

const title = ref('To do list')

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
    </div>
  </div>
</template>

<style lang="scss">

</style>
