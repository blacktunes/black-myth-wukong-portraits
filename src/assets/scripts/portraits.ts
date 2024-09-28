import { list, state } from '@/store/data'
import { emitter } from './event'

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
  for (const i in list.value) {
    state.group = i
    state.ID = list.value[state.group][0].id
    break
  }
}
