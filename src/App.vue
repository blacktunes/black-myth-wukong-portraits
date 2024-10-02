<template>
  <Main
    :viewport="{ width: 3200 }"
    :popup="popupManager"
  >
    <Index />
    <Menu />
    <Shadow />
    <Tip />
  </Main>
</template>

<script lang="ts" setup>
import { Main } from 'star-rail-vue'
import { popupManager } from './assets/scripts/popup'
import Index from './components/Index.vue'
import Menu from './components/Menu.vue'
import Shadow from './components/Shadow.vue'
import Tip from './components/Tip.vue'
</script>
