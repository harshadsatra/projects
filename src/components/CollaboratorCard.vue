<template>
  <section class="collaborator-card">
    <h2>{{ collaborator.name }}</h2>
    <h3>{{ collaborator.designation }}</h3>
    <p>{{ collaborator.info }}</p>
    <a :href="collaborator.url" target="_blank">View Profile</a>
  </section>
</template>
<script lang="ts" setup>
import type { CollaboratorModal } from '@/plugins/data.modal'
import { defineProps } from 'vue'
defineProps<{
  collaborator: CollaboratorModal
}>()
</script>
<style scoped lang="scss">
.collaborator-card {
  padding: 12px;
  margin-bottom: 1.8rem;
  border: solid 1px var(--color-link);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  h2,
  h3,
  p {
    margin: 0;
    padding: 0;
    color: var(--color-link);
  }

  h2,
  h3 {
    color: var(--color-text);
  }
}
</style>
