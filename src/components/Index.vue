<template>
  <div
    class="index"
    @click.stop
    @dragenter.prevent
    @dragover.prevent
    @drop.prevent.stop="handleDrop"
  >
    <Portraits v-if="state.window === 'index'" />
    <Setting v-else-if="state.window === 'setting'" />
  </div>
</template>

<script lang="ts" setup>
import { importFile } from '@/assets/scripts/file'
import { state } from '@/store/data'
import Portraits from './Index/Portraits.vue'
import Setting from './Index/Setting.vue'

const handleDrop = (e: DragEvent) => {
  if (e?.dataTransfer?.files) {
    importFile(e.dataTransfer.files[0], true)
  }
}
</script>

<style lang="stylus" scoped>
.index
  position relative
  overflow hidden
  width 100%
  height 100%
  background #000
</style>
