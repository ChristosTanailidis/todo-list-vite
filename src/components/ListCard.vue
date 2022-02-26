<template>
  <transition name="fade" class="flex mt-4">
    <ErrorMessage @click="errMessage=''" v-if="errMessage!=''" :message="errMessage"/>
  </transition>
  <!-- list card -->
  <div class="bg-gray-600 border border-2 border-opacity-40 p-2 m-2 rounded-lg text-gray-200" :class="list.type === 'work' ? 'border-purple-500': (list.type === 'fun' ? 'border-green-500' : 'border-blue-500')">
    <!-- list data: owner, list name, list slug -->
    <div class="flex flex-row bg-opacity-40 rounded-lg  m-2">
      <!-- list data: owner, list name, list slug -->
      <div style="padding-left: 32px" class="flex-grow">
        <!-- title -->
        <div v-if="editListNameFlag && userIsOwner()" style="margin-left: 28px" class="flex flex-row justify-center cursor-pointer">
          <div class="flex">
            <input
              :style="`width: ${editListData.title.length * 10}px`"
              class="border-b font-black font-medium appearance-none bg-transparent text-gray-200 py-1 leading-tight focus:outline-none"
              style="max-width: 200px; font-size:18px"
              v-model="editListData.title"
              autofocus
              @keydown.enter="updateList"
              @blur="updateList"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 pt-1 pl-2 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
        </div>
        <div v-else @click="editListNameFlag=!editListNameFlag" class="cursor-pointer">
          <h2 class="text-lg font-black ">{{ list.title }}</h2>
        </div>
        <!-- slug -->
        <div>
          <div v-if="editListSlugFlag && userIsOwner()" style="margin-left: 28px" class="flex flex-row justify-center cursor-pointer">
            <div class="flex">
              <input
                :style="`width: ${editListData.slug.length * 9.5}px`"
                class="border text-center border-opacity-40 bg-gray-500 rounded-xl font-medium appearance-none bg-transparent text-gray-200 focus:outline-none"
                style="margin: 4px 0px 0px 0px; max-width: 100px; font-size:14px; height: 20px"
                v-model="editListData.slug"
                autofocus
                @keydown.enter="updateList"
                @blur="updateList"
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6  pl-2 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
          <div v-else @click="editListSlugFlag=!editListSlugFlag" class="cursor-pointer">
            <div class="flex justify-center">
              <div class="flex m-1 px-2 rounded-full text-gray-100 bg-gray-500 border border-gray-300 border-opacity-30">
                <div class="text-md leading-none">{{ list.slug }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- delete list button -->
      <div v-if="userIsOwner()" class="justify-self-end" @click="removeList">
        <button class="flex items-center hover:text-red-400 text-gray-400">
          <svg width="25" height="25" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" style="transform: rotate(360deg);">
            <path d="M12 12h2v12h-2z" fill="currentColor"></path>
            <path d="M18 12h2v12h-2z" fill="currentColor"></path>
            <path d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20z" fill="currentColor"></path>
            <path d="M12 2h8v2h-8z" fill="currentColor"></path>
          </svg>
        </button>
      </div>
      <div v-else class="justify-self-end">
        <svg width="25" height="25" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" style="transform: rotate(360deg);"></svg>
      </div>
    </div>
    <!-- user info -->
    <div class="flex justify-center">
      <div class="flex flex-row bg-gray-700 bg-opacity-40 rounded-lg p-1 mb-2 pr-5">
        <div style="height: 20px; width: 20px" class="m-1 mr-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
          </svg>
        </div>
        <p class="text-lg text-left">{{ list.owner.name }}</p>
      </div>
    </div>
    <!-- list tasks -->
    <!-- first show undone tasks -->
    <div v-for="task in tasks.filter((task) => !task.done)" :key="task.id">
      <div class="container flex mx-auto w-full items-center justify-center">
        <ul class="flex flex-col p-1 w-full">
          <TaskItem :task="task" :listId="list.id" @updateTask="updateTask" @removeTask="removeTask"/>
        </ul>
      </div>
    </div>
    <!-- then show done tasks of list -->
    <div v-for="task in tasks.filter((task) => task.done)" :key="task.id">
      <div class="container flex mx-auto w-full items-center justify-center">
        <ul class="flex flex-col p-1 w-full">
          <TaskItem :task="task" :listId="list.id" @updateTask="updateTask" @removeTask="removeTask"/>
        </ul>
      </div>
    </div>
    <!-- add a task if there is space in the list -->
    <transition name="fade">
      <div v-if="(list.tasks.length < list.capacity) && userIsOwner()" class="flex mt-4">
        <input
          class="border-b ml-2 appearance-none bg-transparent w-full text-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
          placeholder="Add task"
          @keydown.enter="addTask"
          v-model="createTaskData.name"
        />
        <button class="p-0 w-12 h-10 bg-gray-500 rounded-full hover:bg-gray-400 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
          @click="addTask" >
          <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6 inline-block">
            <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601 C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399 C15.952,9,16,9.447,16,10z" />
          </svg>
        </button>
      </div>
    </transition>
    <!-- list data: capacity, type -->
    <div class="text-center mt-2 leading-none grid grid-cols-3 w-full">
      <span class="inline-flex items-center leading-none text-sm">
        <div class="flex flex-wrap justify-center">
          <div
            :class="list.type === 'work' ? 'bg-purple-500': (list.type === 'fun' ? 'bg-green-500' : 'bg-blue-500')"
            class="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-gray-100">
              <div class="text-xs font-normal leading-none max-w-full flex-initial">{{ list.type }}</div>
          </div>
        </div>
      </span>
      <span class=" mr-3 inline-flex items-center leading-none text-sm  py-1 ">
        capacity {{ tasks.length }}/{{ list.capacity }}
      </span>
      <span class="justify-self-end ">
        <transition name="fade">
        <span class="flex" v-if="listIsCompleted()">
          <p class="pt-1 pr-1">done</p>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
        </transition>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref, ref } from 'vue'

