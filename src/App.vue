<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />

  <footer class="footer">
    <p>
      Made with ❤️ by
      <a href="https://www.harshadsatra.in/" target="_blank" rel="noopener noreferrer">
        Harshad Satra
      </a>
      <span class="footer__separator">|</span>
      &nbsp;<RouterLink to="/about">About Me</RouterLink>
    </p>
  </footer>
</template>
