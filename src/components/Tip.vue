<template>
  <Transition name="fade">
    <div
      class="tip"
      v-if="setting.tip"
    >
      <Teleport to="body">
        <div
          class="mask"
          @click.stop="setting.tip = false"
        ></div>
      </Teleport>
      <div class="item">
        <div class="line"></div>
        <span>保存影神图</span>
      </div>
      <div class="item">
        <div class="line"></div>
        <span>创建影神图</span>
      </div>
      <div class="item">
        <div class="line"></div>
        <span>影神图的内容均可修改</span>
      </div>
      <div class="hole"></div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { setting } from '@/store/setting'
</script>

<style lang="stylus" scoped>
.mask
  position fixed
  inset 0

.tip
  position absolute
  z-index 10
  background rgba(0, 0, 0, 0.7)
  inset 0
  mix-blend-mode hard-light

  .hole
    position absolute
    top 0
    left 750px
    width 450px
    height 150px
    background #808080

  .item
    position absolute
    top 120px
    z-index 11
    display flex
    flex-direction column
    align-items center

    &:nth-child(1)
      left 785px

    &:nth-child(2)
      left 1045px

    &:nth-child(3)
      top unset
      right 370px
      bottom 90px
      flex-direction column-reverse

.line
  width 100px
  height 6px
  border-radius 3px
  background #fff

span
  margin 20px
  color #fff
  font-size 60px
  writing-mode vertical-rl
</style>
