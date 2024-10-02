<template>
  <Window
    :index
    @close="close"
  >
    <div class="select">
      <div class="title">{{ data.title }}</div>
      <div class="menu-list">
        <div
          class="item hover"
          :class="{ highlight: item === data.select }"
          v-for="item in data.list"
          :key="item"
          @click.stop="data.select = item"
        >
          <div class="bg"></div>
          <span>{{ item }}</span>
        </div>
        <div
          v-if="data.extra"
          class="item hover"
          style="font-weight: bold"
          @click.stop="data.extra.fn"
        >
          <span>{{ data.extra.name }}</span>
        </div>
      </div>
      <div class="footer">
        <Btn
          name="确认"
          :disable="!data.select"
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

const onConfirmlClick = () => {
  data.fn?.()
  close()
  return true
}

callback.confirm = onConfirmlClick
</script>

<style lang="stylus" scoped>
@import '../../../assets/styles/function.styl'

.select
  display flex
  flex-direction column
  justify-content space-between
  min-height 500px
  max-height 1600px
  width 1200px
  text-align center

  .title
    padding-top 30px
    text-align center
    font-size 76px

  .menu-list
    display flex
    flex 1
    flex-direction column
    align-items center
    overflow auto
    margin 30px 0 20px
    background rgba(199, 199, 199, 0.3)

    .item
      position relative
      display flex
      flex-shrink 0
      justify-content center
      align-items center
      box-sizing border-box
      padding 0 30px 0 20px
      width 800px
      height 150px
      background-position center
      background-size 100% 120%
      transition color 0.3s
      user-select none

      .bg
        mask_image('@/assets/images/毛笔按钮.webp')
        background-size 100% 100%

      span
        z-index 2
        text-align center
        font-size 46px

    .highlight
      filter invert(1)

      .bg
        mask-position 0 0

      span
        color #fff

  .footer
    display flex
    margin-top 30px
</style>
