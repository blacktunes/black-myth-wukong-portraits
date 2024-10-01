<template>
  <div class="link">
    <div
      class="left"
      @click.stop="windowChange"
    >
      <Keyboard keyboard="A" />
    </div>
    <div
      class="right"
      @click.stop="windowChange"
    >
      <Keyboard keyboard="D" />
    </div>
    <template
      v-for="(item, index) in menu"
      :key="index"
    >
      <div
        class="sep"
        v-if="index > 0"
      ></div>
      <div
        v-if="item.type === 'link'"
        class="btn"
        :title="item.tip"
      >
        <a
          :href="item.link"
          target="_blank"
        >
          {{ item.name }}
        </a>
      </div>
      <div
        v-else
        class="btn"
        :class="{ highlight: item.key === state.window }"
        :title="item.tip"
        @click.stop="item.fn"
      >
        <span>{{ item.name }}</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { windowChange } from '@/assets/scripts/hotkey'
import { popupManager } from '@/assets/scripts/popup'
import { startScreenshot } from '@/assets/scripts/portraits'
import { data, list } from '@/store/data'
import { state } from '@/store/setting'
import Keyboard from './Common/Keyboard.vue'

const createPortrait = (type: string) => {
  popupManager.open('cropper', { aspectRatio: 0.7, maxWidth: 1280 }).then((res) => {
    const time = Date.now()
    const portrait: Portrait = {
      id: time,
      name: res.raw.name.split('.')[0] ?? '???',
      type,
      info: '空。',
      text: '空。',
      image: res.base64,
      time
    }
    data.list.push(portrait)
    state.group = type
    state.ID = time
  })
}

const addPortrait = () => {
  popupManager
    .open('select', {
      title: '精怪分类',
      list: Array.from(list.value.keys()),
      select: '小妖',
      extra: {
        name: '新增',
        fn: () => {
          popupManager
            .open('input', {
              title: '新增分类'
            })
            .then((type) => {
              if (type !== null) {
                createPortrait(type)
                popupManager.close('select')
              }
            })
        }
      }
    })
    .then((type) => {
      if (type) {
        if (type) createPortrait(type)
      }
    })
}

interface MenuBase {
  name: string
  tip?: string
}

const menu: (
  | (MenuBase & {
      type: 'link'
      link: string
    })
  | (MenuBase & {
      type: 'other'
      key?: string
      fn?: () => void
    })
)[] = [
  {
    type: 'link',
    name: '作者',
    tip: 'Bilibili',
    link: 'https://space.bilibili.com/1384118'
  },
  {
    type: 'link',
    name: '代码',
    tip: 'Github',
    link: 'https://github.com/blacktunes/black-myth-wukong-portraits'
  },
  {
    type: 'other',
    name: '拓印',
    tip: '保存影神图',
    fn: startScreenshot
  },
  {
    type: 'other',
    name: '编撰',
    tip: '编写影神图',
    fn: addPortrait
  },
  {
    type: 'other',
    name: '游记',
    key: 'index',
    fn: () => {
      state.expand = false
      state.window = 'index'
    }
  },
  {
    type: 'other',
    name: '设置',
    key: 'setting',
    fn: () => {
      state.window = 'setting'
    }
  }
]
</script>

<style lang="stylus" scoped>
.link
  position absolute
  top 40px
  left 165px
  display flex
  justify-content flex-end
  align-items center
  box-sizing border-box
  padding 0 20px
  height 80px
  background linear-gradient(to right, transparent, rgba(0, 0, 0, 0.1) 5%, transparent 95%)
  color var(--text-color)
  font-size 44px

  .left
  .right
    position absolute
    top -65px

  .left
    left -45px

  .right
    right -45px

  .sep
    width 2px
    height 50%
    background #858585

  .btn
    position relative
    display flex
    justify-content center
    align-items center
    width 260px
    height 50px

    &:hover
      background linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1) 5%, transparent 95%)

  a
    color #c8c7c6
    text-decoration none
    user-select none

.highlight
  padding 0 55px
  height 80px !important

  &:before
    position absolute
    z-index 0
    width 400px
    height 100%
    background url('@/assets/images/菜单按钮.webp')
    background-position center
    background-size 400px
    background-repeat no-repeat
    content ''
    animation test 0.5s

  span
  a
    z-index 1
    color #000
    font-size 50px

@keyframes test
  from
    max-width 0
    opacity 0

  to
    max-width 400px
    opacity 1
</style>
