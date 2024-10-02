<template>
  <Window
    :index
    @close="close"
  >
    <div class="log">
      <div class="title">记录</div>
      <div class="scroll">
        <div
          class="item"
          :class="{
            highlight: index === 0
          }"
          v-for="(item, index) in log"
          :key="`time-${index}`"
        >
          <div class="time">{{ item.time }}</div>
          <div
            class="text"
            :class="{ 'text-highlight': text.highlight }"
            v-for="(text, key) in item.text"
            :key="`text-${index}-${key}`"
          >
            <span class="label">
              <span>
                {{ text.text }}
              </span>
              <template v-if="text.author">
                <a
                  target="_blank"
                  :href="text.url"
                >
                  @{{ text.author }}
                </a>
              </template>
            </span>
            <template v-if="text.info">
              <template v-if="Array.isArray(text.info)">
                <div
                  v-for="(info, infoKey) in text.info"
                  :key="infoKey"
                  class="info"
                >
                  <span v-html="info"></span>
                </div>
              </template>
              <template v-else>
                <div class="info">
                  <span v-html="text.info"></span>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
      <Btn
        name="关闭"
        class="close"
        @click.stop="close"
      />
    </div>
  </Window>
</template>

<script lang="ts" setup>
import log from '@/assets/data/log'
import Btn from '../Common/Btn.vue'
import Window from '../Common/Window.vue'

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
</script>

<style lang="stylus" scoped>
.log
  display flex
  flex-direction column
  box-sizing border-box
  padding-top 20px
  width 1300px
  height 1600px
  text-align center

  .title
    font-size 100px

  .scroll
    flex 1
    overflow auto
    box-sizing border-box
    padding 0 50px
    mask-image linear-gradient(to bottom, #000 calc(100% - 50px), transparent)

  .close
    flex 0 0 90px
    width 100%

ul
  margin 5px auto

.item
  margin 40px

  .time
    font-weight bold
    font-size 50px

  .text
    margin 10px 0 20px 0

    .label
      margin-bottom 10px
      font-size 40px

    .info
      color #666
      font-size 32px

:deep(a)
  color #949393
  text-decoration none
  font-weight bold
  font-size 36px
  font-family ''

  &:hover
    text-decoration underline

.highlight
  .time
    font-size 70px

  .text
    .label
      font-size 50px

    .info
      font-size 40px

.text-highlight
  .label
    color #000
    font-weight bold

  .info
    color #333 !important

  span
  a
    background #e4c680
</style>
