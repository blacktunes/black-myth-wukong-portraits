<template>
  <Transition
    name="fade"
    :duration="{ enter: 200, leave: 20 }"
  >
    <div
      class="input"
      v-if="props.index !== -1"
      :style="{ zIndex: 10 + index }"
      @click.stop="close"
    >
      <div
        class="box"
        :class="[data.textarea ? 'textarea' : 'text']"
        @click.stop
      >
        <div class="title">{{ data.title }}</div>
        <textarea
          v-if="data.textarea"
          ref="inputDom"
          v-model="data.text"
          :placeholder="data.placeholder"
          @keydown.enter.stop="onTextareaEnter"
        ></textarea>
        <input
          v-else
          type="text"
          ref="inputDom"
          v-model="data.text"
          :placeholder="data.placeholder"
          @keydown.enter.prevent.stop="onConfirmlClick"
        />
        <div class="footer">
          <Btn
            name="确认"
            :disable="data.required && (!data.fn || data.text.length < 1)"
            @click="onConfirmlClick"
          />
          <Btn
            name="取消"
            @click="close"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import Btn from '@/components/Common/Btn.vue'
import { callback, data } from './data'

const inputDom = ref<HTMLInputElement | null>(null)

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

watch(
  () => props.index,
  () => {
    if (props.index !== -1) {
      nextTick(() => {
        inputDom.value?.focus()
      })
    }
  }
)

const onTextareaEnter = (e: KeyboardEvent) => {
  if (data.textarea && e.ctrlKey) onConfirmlClick()
}

const onConfirmlClick = () => {
  if (data.required && data.text.length < 1) return false

  data.fn?.(data.text || data.placeholder || '')
  close()
  return true
}

callback.confirm = onConfirmlClick
</script>

<style lang="stylus" scoped>
.input
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

    .title
      padding 30px
      text-align center
      font-size 76px

    textarea
    input
      box-sizing border-box
      outline none
      border-radius 5px
      background rgba(199, 199, 199, 0.3)
      color #a3a3a3
      font-size 52px

    input
      margin 50px 0
      padding 20px 60px
      height 130px
      text-align center

    textarea
      flex 1
      padding 50px
      width 100%
      resize none

    .footer
      display flex
      margin-top 30px

  .textarea
    width 1400px
    height 1600px

  .text
    min-height 400px
    width 1400px
</style>
