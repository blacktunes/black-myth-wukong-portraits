import type { LogData } from 'star-rail-vue'

const log: LogData[] = [
  {
    time: '2024-10-01',
    text: [
      {
        text: '优化界面和操作',
        info: [
          '默认显示游戏里的四个分类',
          '增加新建影神图时分类选择页',
          '增加删除快捷键(Del)',
          '优化按钮动画效果'
        ]
      },

      {
        text: '增加影神图的管理菜单',
        info: '选择影神图时右键(移动端长按)可打开'
      }
    ]
  },
  {
    time: '2024-09-29',
    text: [
      {
        text: '测试版上线',
        highlight: true
      }
    ]
  }
]

export default log
