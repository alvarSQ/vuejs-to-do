import { defineStore, storeToRefs } from 'pinia';
import { useAuthStore } from "@/stores/auth";
import { computed, ref } from 'vue';
import axios, { AxiosError } from 'axios';


const URL = 'https://dummyjson.com/todos';

export const useTodoStore = defineStore('todo', () => {
  const { userId } = storeToRefs(useAuthStore());

  const todoDataByUserId = ref({} as ITodo[])
  const getTodoDataByUserId = computed(() => todoDataByUserId.value)

  const newTask = ref({
    todo: '',
    completed: false,
    userId: userId.value,
  });

  const editTask = ref("");

  const paginationTotal = ref(0)


  const toTodoById = async (type?: string) => {
    try {
      const response = await axios.get(`${URL + type}/${userId.value}`)
      if (response.data) {
        todoDataByUserId.value = (response.data as ITodoList).todos;
      }
    } catch (err) {
      console.log((err as AxiosError).response)
    }
  }

  const toTodoPagination = async (page: number, limit: number) => {
    let skip = 0
    page === 1 ? skip : skip = limit * (page - 1)
    try {
      const response = await axios.get(`${URL}`, {
        params: {
          limit: limit,
          skip: skip
        }
      })
      if (response.data) {
        todoDataByUserId.value = (response.data as ITodoList).todos;
        paginationTotal.value = (response.data as ITodoList).total
      }
    } catch (err) {
      console.log((err as AxiosError).response)
    }
  }

  const addTask = async () => {
    if (newTask.value.todo) {
      try {
        const response = await axios.post(`${URL}/add`, {
          ...newTask.value,
        });
        const tempResp = response.data
        tempResp.id = todoDataByUserId.value.reduce((max, el) => (el.id > max ? el.id : max), 0) + 1
        todoDataByUserId.value.push(tempResp);
        newTask.value.todo = "";
      } catch (err) {
        console.log((err as AxiosError).response);
      }
    }
  };

  const delEditTask = async (idTask: number, methodStr: string) => {
    try {
      const response = await axios(`${URL}/${idTask}`, {
        method: methodStr,
        data: {
          todo: editTask.value,
        },
      });
      todoDataByUserId.value.filter((e) => {
        if (e.id === idTask && methodStr === "DELETE") {
          e.isDeleted = response.data.isDeleted;
          e.deletedOn = response.data.deletedOn;
        }
        if (e.id === idTask && methodStr === "PUT") {
          (e.todo = response.data.todo), (e.isEdit = false);
          editTask.value = "";
        }
      });
    } catch (err) {
      console.log((err as AxiosError).response);
    }
  };

  return { todoDataByUserId, getTodoDataByUserId, newTask, editTask, paginationTotal, toTodoById, addTask, delEditTask, toTodoPagination }
},
  {
    persist: {
      pick: [],
    },
  }
)
