import { defineStore, storeToRefs } from 'pinia';
import { useAuthStore } from "@/stores/auth";
import { computed, ref } from 'vue';
import { AxiosError } from 'axios';
import axiosTodo from '@/modules/api-todo-list'

const URL = 'https://dummyjson.com/todos';

export const useTodoStore = defineStore('todo', () => {

  const todoDataByUserId = ref({} as ITodo[])
  const getTodoDataByUserId = computed(() => todoDataByUserId.value)

  const newTask = ref('')

  const toTodoById = async (type?: string) => {
    const { isLoading } = storeToRefs(useAuthStore());     
    isLoading.value = true
    try {
      const response = await axiosTodo(`${URL + type}`)      
      if (response.data) {
        todoDataByUserId.value = (response.data as ITodoList).todos;
      }
    } catch (err) {
      console.log((err as AxiosError).response)
    } finally {
      isLoading.value = false
    }
  } 

  return { todoDataByUserId, getTodoDataByUserId, newTask, toTodoById }
},
  {
    persist: {
      pick: [],
    },
  }
)
