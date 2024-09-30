import { data, list } from '@/store/data'
import { state } from '@/store/setting'
import { emitter } from './event'
import { popupManager } from './popup'

export const startScreenshot = () => {
  if (state.window !== 'index') {
    state.expand = true
    state.window = 'index'
  }
  nextTick(() => {
    emitter.emit('screenshot')
  })
}

export const showFirstItem = () => {
  for (const group of list.value.entries()) {
    if (group[1].length > 0) {
      state.group = group[0]
      state.ID = group[1][0].id
      break
    }
  }
}

export const deleteItem = (id: number) => {
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
