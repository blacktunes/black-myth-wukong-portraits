<template>
  <div class="keyboard hover">
    <div class="icon">{{ keyboard }}</div>
    <span v-if="text">{{ text }}</span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  keyboard: string
  text?: string
}>()
</script>

<style lang="stylus" scoped>
.keyboard
  display flex
  justify-content flex-start
  align-items center
  margin-top 85px
  width fit-content
  gap 15px

  .icon
    display flex
    justify-content center
    align-items center
    width 40px
    height 40px
    border-radius 5px
    background #535351
    color #111111
    font-weight bold
    font-size 32px
    font-family 'Simsun'

  span
    color #73726f
    font-size 40px
</style>
