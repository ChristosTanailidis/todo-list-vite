<template>
  <li class="border-gray-400 flex flex-row">
    <div
    :class="task.type === 'work' ? (task.done ? 'bg-purple-600' : 'bg-purple-500'): (task.type === 'fun' ? (task.done ? 'bg-green-600' : 'bg-green-500') : (task.done ? 'bg-blue-600' : 'bg-blue-500'))"
    class="shadow w-full select-none cursor-pointer bg-gray-400 rounded-md flex items-center p-1 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
      <!-- done checkbox -->
      <div class="flex flex-col rounded-md w-10 h-10 justify-center items-center mr-4">
        <input
          :disabled="!userIsOwner()"
          type="checkbox"
          class="form-checkbox h-6 w-6 text-gray-600"
          @change="updateTaskDone"
          v-model="taskData.done"
        />
      </div>
      <!-- edit task -->
      <div @click="editTaskFlag=true" style="min-width: 150px" class="flex-1 pl-1">
        <!-- edit task === true -->
        <div v-if="editTaskFlag && userIsOwner()" class="flex flex-row justify-between">
          <input
            :style="`width: ${task.name.length * 9}px`"
            class="border-b-2 font-medium appearance-none bg-transparent w-auto text-gray-200 py-1 leading-tight focus:outline-none"
            style="margin-right: 30px; max-width: 200px"
            v-model="taskData.name"
            autofocus
            @keydown.enter="updateTaskName"
            @keydown="openTaskMenu=false"
            @blur="updateTaskName"
          />
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 pt-1 pl-2 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
        <!-- edit task === false -->
        <div v-else class="flex flex-row">
          <div
            style="max-width: 220px;"
            :class="task.done ? 'line-through' : ''"
            class="font-medium flex-1 text-gray-100 mr-5 break-words text-left"
          >
            {{ task.name }}
          </div>
          <div class="h-7 w-8 pt-1 pl-2 mr-1" />
        </div>
      </div>
      <!-- task edit menu -->
      <div v-if="listId && userIsOwner()">
        <div class="flex m-1 items-center">
          <button
            class="uppercase shadow p-3 flex items-center bg-gray-500 hover:bg-gray-400 text-blue-50 max-w-max shadow-sm hover:shadow-lg rounded w-10 h-10"
            @click="openTaskMenu ? closeAll() : openTaskMenu=true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="transform duration-300 ease-in" :class="openTaskMenu ? 'rotate-180': 'rotate'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      <!-- delete task -->
      <div v-if="!listId && userIsOwner()">
        <div class="flex m-1 items-center">
          <button
            class="uppercase shadow p-3 flex items-center bg-gray-500 hover:bg-gray-400 text-blue-50 max-w-max shadow-sm hover:shadow-lg rounded w-10 h-10"
            @click="deleteTask"
          >
            <svg width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" style="transform: rotate(360deg);">
              <path d="M12 12h2v12h-2z" fill="currentColor"></path>
              <path d="M18 12h2v12h-2z" fill="currentColor"></path>
              <path d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20z" fill="currentColor"></path>
              <path d="M12 2h8v2h-8z" fill="currentColor"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- edit menu -->
    <transition name="fade">
      <div v-if="openTaskMenu" @click="openTaskMenu ? closeAll() : openTaskMenu=true" class="absolute z-20 right-0 top-0 h-full w-full bg-gray-500 opacity-0">
      </div>
    </transition>
    <transition name="fade">
      <div v-if="openTaskMenu" class="absolute z-30 h-30 shadow-xl bg-gray-500 rounded mt-2 opacity-none" style="margin-left: 297px">
        <ul class=" text-gray-200">
          <li class="font-medium">
            <a @click="editTaskFlag ? closeAll() : closeMenuAndFocus(); " class="flex items-center transform p-2 transition-colors duration-200 hover:bg-gray-400 cursor-pointer rounded-t">
              <div class="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              Edit
            </a>
          </li>
          <li class="font-medium">
            <a @click="openTaskMenuLists=!openTaskMenuLists" class="flex items-center transform p-2 transition-colors duration-200 hover:bg-gray-400 cursor-pointer">
              <div class="mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              Move
              <div :class="openTaskMenuLists ? 'rotate-180' : 'rotate-360'" class="ml-3 transform duration-300 hover:translate-x-1 ease-in">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </li>
          <li v-if="listId" class="font-medium">
            <a @click="deleteTask" class="flex items-center transform p-2 transition-colors duration-200 hover:bg-gray-400 hover:bg-red-600 cursor-pointer rounded-b">
              <div class="mr-3">
                <svg class="h-6 w-6" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" style="transform: rotate(360deg);">
                  <path d="M12 12h2v12h-2z" fill="currentColor"></path>
                  <path d="M18 12h2v12h-2z" fill="currentColor"></path>
                  <path d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20z" fill="currentColor"></path>
                  <path d="M12 2h8v2h-8z" fill="currentColor"></path>
                </svg>
              </div>
              Delete
            </a>
          </li>
        </ul>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="openTaskMenuLists" class="absolute z-30 h-30 shadow-xl bg-gray-500 rounded mt-2" style="margin-left: 420px; margin-top: 50px;">
        <ul class=" text-gray-200">
          <li v-for="list in listsOfThisType()" :key="list.id" class="font-medium">
            <a @click="moveTaskTo(list.id)" class="flex items-center transform p-2 transition-colors duration-200 rounded hover:bg-gray-400 cursor-pointer">
              <div class="flex justify-end">
                  {{ list.slug }}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </transition>

  </li>
