import { setLocalStorage } from 'star-rail-vue'
import defaultImage from '@/assets/images/default.webp'

export const state: {
  ID?: number
  group: string | number
  expand: boolean
  window: 'index' | 'setting'
  screenshot: boolean
} = reactive({
  ID: undefined,
  group: '',
  expand: false,
  window: 'index',
  screenshot: false
})

export const setting: {
  download: boolean
  quality: number
} = reactive({
  download: true,
  quality: 1
})

export const current = computed(() => {
  const index = data.list.findIndex((item) => item.id === state.ID)
  if (index === -1) return
  return data.list[index]
})

export const list = computed(() => {
  const _list: {
    [type: string]: Portrait[]
  } = {}
  data.list.forEach((item) => {
    if (!(item.type in _list)) {
      _list[item.type] = []
    }
    _list[item.type].push(item)
  })
  for (const i in _list) {
    _list[i].sort((a, b) => b.time - a.time)
  }
  return _list
})

export const data = reactive<{
  list: Portrait[]
}>({
  list: [
    {
      id: Date.now(),
      name: '咸鱼',
      type: '小妖',
      info: '咸鱼咸，咸鱼咸，咸鱼咸鱼咸。\n咕咕咕，咕咕咕，咕咕咕咕咕。',
      text: '所以到底是咸鱼还是鸽子？\n不知道，鸽了。',
      overlay: true,
      time: Date.now(),
      image: defaultImage
    }
  ]
})

setLocalStorage(setting, 'wukong-portraits-setting')
