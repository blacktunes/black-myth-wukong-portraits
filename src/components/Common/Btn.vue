<template>
  <div
    class="button"
    :class="{ disable }"
  >
    <span>
      <slot v-if="$slots.default"></slot>
      <template v-else>
        {{ name }}
      </template>
    </span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  name: string
  disable?: boolean
}>()
</script>

<style lang="stylus" scoped>
.disable
  pointer-events none

  &:before
    display none

.button
  position relative
  display flex
  flex 1
  justify-content center
  align-items center
  box-sizing border-box
  width 700px
  height 90px
  background rgba(29, 29, 29, 0.6)
  color #71706f
  font-size 50px
  user-select none

  &:hover
    background url('@/assets/images/提示按钮.webp')
    background-size 100% 100%
    color #000
</style>
