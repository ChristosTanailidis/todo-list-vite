<template>
  <transition name="fade" class="flex mt-4">
    <ErrorMessage @click="errMessage=''" v-if="errMessage!=''" :message="errMessage"/>
  </transition>
  <!-- List and task creation -->
  <div class="flex justify-center">
    <div :class="createListData.type === 'work' ? 'border-purple-300': (createListData.type === 'fun' ? 'border-green-300' : 'border-blue-300')" class="bg-gray-600 border-2 border-opacity-40 rounded-lg shadow p-7 m-4">
      <div class="mb-4">
        <h1 class="text-white">Task List</h1>
        <div class="flex mt-4">
          <!-- list name -->
          <input
            :class="createListData.type === 'work' ? 'border-purple-300': (createListData.type === 'fun' ? 'border-green-300' : 'border-blue-300')"
            class="border-b-2 appearance-none bg-transparent w-full text-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
            placeholder="List name"
            v-model="createListData.title"
            type="text"
            @keydown="addListFocus(true)"
            @blur="addListFocus(false)"
          />
          <!-- type select -->
          <transition name="fade" class="flex mt-4">
            <div v-if="listCreationFocusFlag">
              <select
                name="type"
                id="type"
                :class="createListData.type === 'work' ? 'border-purple-300': (createListData.type === 'fun' ? 'border-green-300' : 'border-blue-300')"
                class="bg-gray-600 border-b-2 text-gray-200"
                v-model="createListData.type"
              >
                <option value="fun">Fun</option>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
              </select>
            </div>
          </transition>
        </div>
        <div>
          <!-- slug -->
          <transition name="fade" class="flex mt-4">
            <div v-if="listCreationFocusFlag">
              <input
                :class="createListData.type === 'work' ? 'border-purple-300': (createListData.type === 'fun' ? 'border-green-300' : 'border-blue-300')"
                class="border-b-2 appearance-none bg-transparent w-full text-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
                placeholder="Slug"
                type="text"
                v-model="createListData.slug"
              />
              <!-- capacity -->
              <input
                :class="createListData.type === 'work' ? 'border-purple-300': (createListData.type === 'fun' ? 'border-green-300' : 'border-blue-300')"
                class="border-b-2 appearance-none bg-transparent w-3/5 text-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
                placeholder="List Capacity"
                v-model="createListData.capacity"
                type="number"
                min="1"
                max="20"
              />
            </div>
          </transition>
        </div>
      </div>
      <!-- add task  -->
      <transition name="fade">
        <div v-if="createTaskFlag()" class="bg-gray-500 border border-gray-400 rounded p-5 w-full">
          <div class="mb-4">
            <h1 class="text-white">Tasks</h1>
            <div class="flex mt-4">
              <!-- task name -->
              <input
                :class="createListData.type === 'work' ? 'border-purple-300': (createListData.type === 'fun' ? 'border-green-300' : 'border-blue-300')"
                class="border-b-2 appearance-none bg-transparent w-full text-gray-200 mr-3 py-1 px-2 leading-tight focus:outline-none"
                placeholder="Add task"
                @keydown.enter="addATask"
                v-model="createTaskData.name"
              />
              <button
                :class="createListData.type === 'work' ? 'text-purple-300': (createListData.type === 'fun' ? 'text-green-300' : 'text-blue-300')"
                class="p-0 w-12 h-10 bg-gray-500 rounded-full hover:bg-gray-400 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                @click="addATask"
              >
                <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6 inline-block">
                  <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601 C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399 C15.952,9,16,9.447,16,10z"/>
                </svg>
              </button>
            </div>
          </div>
          <!-- added tasks -->
          <div v-for="task in tasks.filter((task) => !task.done)" :key="task.id">
            <div class="container flex mx-auto w-full items-center justify-center">
              <ul class="flex flex-col p-1 w-full">
                <TaskItem :task="task" @removeTask="removeTask"/>
              </ul>
            </div>
          </div>
          <div v-for="task in tasks.filter((task) => task.done)" :key="task.id">
            <div class="container flex mx-auto w-full items-center justify-center">
              <ul class="flex flex-col p-1 w-full">
                <TaskItem :task="task" @removeTask="removeTask"/>
              </ul>
            </div>
          </div>
        </div>
      </transition>
      <!-- create list and tasks -->
      <div>
        <button
          :class="createListData.type === 'work' ? 'border-purple-300': (createListData.type === 'fun' ? 'border-green-300' : 'border-blue-300')"
          class="p-1 mt-5 border-b-2 bg-gray-500 border-gray-400 rounded hover:bg-gray-400 active:shadow-lg mouse shadow-lg text-gray-200 transition ease-in duration-200 focus:outline-none"
          @click="submitCreateList"
        >
          Create Task List
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'

