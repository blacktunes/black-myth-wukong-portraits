<template>
  <div class="setting">
    <div class="left">
      <template
        v-for="(group, key) in menu"
        :key="key"
      >
        <div class="label">{{ group.label }}</div>
        <template
          v-for="(item, index) in group.menu"
          :key="index"
        >
          <div
            class="item"
            :class="{ highlight: select === item.key, disable: getValue(item.disable) }"
            @mouseenter="menuSelect(item.key, getValue(item.disable))"
            @click.stop="menuSelect(item.key, getValue(item.disable))"
          >
            <div class="key">{{ item.key }}</div>
            <div class="value">
              <template v-if="item.type === 'switch'">
                <div
                  class="arrow-left"
                  @click.stop="!getValue(item.disable) ? item.left() : undefined"
                >
                  <Arrow />
                </div>
                <div class="text">{{ item.value }}</div>
                <div
                  class="arrow-right"
                  @click.stop="!getValue(item.disable) ? item.right() : undefined"
                >
                  <Arrow />
                </div>
              </template>
              <template v-else>
                <div
                  class="text"
                  @click.stop="
                    item.fn !== undefined && !getValue(item.disable) ? item.fn() : undefined
                  "
                >
                  {{ item.value }}
                </div>
              </template>
            </div>
          </div>
        </template>
      </template>
    </div>
    <div
      class="right"
      v-if="currentMenu"
    >
      <div class="key">{{ currentMenu.key }}</div>
      <div
        class="info"
        v-html="currentMenu.info?.replace(/\n/g, '<br>')"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { exportFile, inputFile } from '@/assets/scripts/file'
import { popupManager } from '@/assets/scripts/popup'
import { data } from '@/store/data'
import { setting } from '@/store/setting'
import { countStrToSize } from 'star-rail-vue'
import { Arrow } from '../Common/Icon'
const getValue = unref

const select = ref('')

const menuSelect = (key: string, disable?: boolean) => {
  if (unref(disable) === true) return
  select.value = key
}

const downloadChange = () => (setting.download = !setting.download)

const qualityChange = () => {
  if (setting.quality === 1) {
    setting.quality = 0.5
  } else {
    setting.quality = 1
  }
}

const isEmpty = computed(() => data.list.length < 1)

const exportData = () => {
  if (isEmpty.value) return
  exportFile()
}

const deleteData = () => {
  if (isEmpty.value) return

  popupManager.open('confirm', {
    text: ['确定清空影神图吗？'],
    fn: async () => {
      data.list.length = 0
      await nextTick()
      popupManager.open('confirm', {
        text: ['已清空影神图']
      })
    }
  })
}

interface MenuBase {
  key: string
  value: string | number | ComputedRef<string | number>
  info?: string
  disable?: boolean | ComputedRef<boolean>
}

type Menu =
  | ({
      type: 'switch'
      left: () => void
      right: () => void
    } & MenuBase)
  | ({
      type: 'click'
      fn?: () => void
    } & MenuBase)

const menu: {
  label: string
  menu: Menu[]
}[] = [
  {
    label: '截图',
    menu: [
      {
        type: 'switch',
        key: '保存方式',
        value: computed(() => (setting.download ? '下载图片' : '新窗口打开')),
        info: '切换保存影神图的方法。',
        left: downloadChange,
        right: downloadChange
      },
      {
        type: 'switch',
        key: '图片质量',
        value: computed(() => (setting.quality === 1 ? '高' : '低')),
        info: '切换影神图截图的质量。\n\n高 - 3200px\n低 - 1600px',
        left: qualityChange,
        right: qualityChange
      }
    ]
  },
  {
    label: '数据',
    menu: [
      {
        type: 'click',
        key: '影神图数量',
        value: computed(() => data.list.length),
        info: '收录影神图的数量。'
      },
      {
        type: 'click',
        key: '数据大小',
        info: '影神缓存占用的空间。',
        value: computed(() => countStrToSize(JSON.stringify(data.list)))
      },
      {
        type: 'click',
        key: '导入数据',
        info: '将影神图列表文件(.wukong)或由该网站生成的影神图图片中的数据导入。',
        value: '点击导入',
        fn: inputFile
      },
      {
        type: 'click',
        key: '导出数据',
        info: '导出全部影神图。',
        value: '点击导出',
        fn: exportData,
        disable: isEmpty
      },
      {
        type: 'click',
        key: '清空数据',
        info: '清空全部影神图。',
        value: '点击清空',
        fn: deleteData,
        disable: isEmpty
      }
    ]
  },
  {
    label: '其它',
    menu: [
      {
        type: 'click',
        key: '最后更新',
        value: computed(() => window.BUILD_TIME.toLocaleDateString())
      },
      {
        type: 'click',
        key: '更新日志',
        info: '查看更新日志。',
        value: '点击查看',
        fn: () => popupManager.open('log')
      }
    ]
  }
]

const currentMenu = computed<Menu | undefined>(() => {
  for (const group of menu) {
    for (const item of group.menu) {
      if (item.key === select.value) return item
    }
  }
})
</script>

<style lang="stylus" scoped>
.setting
  position relative
  overflow hidden
  width 100%
  height 100%
  background #000
  background-image url('@/assets/images/设置.webp')
  // background-image url('@/assets/images/设置.png')
  background-position 100% 0
  background-size 100%
  background-repeat no-repeat
  color #b8b7b6

  .left
    position absolute
    top 305px
    left 510px
    width 1300px
    height 1200px

    .label
      position relative
      margin 40px 0 40px 25px

      &:after
        position absolute
        bottom calc(-100% - 5px)
        left -30px
        margin-bottom 40px
        width 850px
        height 4px
        border-radius 1px
        background #41413f
        content ''
        opacity 0.7
        transform translateX(30px)

    .highlight
      background url('@/assets/images/设置按钮.webp')
      background-position center
      background-size 100%
      background-repeat no-repeat
      color #000

    .disable
      filter brightness(0.5)

    .item
      display flex
      align-items center
      margin 5px 0
      height 100px

      .key
        padding-left 55px
        width 50%

      .value
        display flex
        flex 1
        justify-content center
        align-items center

        .arrow-left
        .arrow-right
          display flex
          justify-content center
          align-items center
          width 50px
          height 100%

          svg
            width 40px
            height 40px

        .arrow-left
          transform rotate(90deg)

        .arrow-right
          transform rotate(-90deg) rotateY(180deg)

        .text
          width 300px
          height 100%
          text-align center

  .right
    position absolute
    top 305px
    left 2000px
    width 1000px
    height 1200px

    .key
      margin 40px 0 80px
</style>
