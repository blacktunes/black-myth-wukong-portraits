<template>
  <Transition
    name="fade"
    :duration="{ enter: 200, leave: 20 }"
  >
    <div
      class="window"
      v-if="props.index !== -1"
      :style="{
        zIndex: baseIndex + index
      }"
      @click.stop="close"
    >
      <div
        class="box"
        @click.stop
      >
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    index: number
    baseIndex?: number
    width?: string
    height?: string
  }>(),
  {
    baseIndex: 10
  }
)

const emit = defineEmits<{
  (event: 'close'): void
}>()

const close = () => {
  emit('close')
}
</script>

<style lang="stylus" scoped>
.window
  position absolute
  display flex
  justify-content center
  align-items center
  background rgba(0, 0, 0, 0.2)
  color #949393
  font-size 50px
  animation backdrop-filter 1s ease-in forwards
  inset 0

  .box
    display flex
    flex-direction column
    justify-content space-between
    border-radius 5px
    background url('@/assets/images/提示背景.webp')
    background-size cover

.fade-in-enter-active
  transition all 0.2s

.fade-in-enter-from
  opacity 0

@keyframes backdrop-filter
  from
    backdrop-filter blur(0px)

  to
    backdrop-filter blur(10px)
</style>
