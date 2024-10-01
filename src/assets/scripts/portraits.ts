import { current, data, list } from '@/store/data'
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

export const typeEdit = (select?: string) => {
  return new Promise<string>((resolve) => {
    popupManager
      .open('select', {
        title: '精怪分类',
        list: Array.from(list.value.keys()),
        select: select,
        extra: {
          name: '新增',
          fn: () => {
            popupManager
              .open('input', {
                title: '新增分类'
              })
              .then((type) => {
                if (type !== null) {
                  resolve(type)
                  popupManager.close('select')
                }
              })
          }
        }
      })
      .then((type) => {
        if (type) {
          if (type) resolve(type)
        }
      })
  })
}

export const titleEdit = () => {
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

export const infoEdit = () => {
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

export const textEdit = () => {
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

export const imageEdit = () => {
  popupManager.open('cropper', { aspectRatio: 0.7, maxWidth: 1280 }).then((res) => {
    if (!current.value) return
    current.value.image = res.base64
  })
}

export const deleteItem = () => {
  return new Promise<void>((resolve) => {
    const id = current.value?.id
    const index = data.list.findIndex((item) => item.id === id)
    if (id !== -1) {
      popupManager.open('confirm', {
        text: ['是否删除该影神图？'],
        fn: () => {
          data.list.splice(index, 1)
          resolve()
        }
      })
    }
  })
}
