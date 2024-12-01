<script setup lang="ts">
import { ref } from "vue";
</script>

<template>
  <form class="form-addtask">
    <input />
    <button class="btn">Add task</button>
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
