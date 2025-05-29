<template>
  <li class="list__item project" @mouseenter="animate" @mouseleave="animateBack">
    <a :href="project.url" target="_blank" class="list__item-col hover-effect hover-effect--bg">{{
      project.project_name
    }}</a>
    <!-- <span class="list__item-col hover-effect hover-effect--bg">{{ project.project_name }}</span> -->
    <span class="list__item-col hover-effect hover-effect--bg">{{
      arrayToCommaSeparatedString(project.tags)
    }}</span>

    <template v-if="collaboratorNames.length === 0">
      <span class=""></span>
    </template>
    <template v-else-if="collaboratorNames.length > 3">
      <span class="list__item-col hover-effect hover-effect--bg">{{ collaboratorNames }}</span>
    </template>
    <span class="list__item-col hover-effect hover-effect--bg">{{ project.year }}</span>
  </li>
</template>
<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { TextAnimator } from '@/plugins/TextAnimator'
import type { ProjectModal, CollaboratorModal } from '@/plugins/data.modal'
const props = defineProps<{
  project: ProjectModal
  collaborators: CollaboratorModal[]
}>()

const animators = new Map()
function animate(e: { currentTarget: unknown }) {
  const el = e.currentTarget as HTMLElement
  const spans = el.querySelectorAll('.hover-effect')

  spans.forEach((span: unknown) => {
    if (!animators.has(span)) {
      animators.set(span, new TextAnimator(span as HTMLElement))
    }
    animators.get(span).animate()
  })
}

function animateBack(e: { currentTarget: unknown }) {
  const el = e.currentTarget as HTMLElement
  const spans = el.querySelectorAll('.hover-effect')

  spans.forEach((span: unknown) => {
    if (animators.has(span)) {
      animators.set(span, new TextAnimator(span as HTMLElement))
      animators.get(span).animateBack()
    }
  })
}

// array to comma separated string
const arrayToCommaSeparatedString = (array: string[]) => {
  return array.join(', ')
}

const collaboratorNames = computed(() => {
  // Get the names of the collaborators for the project
  const collaboratorIds = props.project.collaborators.map(
    (c: { collaborators_id: number }) => c.collaborators_id,
  )
  return props.collaborators
    .filter((collaborator) => collaboratorIds.includes(collaborator.id))
    .map((collaborator) => collaborator.name)
    .join(', ')
})
</script>
