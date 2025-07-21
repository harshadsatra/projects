<template>
  <main v-if="isLoggedIn" class="main">
    <section class="content">
      <div class="content__header">
        <h1 class="content__title">
          Tasks ({{ fileredTasks.length }})
          <span class="logout" @click="handleLogout">Logout {{ user.name }}</span>
        </h1>
        <ul class="content__mode">
          <li :class="{ active: uiMode == 'dark' }" @click="setMode('dark')">Dark</li>
          <li :class="{ active: uiMode == 'light' }" @click="setMode('light')">Light</li>
        </ul>
      </div>
      <header class=""></header>

      <ul
        class="list list--bg list--bg-west"
        v-if="fileredTasks.length > 0"
        :key="fileredTasks.length"
      >
        <template v-for="(task, index) in fileredTasks" :key="index + task.id">
          <TaskItem :task="task" :index="index" :collaborators="collaborators" />
        </template>
      </ul>
      <p v-else class="list__empty">No projects found</p>
    </section>
  </main>
  <main v-else class="main">
    <section class="login-section">
      <div class="login-card">
        <h2 class="login-title">Login</h2>
        <form @submit.prevent="handleLogin" class="login-form">
          <div>
            <label for="username" class="login-label">Username:</label>
            <input
              id="username"
              v-model="loginForm.username"
              type="text"
              required
              class="login-input"
            />
          </div>
          <div>
            <label for="password" class="login-label">Password:</label>
            <input
              id="password"
              v-model="loginForm.password"
              type="password"
              required
              class="login-input"
            />
          </div>
          <button type="submit" class="login-button">Login</button>
        </form>
        <p v-if="loginError" class="login-error">{{ loginError }}</p>
      </div>
    </section>
  </main>
</template>
<script lang="ts" setup>
// Get data from below apis and store it in a variable
// https://cms.shwezstudio.in/items/projects
// https://cms.shwezstudio.in/items/collaborators

// This component is a static list of projects, but you can replace it with dynamic data fetching
import { ref, reactive } from 'vue'
import type { TaskModal, CollaboratorModal } from '@/plugins/data.modal'
import TaskItem from '../components/TaskItem.vue'
import { computed } from 'vue'

/* UI Mode */
const uiMode = ref('dark') // 'dark' | 'light'
const setMode = (mode: 'dark' | 'light') => {
  uiMode.value = mode
  document.documentElement.setAttribute('data-mode', mode)
  // set the mode in localStorage
  localStorage.setItem('uiMode', mode)
}

setMode((localStorage.getItem('uiMode') as 'dark' | 'light') || 'dark')

// Fetch projects and collaborators data from the APIs
async function fetchData() {
  try {
    const [projectsResponse, collaboratorsResponse] = await Promise.all([
      fetch('https://cms.shwezstudio.in/items/task_list?fields=*,collaborators.collaborators_id'),
      fetch('https://cms.shwezstudio.in/items/collaborators'),
    ])
    const projects_list = await projectsResponse.json()
    tasks.value = projects_list.data

    const collaborators_list = await collaboratorsResponse.json()
    collaborators.value = collaborators_list.data
    Object.assign(user, getUsername())
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const tasks = ref([] as TaskModal[])
const collaborators = ref([] as CollaboratorModal[])

const loggedIn = ref(false)

const isLoggedIn = computed(() => {
  return localStorage.getItem('token') !== null || loggedIn.value
})

const loginForm = ref({
  username: '',
  password: '',
})

const user = reactive({} as CollaboratorModal)
const getUsername = (): CollaboratorModal => {
  const token = localStorage.getItem('token')
  if (token) {
    const decodedToken = atob(token).split('_')
    console.log('Decoded token:', decodedToken)
    if (decodedToken.length == 2) {
      const user = collaborators.value.find(
        (collaborator) => collaborator.email === decodedToken[0],
      )
      console.log('User found:', user, collaborators.value)
      return user as CollaboratorModal // Assuming the username is the first part
    }
  }
  return {} as unknown as CollaboratorModal
}

const loginError = ref('')

async function handleLogin() {
  loginError.value = ''
  try {
    console.log('Logging in with:', loginForm.value)

    const loggedInUser = collaborators.value.find(
      (collaborator) =>
        collaborator.email === loginForm.value.username &&
        collaborator.password === loginForm.value.password,
    )

    if (loggedInUser) {
      console.log('Valid user:', loggedInUser)
      localStorage.setItem('token', btoa(loginForm.value.username + '_' + loginForm.value.password)) // Simulate a token
      loginError.value = ''
      loggedIn.value = true
      Object.assign(user, loggedInUser)
      console.log('Login successful')
    } else {
      loginError.value = 'Invalid username or password'
      console.error('Login failed: Invalid credentials')
      loggedIn.value = false
    }
  } catch (e) {
    console.error('Login error:', e)
    loginError.value = 'Network error'
  }
}
async function handleLogout() {
  localStorage.removeItem('token')
  loggedIn.value = false
  console.log('Logged out successfully')
  window.location.reload() // Reload the page to reset the state
}

/**
 * Task and Collaborator Data
 */

/** Filer */
const filterObject = ref({
  user: user.id,
})

const fileredTasks = computed(() => {
  console.log('Filtering tasks for user:', filterObject.value.user)
  if (!filterObject.value.user) return tasks.value
  return tasks.value.filter((task) =>
    Array.isArray(task.person)
      ? task.person.includes(filterObject.value.user)
      : task.person === filterObject.value.user,
  )
})

fetchData()
</script>