import { useMutation } from '@vue/apollo-composable'
import { createTask, deleteTask, editTask } from '../assets/gql/task.mutations'
import { deleteList, editList } from '../assets/gql/list.mutations'

import TaskItem from '../components/TaskItem.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

import List from '../interfaces/List'
import Task from '../interfaces/Task'
import { useUserStore } from '../store/loggedUser'

export default defineComponent({
  name: 'ListCard',
  emits: ['updateLists'],
  components: {
    TaskItem,
    ErrorMessage
  },
  props: {
    list: {
      type: Object as PropType<List>,
      required: true
    }
  },
  setup (props, { emit }) {
    const errMessage = ref('')

    const tasks = computed(() => props.list.tasks)

    const deleteTaskId = ref('')
    const updateTaskId = ref('')
    const deleteListId = ref('')
    const updateListId = ref('')

    const editListNameFlag = ref(false)
    const editListSlugFlag = ref(false)

    const editTaskData = ref({
      name: '',
      type: '',
      done: false,
      list: ''
    }) as Ref<Task>

    const createTaskData = ref({
      name: '',
      type: 'fun',
      list: '',
      done: false
    }) as Ref<Task>

    const editListData = ref({
      slug: props.list.slug,
      title: props.list.title,
      type: props.list.type,
      capacity: props.list.capacity,
      owner: (props.list.owner as any).id
    }) as Ref<List>

    const addTask = () => {
      createTaskData.value.type = props.list.type
      createTaskData.value.list = props.list.id
      createTaskData.value.done = false

      createTaskMutation().then((res) => {
        emit('updateLists')
        tasks.value.push(res?.data.create)
        createTaskData.value.name = ''
      }).catch((err) => { errMessage.value = err.message })
    }

    const updateTask = (updatedTask: Task) => {
      editTaskData.value.name = updatedTask.name
      editTaskData.value.done = updatedTask.done
      editTaskData.value.type = updatedTask.type
      editTaskData.value.list = (updatedTask.list) ? updatedTask.list : props.list.id
      updateTaskId.value = updatedTask.id
      updateTaskMutation().then(() => {
        emit('updateLists')
      }).catch((err) => { errMessage.value = err.message })
    }

    const removeTask = (removedTask: Task) => {
      deleteTaskId.value = removedTask.id
      removeTaskMutation().then(() => {
        emit('updateLists')
      }).catch((err) => { errMessage.value = err.message })
    }

    const removeList = () => {
      deleteListId.value = props.list.id
      removeListMutation().then(() => {
        emit('updateLists')
      }).catch((err) => { errMessage.value = err.message })
    }

    const updateList = async () => {
      updateListId.value = props.list.id
      updateListMutation().then(() => {
        emit('updateLists')
      }).catch((err) => { errMessage.value = err.message })

      editListNameFlag.value = false
      editListSlugFlag.value = false
    }

    const listIsCompleted = () => {
      const filteredList: Task[] = tasks.value.filter((task) => task.done)
      return (filteredList.length === tasks.value.length)
    }

    const userIsOwner = () => {
      return (props.list.owner as any).id === useUserStore().id
    }

    // MUTATIONS

    const { mutate: updateTaskMutation } = useMutation(editTask,
      () => ({
        variables: {
          editTaskData: editTaskData.value,
          id: updateTaskId.value
        }
      })
    )

    const { mutate: createTaskMutation } = useMutation(createTask,
      () => ({
        variables: {
          createTaskData: createTaskData.value
        }
      })
    )

    const { mutate: removeTaskMutation } = useMutation(deleteTask,
      () => ({
        variables: {
          deleteTaskId: deleteTaskId.value
        }
      })
    )

    const { mutate: removeListMutation } = useMutation(deleteList,
      () => ({
        variables: {
          deleteListId: deleteListId.value
        }
      })
    )

    const { mutate: updateListMutation } = useMutation(editList,
      () => ({
        variables: {
          editListData: editListData.value,
          id: updateListId.value
        }
      })
    )

    return {
      errMessage,

      tasks,
      createTaskData,
      editListData,

      addTask,
      removeTask,
      updateTask,
      updateList,
      removeList,

      listIsCompleted,
      editListNameFlag,
      editListSlugFlag,
      userIsOwner
    }
  }
})
</script>
