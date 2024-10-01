<template>
  <Window
    :index
    @close="close"
  >
    <div class="data">
      <div class="title">编辑</div>
      <div class="menu-list">
        <div
          v-for="(item, index) in menu"
          :key="index"
          class="menu hover"
          @click.stop="item.fn ? item.fn() : undefined"
        >
          <div class="bg"></div>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </Window>
</template>

<script lang="ts" setup>
import { popupManager } from '@/assets/scripts/popup'
import {
  deleteItem,
  imageEdit,
  infoEdit,
  textEdit,
  titleEdit,
  typeEdit
} from '@/assets/scripts/portraits'
import Window from '@/components/Common/Window.vue'
import { current, list } from '@/store/data'
import { state } from '@/store/setting'

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

const menu = [
  {
    name: '修改名字',
    fn: titleEdit
  },
  {
    name: '修改简述',
    fn: infoEdit
  },
  {
    name: '修改详述',
    fn: textEdit
  },
  {
    name: '修改画像',
    fn: imageEdit
  },
  {
    name: '修改分类',
    fn: () => {
      typeEdit(current.value?.type).then((type) => {
        if (current.value) {
          current.value.type = type
          state.group = type
        }
      })
    }
  },
  {
    name: '精怪除名',
    fn: () => {
      const group = list.value.get(current.value!.type)
      deleteItem().then(() => {
        if (group && group.length === 0) {
          state.group = ''
        }
        popupManager.close('data')
      })
    }
  }
]
</script>

<style lang="stylus" scoped>
.data
  display flex
  flex-direction column
  justify-content space-between
  min-height 500px
  max-height 1600px
  width 1000px
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

    .menu
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

      &:hover
        filter invert(1)

        .bg
          mask-position 0 0

        span
          color #fff

      .bg
        position absolute
        z-index 1
        background url('@/assets/images/毛笔按钮.webp')
        background-size 100% 100%
        transition 0.3s
        mask-position 120% 0
        inset 0
        mask-image linear-gradient(to right, #000, #000, 50%, transparent 60%)
        mask-size 200% 100%
        mask-repeat no-repeat

      span
        z-index 2
        text-align center
        font-size 50px
</style>