import { useMutation } from '@vue/apollo-composable'
import { createList } from '../assets/gql/list.mutations'
import { createTask } from '../assets/gql/task.mutations'

import TaskItem from '../components/TaskItem.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

import Task from '../interfaces/Task'
import List from '../interfaces/List'
import { useUserStore } from '../store/loggedUser'

export default defineComponent({
  name: 'CreateListTasks',
  emits: ['refetchListData'],
  components: {
    TaskItem,
    ErrorMessage
  },
  setup (_, { emit }) {
    const errMessage = ref('')

    const listCreationFocusFlag = ref(false) // flag gia to animation tou list molis

    const tasks = ref([] as Task[]) // krataei topika ta tasks kai ta ftiaxnei me to creation ena-ena

    const createTaskFlag = ref(() => {
      if (createListData.value.slug === '' ||
        createListData.value.title === '' ||
        createListData.value.capacity <= 0
      ) {
        return false
      }
      return true
    })

    const createListData = ref({
      slug: '',
      title: '',
      type: 'fun',
      capacity: 3,
      owner: ''
    }) as Ref<List>

    const createTaskData = ref({
      name: '',
      type: 'fun',
      list: '',
      done: false
    }) as Ref<Task>

    const addATask = () => {
      const tempTask = {
        name: createTaskData.value.name,
        type: createListData.value.type,
        list: createListData.value.slug,
        done: false
      } as Task
      tasks.value.push(tempTask)
      createTaskData.value.name = ''
    }

    const removeTask = (removedTask: Task) => {
      tasks.value.splice(
        tasks.value.findIndex(task => task === removedTask),
        1
      )
    }

    const addListFocus = (flag: boolean) => {
      if (flag) {
        listCreationFocusFlag.value = true
      } else {
        if (createListData.value.title !== '') {
          listCreationFocusFlag.value = true
        } else {
          listCreationFocusFlag.value = false
          clearInputElements()
        }
      }
    }

    const submitCreateList = async () => {
      createListData.value.owner = useUserStore().id
      await createListMutation().then(async (createdList) => {
        for (const task of tasks.value) {
          task.list = createdList?.data.create.id
          task.type = createdList?.data.create.type
          createTaskData.value = task

          await createTaskMutation().then()
            .catch((err) => { errMessage.value = err.message })
        }
        emit('refetchListData')
        clearInputElements()
      }).catch((err) => { errMessage.value = err.message })
    }

    const clearInputElements = () => {
      createListData.value.slug = ''
      createListData.value.title = ''
      createListData.value.type = 'fun'
      createListData.value.capacity = 3
      createListData.value.owner = ''

      createTaskData.value.name = ''
      createTaskData.value.type = 'fun'
      createTaskData.value.done = false
      createTaskData.value.list = ''

      listCreationFocusFlag.value = false
      tasks.value = []
    }

    const { mutate: createListMutation } = useMutation(createList,
      () => ({
        variables: {
          createListData: createListData.value
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

    return {
      errMessage,

      tasks,
      createListData,
      createTaskData,
      createTaskFlag,
      listCreationFocusFlag,

      submitCreateList,
      removeTask,

      addListFocus,
      addATask
    }
  }
})
</script>
