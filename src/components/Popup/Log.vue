<template>
  <Transition
    name="fade"
    :duration="{ enter: 200, leave: 20 }"
  >
    <div
      class="log"
      v-if="props.index !== -1"
      :style="{ zIndex: 10 + index }"
      @click.stop="close"
    >
      <div
        class="box"
        @click.stop
      >
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
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import log from '@/assets/data/log'
import Btn from '../Common/Btn.vue'

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
  position absolute
  display flex
  justify-content center
  align-items center
  background rgba(0, 0, 0, 0.2)
  color #c3c3c3
  font-size 50px
  animation backdrop-filter 1s ease-in forwards
  inset 0

  .box
    display flex
    flex-direction column
    box-sizing border-box
    padding-top 20px
    width 1300px
    height 1600px
    border-radius 5px
    background rgba(0, 0, 0, 0.7)
    text-align center

    .title
      font-size 100px

    .scroll
      overflow auto
      box-sizing border-box
      padding 0 50px
      mask-image linear-gradient(to bottom, #000 calc(100% - 50px), transparent)
      flex 1

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
    margin-top 5px

    .label
      margin-bottom 10px
      font-size 40px

    .info
      color #666
      font-size 36px

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
      font-size 46px

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
