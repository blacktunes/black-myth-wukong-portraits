<template>
  <Transition
    name="fade"
    :duration="{ enter: 200, leave: 20 }"
  >
    <div
      class="confirm"
      v-if="props.index !== -1"
      :style="{ zIndex: 10 + index }"
      @click.stop="close"
    >
      <div
        class="box"
        @click.stop
      >
        <div class="text">
          <div
            v-for="(text, index) in data.text"
            :key="index"
            v-html="text"
          ></div>
        </div>
        <div class="footer">
          <Btn
            v-if="!data.fn"
            name="了解"
            @click="close"
          />
          <template v-else>
            <Btn
              name="确认"
              @click="onConfirml"
            />
            <Btn
              name="取消"
              @click="close"
            />
          </template>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import Btn from '@/components/Common/Btn.vue'
import { callback, data } from './data'

const props = defineProps<{
  name: string
  index: number
}>()

const emits = defineEmits<{
  (event: 'close', name: string): void
}>()

const close = () => {
  emits('close', props.name)
}

const onConfirml = async () => {
  data.fn?.()
  close()
  return true
}

callback.confirm = onConfirml
</script>

<style lang="stylus" scoped>
.confirm
  position absolute
  display flex
  justify-content center
  align-items center
  background rgba(0, 0, 0, 0.2)
  font-size 50px
  animation backdrop-filter 1s ease-in forwards
  inset 0

  .box
    display flex
    flex-direction column
    justify-content space-around
    min-height 400px
    width 1400px
    background url('@/assets/images/提示背景.webp')
    background-size cover

    .text
      display flex
      flex 1
      flex-direction column
      justify-content center
      align-items center
      color #949393
      text-align center
      gap 10px

    .footer
      display flex
</style>