</template>

<script lang='ts'>
import { defineComponent, PropType, Ref, ref } from 'vue'

import { useQuery } from '@vue/apollo-composable'
import { getLists } from '../assets/gql/list.queries'

import List from '../interfaces/List'
import Task from '../interfaces/Task'
import { useUserStore } from '../store/loggedUser'

export default defineComponent({
  name: 'TaskItem',
  emits: ['removeTask', 'updateTask'],
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true
    },
    listId: {
      type: String,
      required: false
    }
  },
  setup (props, { emit }) {
    const taskData = ref(props.task as Task) as Ref<Task>

    const editTaskFlag = ref(false) // flag gia na anoigei kai na kanei enable/disable to edit task
    const openTaskMenu = ref(false) // flag gia na anoigei to task menu gia edit, delete, moveToList
    const openTaskMenuLists = ref(false) // flag gia na anoigei to task menu gia edit, delete, moveToList

    const deleteTask = () => {
      emit('removeTask', taskData.value)
    }

    const updateTaskName = async () => {
      emit('updateTask', taskData.value)
      editTaskFlag.value = false
    }

    const updateTaskDone = async () => {
      emit('updateTask', taskData.value)
    }

    const moveTaskTo = (newListId: string) => {
      taskData.value.list = newListId
      console.log(newListId)
      emit('updateTask', taskData.value)
    }

    const { result: listRes } = useQuery(getLists)

    const listsOfThisType = ref(
      () => {
        if (listRes.value) {
          const temp = listRes.value.lists
          const templistsOfThisType: List[] = []
          temp.forEach((list: any) => {
            if (list.id !== props.listId) {
              if (list.type === taskData.value.type) {
                templistsOfThisType.push(list)
              }
            }
          })
          return templistsOfThisType
        } else {
          return []
        }
      }
    )

    const closeAll = () => {
      openTaskMenu.value = false
      openTaskMenuLists.value = false
    }

    const closeMenuAndFocus = () => {
      editTaskFlag.value = true
      openTaskMenu.value = false
    }

    const userIsOwner = () => {
      const lists = listRes.value ? listRes.value.lists : []
      const foundList = lists.find((list: List) => list.id === props.listId) as List
      if (foundList) {
        return (foundList.owner as any).id === useUserStore().id
      }
      return false
    }

    return {
      taskData,

      deleteTask,
      updateTaskName,
      updateTaskDone,
      moveTaskTo,

      listsOfThisType,

      editTaskFlag,
      openTaskMenu,
      openTaskMenuLists,

      closeAll,
      closeMenuAndFocus,
      userIsOwner
    }
  }
})
</script>
