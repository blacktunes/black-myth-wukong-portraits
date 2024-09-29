<template>
  <div
    class="portraits"
    ref="dom"
  >
    <Transition name="left">
      <div
        class="left"
        v-if="!state.expand"
      >
        <div class="title">影神图</div>
        <div class="list">
          <div
            class="group"
            v-for="(group, key) in list"
            :key="key"
            :class="{ 'group-expand': state.group === key }"
          >
            <div
              class="label"
              @click.stop="onLabelClick(key)"
            >
              <span class="ellipsis">{{ key }}</span>
              <Arrow />
            </div>
            <div class="item-list">
              <div
                class="item"
                v-for="item in group"
                :key="item.id"
                :class="{ select: state.ID === item.id }"
                @mouseenter="state.ID = item.id"
                @click="state.ID = item.id"
                @contextmenu.stop.prevent="deleteItem(item.id)"
              >
                <span class="ellipsis">{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <div
      v-if="current"
      class="right"
      :class="{ expand: state.expand }"
    >
      <div class="title">
        <div
          v-if="state.expand"
          class="back"
          @click.stop="state.expand = false"
        >
          <Arrow />
        </div>
        <span
          class="hover"
          @click.stop="onTitleClick"
          >{{ current.name }}</span
        >
      </div>
      <div class="line"></div>
      <div
        class="info hover"
        @click.stop="onInfoClick"
        :style="{ overflow: state.screenshot ? 'hidden' : undefined }"
        v-dompurify-html="preprocessText(current.info)"
        ref="infoDom"
      ></div>
      <div
        class="info"
        style="margin-top: -5px"
        v-if="infoEllipsis"
      >
        <span>……</span>
      </div>
      <div
        class="text hover"
        :style="{ overflow: state.screenshot ? 'hidden' : undefined }"
        @click.stop="onTextClick"
        v-dompurify-html="preprocessText(current.text)"
        ref="textDom"
      ></div>
      <div
        class="text"
        style="margin-top: -5px"
        v-if="textEllipsis"
      >
        <span>……</span>
      </div>
      <div
        class="placeholder"
        v-show="state.expand"
      ></div>
      <Keyboard
        keyboard="T"
        :text="state.expand ? '收起' : '展开'"
        @click.stop="state.expand = !state.expand"
      />
    </div>
    <div
      v-if="current"
      class="book"
      :class="{ overlay: current.overlay }"
    >
      <div
        class="image hover"
        @click.stop="imageChange"
      >
        <img
          v-if="current.image"
          :src="current.image"
          alt=""
        />
      </div>
      <div
        v-show="current.image && !state.screenshot"
        class="change"
        @click.stop="current.overlay = !current.overlay"
      >
        <span>{{ current.overlay ? '还原' : '融入' }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { emitter } from '@/assets/scripts/event'
import { createScreenshot } from '@/assets/scripts/file'
import { popupManager } from '@/assets/scripts/popup'
import { current, data, list, state } from '@/store/data'
import { Arrow } from '../Common/Icon'
import Keyboard from '../Common/Keyboard.vue'

const height = computed(() => {
  if (!state.group) return
  return `${list.value[state.group].length * 90 + 25}px`
})

const infoDom = ref<HTMLElement | null>(null)
const infoEllipsis = computed(() => {
  if (state.expand) return false
  if (!infoDom.value) return false
  if (infoDom.value.scrollHeight - infoDom.value.offsetHeight > 20) {
    return true
  }
})

const textDom = ref<HTMLElement | null>(null)
const textEllipsis = computed(() => {
  if (state.expand) return false
  if (!textDom.value) return false
  if (textDom.value.scrollHeight - textDom.value.offsetHeight > 20) {
    return true
  }
})

const dom = ref<HTMLElement | null>(null)

onMounted(() => {
  emitter.on('screenshot', () => {
    createScreenshot(dom.value)
  })
})

onUnmounted(() => {
  emitter.off('screenshot')
})

const onLabelClick = (label: number | string) => {
  state.group === label ? (state.group = '') : (state.group = label)
}

const onTitleClick = () => {
  if (!current.value) return
  popupManager
    .open('input', {
      title: '精怪名',
      placeholder: '???',
      defaultText: current.value.name,
      required: false
    })
    .then((name) => {
      if (name !== null) current.value!.name = name
    })
}

const onInfoClick = () => {
  if (!current.value) return
  popupManager
    .open('input', {
      title: '精怪简述',
      defaultText: current.value.info,
      textarea: true
    })
    .then((info) => {
      if (info !== null) current.value!.info = info
    })
}

const onTextClick = () => {
  if (!current.value) return
  popupManager
    .open('input', {
      title: '精怪详述',
      defaultText: current.value.text,
      textarea: true
    })
    .then((text) => {
      if (text !== null) current.value!.text = text
    })
}

const deleteItem = (id: number) => {
  const index = data.list.findIndex((item) => item.id === id)
  if (id !== -1) {
    popupManager.open('confirm', {
      text: ['是否删除该影神图？'],
      fn: () => {
        data.list.splice(index, 1)
      }
    })
  }
}

const imageChange = () => {
  popupManager.open('cropper', { aspectRatio: 0.7, maxWidth: 1280 }).then((res) => {
    if (!current.value) return
    current.value.image = res.base64
  })
}

const preprocessText = (text: string) => {
  if (!text) return
  if (!state.expand) {
    text = text.split('\n\n')[0]
  }
  return text.replace(/\n/g, '<br>')
}
</script>

<style lang="stylus" scoped>
group_select()
  background url('@/assets/images/分组按钮.webp')
  background-position 100% 0
  background-size 100%
  background-repeat no-repeat
  color #000

item_select()
  background url('@/assets/images/按钮.webp')
  background-position -10px 0
  background-size 100%
  background-repeat no-repeat

  span
    color #000

.portraits
  position relative
  overflow hidden
  width 100%
  height 100%
  background #000
  background-image url('@/assets/images/游记.webp')
  background-position 100% 0
  background-size 100%
  background-repeat no-repeat

  .left
    position absolute
    top 300px
    left 200px
    display flex
    flex-direction column
    width 650px
    color #c5c6c2

    .title
      margin 0 0 35px 40px
      font-size 50px

    .list
      overflow auto
      height 1200px

      &::-webkit-scrollbar
        width 0px
        height 0px

      .group-expand
        .label
          group_select()

          .icon
            transform rotate(180deg)

        .item-list
          max-height v-bind(height)

      .label
        display flex
        justify-content space-between
        align-items center
        box-sizing border-box
        margin 10px 10px 0
        padding 0 50px 0 65px
        height 95px
        border-radius 10px
        background linear-gradient(to right, #211f1f, transparent 90%)
        font-size 48px

        span
          width 400px

        .icon
          width 35px
          height 35px

        &:hover
          group_select()

      .item-list
        overflow hidden
        margin 20px 40px 0 25px
        max-height 0
        transition max-height 0.2s

        .item
          display flex
          align-items center
          box-sizing border-box
          margin 10px 0
          padding-left 60px
          height 80px
          border-radius 10px
          background linear-gradient(to right, rgba(31, 31, 31, 0.5), transparent 90%)
          font-size 40px

          span
            width 400px

        .select
          item_select()

  .right
    position absolute
    top 390px
    left 910px
    display flex
    flex-direction column
    width 650px
    transition 0.3s

    .title
      position relative
      color #c9b376
      font-size 50px

      .back
        position absolute
        top 20px
        left -15px
        width 20px
        height 20px
        color #fff
        transform rotate(90deg) rotateY(180deg)

    .line
      flex-shrink 0
      width 480px
      height 4px
      border-radius 1px
      background #41413f
      opacity 0.7
      transform translateY(-5px)

    .info
      flex-shrink 0
      overflow hidden
      margin-top 10px
      max-height 255px
      color #656464
      font-size 40px
      line-height 60px

    .text
      flex-shrink 0
      overflow hidden
      margin-top 50px
      max-height 340px
      color #b8b8b8
      font-size 40px
      line-height 55px

  .expand
    left 295px
    width 1250px
    height 1180px

    .info
      overflow auto
      margin-bottom 50px
      max-height 400px
      mask-image linear-gradient(to bottom, #000 calc(100% - 20px), transparent)

    .text
      position relative
      overflow auto
      overflow auto
      margin-top 0
      padding 30px 0
      max-height 450px
      mask-image linear-gradient(to bottom, #000 calc(100% - 60px), transparent)

      &:before
        position absolute
        top 0
        left 0
        width 80%
        border-top 4px solid rgba(65, 65, 65, 0.4)
        content ''

    .placeholder
      flex 1

  .overlay
    mix-blend-mode overlay

  .book
    position absolute
    top 235px
    left 1820px
    box-sizing border-box
    width 850px
    height 1500px
    transform rotate(5deg) skew(-4.5deg, 0deg)

    &:hover
      .change
        mask-position 0 0

    .image
      position absolute
      top 145px
      left 20px
      box-sizing border-box
      width 800px
      height 1180px
      border-radius 5px
      transition 0.2s
      clip-path polygon(0 0, 0 1140px, 100% 100%, 735px 0)

      img
        width 100%
        height 100%
        object-fit cover

    .change
      position absolute
      bottom 40px
      left 50%
      display flex
      justify-content center
      align-items center
      width 500px
      height 130px
      background url('@/assets/images/毛笔按钮.webp')
      background-size 100% 100%
      font-weight bold
      font-size 40px
      opacity 0.95
      transition 0.3s
      transform translateX(-50%) rotate(3deg)
      mask-image linear-gradient(to right, #000, #000, 50%, transparent 60%)
      mask-size 200% 100%
      mask-position 115% 0
      mask-repeat no-repeat

      span
        color var(--text-color)
        transform translate(-10px, 5px)

.left-enter-active
.left-leave-active
  transition 0.3s

.left-enter-from
.left-leave-to
  opacity 0
  transform translateX(-50%)
</style>
