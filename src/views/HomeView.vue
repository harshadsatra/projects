<template>
  <main>
    <section class="content">
      <div class="content__header">
        <h1 class="content__title">My Projects ({{ fileredProjects.length }})</h1>
        <ul class="content__mode">
          <li :class="{ active: uiMode == 'dark' }" @click="setMode('dark')">Dark</li>
          <li :class="{ active: uiMode == 'light' }" @click="setMode('light')">Light</li>
        </ul>
      </div>
      <header class="">
        <nav class="filter_bar">
          <span>Year:</span>
          <a
            v-for="year in years"
            :key="year"
            class="hover-effect hover-effect--bg"
            :class="{ current: filterObject.year == year }"
            @click="filterObject.year = year"
            >{{ year }}</a
          >
          <!-- <RouterLink class="hover-effect hover-effect--bg" to="/">Home</RouterLink> -->
        </nav>

        <nav class="filter_bar">
          <span>Tags:</span>
          <a
            v-for="tag in tags"
            :key="tag"
            class="hover-effect hover-effect--bg"
            @click="setTag(tag)"
            :class="{ current: filterObject.tag.includes(tag) }"
            >{{ tag }}</a
          >
        </nav>

        <nav class="filter_bar">
          <span>Collaborators:</span>

          <a
            class="hover-effect hover-effect--bg"
            @click="setCollaborator(0)"
            :class="{ current: filterObject.collaborator == 0 }"
            >ALL</a
          ><a
            v-for="c in collaborators"
            :key="c.collaborators_id"
            class="hover-effect hover-effect--bg"
            @click="setCollaborator(c.id)"
            :class="{ current: filterObject.collaborator == c.id }"
            >{{ c.name }}</a
          >
        </nav>

        <CollaboratorCard
          v-if="filterObject.collaborator != 0 && selectedCollaborator"
          :key="filterObject.collaborator"
          :collaborator="selectedCollaborator"
        />
      </header>

      <ul
        class="list list--bg list--bg-west"
        v-if="fileredProjects.length > 0"
        :key="fileredProjects.length"
      >
        <template v-for="(project, index) in fileredProjects" :key="index + project.id">
          <LineItem :project="project" :collaborators="collaborators" />
        </template>
      </ul>
      <p v-else class="list__empty">No projects found</p>
    </section>
  </main>
</template>
<script lang="ts" setup>
// Get data from below apis and store it in a variable
// https://cms.shwezstudio.in/items/projects
// https://cms.shwezstudio.in/items/collaborators

// This component is a static list of projects, but you can replace it with dynamic data fetching
import { ref } from 'vue'
import type { ProjectModal, CollaboratorModal } from '@/plugins/data.modal'
import LineItem from '../components/LineItem.vue'

/* UI Mode */
const uiMode = ref('dark') // 'dark' | 'light'
const setMode = (mode: 'dark' | 'light') => {
  uiMode.value = mode
  document.documentElement.setAttribute('data-mode', mode)
  // set the mode in localStorage
  localStorage.setItem('uiMode', mode)
}

setMode((localStorage.getItem('uiMode') as 'dark' | 'light') || 'dark')

const projects = ref([] as ProjectModal[])
const collaborators = ref([] as CollaboratorModal[])
const years = ref(['All'])
const tags = ref(['All'])

/** Filer */
const filterObject = ref({
  year: 'All',
  tag: ['All'],
  collaborator: 0,
  is_live: true,
})

const selectedCollaborator = computed(() => {
  if (filterObject.value.collaborator === 0) {
    return null
  }
  if (!collaborators.value.length) {
    return null
  }
  // Find the collaborator with the selected ID
  return collaborators.value.find(
    (collaborator) => collaborator.id === filterObject.value.collaborator,
  )
})

const setCollaborator = (collaborator: number) => {
  if (collaborator === 0) {
    filterObject.value.collaborator = 0
    return
  }

  filterObject.value.collaborator =
    filterObject.value.collaborator === collaborator ? 0 : collaborator
}

const setTag = (tag: string) => {
  if (tag === 'All') {
    filterObject.value.tag = ['All']
    return
  }

  // If 'All' is selected, clear all tags
  // remove 'All' from the tag array if it exists
  if (filterObject.value.tag.includes('All')) {
    filterObject.value.tag = []
  }

  if (filterObject.value.tag.includes(tag)) {
    filterObject.value.tag = filterObject.value.tag.filter((t) => t !== tag)

    if (filterObject.value.tag.length === 0) {
      filterObject.value.tag.push('All')
    }
  } else {
    filterObject.value.tag.push(tag)
  }
}

import { computed } from 'vue'
import CollaboratorCard from '@/components/CollaboratorCard.vue'

const fileredProjects = computed(() =>
  projects.value.filter((project) => {
    const matchesYear =
      filterObject.value.year === 'All' || project.year === filterObject.value.year
    const matchesTag =
      filterObject.value.tag.includes('All') ||
      project.tags.some((tag) => filterObject.value.tag.includes(tag))
    const matchesIsLive =
      filterObject.value.is_live === undefined || project.is_live === filterObject.value.is_live

    const matchesCollaborators =
      filterObject.value.collaborator === 0 ||
      project.collaborators.some(
        (collab) => collab.collaborators_id === filterObject.value.collaborator,
      )

    return matchesYear && matchesTag && matchesIsLive && matchesCollaborators
  }),
)

// Fetch projects and collaborators data from the APIs
async function fetchData() {
  try {
    const [projectsResponse, collaboratorsResponse] = await Promise.all([
      fetch('https://cms.shwezstudio.in/items/projects?fields=*,collaborators.collaborators_id'),
      fetch('https://cms.shwezstudio.in/items/collaborators'),
    ])
    const projects_list = await projectsResponse.json()
    projects.value = projects_list.data
    projects.value.sort((a, b) => parseInt(b.year) - parseInt(a.year))

    // filter is_live projects
    projects.value = projects.value.filter((project) => project.is_live)

    const collaborators_list = await collaboratorsResponse.json()
    collaborators.value = collaborators_list.data

    processData()
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const processData = () => {
  // Extract years and tags from projects
  projects.value.forEach((project) => {
    if (!years.value.includes(project.year)) {
      years.value.push(project.year)
    }
    project.tags.forEach((tag) => {
      if (!tags.value.includes(tag)) {
        tags.value.push(tag)
      }
    })
  })

  // Sort years and tags
  years.value.sort((a, b) => parseInt(a) - parseInt(b))
  tags.value.sort()
}

fetchData()
</script>
