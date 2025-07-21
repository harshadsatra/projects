<template>
  <li class="list__item project" @mouseenter="animate" @mouseleave="animateBack">
    <span>{{ task.client_name }}</span>
    <span>{{ task.project_name }}</span>
    <span>{{ task.task_title }}</span>
    <span>{{ task.status }}</span>
    <span>{{ task.person }}</span>
  </li>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
import { TextAnimator } from '@/plugins/TextAnimator'
import type { TaskModal, CollaboratorModal } from '@/plugins/data.modal'
defineProps<{
  task: TaskModal
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
</script>
