<template>
  <Window
    :index
    @close="close"
  >
    <div
      class="input"
      :class="[data.textarea ? 'textarea' : 'text']"
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
  </Window>
</template>

<script lang="ts" setup>
import Btn from '@/components/Common/Btn.vue'
import Window from '@/components/Common/Window.vue'
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
  display flex
  flex-direction column
  justify-content space-between

  .title
    padding-top 30px
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

  .title
    padding-bottom 30px

.text
  min-height 400px
  width 1400px
</style>
