import { defineStore, storeToRefs } from 'pinia';
import { useAuthStore } from "@/stores/auth";
import { computed, ref } from 'vue';
import { AxiosError } from 'axios';
import axiosTodo from '@/modules/api-todo-list'

const URL = 'https://dummyjson.com/todos';

export const useTodoStore = defineStore('todo', () => {

  const todoDataByUserId = ref({} as ITodo[])
  const getTodoDataByUserId = computed(() => todoDataByUserId.value)

  const toTodoById = async (type?: string) => {
    const { isLoading } = storeToRefs(useAuthStore());    
    try {
      const response = await axiosTodo(`${URL + type}`)      
      if (response.data) {
        todoDataByUserId.value = (response.data as ITodoList).todos;
      }
    } catch (err) {
      console.log((err as AxiosError).response)
    } 
  } 

  return { todoDataByUserId, getTodoDataByUserId, toTodoById }
},
  {
    persist: {
      pick: [],
    },
  }
)
