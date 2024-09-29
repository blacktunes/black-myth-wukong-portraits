import { state } from '@/store/data'
import { popupManager } from './popup'
import { startScreenshot } from './portraits'

let flag = false

export const windowChange = () => {
  if (state.window === 'index') {
    state.window = 'setting'
  } else {
    state.expand = false
    state.window = 'index'
  }
}

export const hotkey = () => {
  if (flag) return
  flag = true

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
  })

  document.addEventListener('click', (e) => {
    if (popupManager.isLoading()) return
    if ((e.target as HTMLElement).tagName.toLowerCase() === 'a') return
    popupManager.closeCurrentComponent()
  })

  document.addEventListener('keydown', async (e) => {
    if (popupManager.isLoading()) return
    switch (e.key) {
      case 'Tab':
        e.preventDefault()
        return
      case 'a':
        if (popupManager.hasPopup()) return
        windowChange()
        return
      case 'd':
        if (popupManager.hasPopup()) return
        windowChange()
        return
      // 保存截图
      case 's':
        if (popupManager.hasPopup()) return
        if (!e.ctrlKey) return
        e.preventDefault()
        startScreenshot()
        return
      case 't':
        if (popupManager.hasPopup()) return
        if (state.window === 'index') state.expand = !state.expand
        return
      case 'Enter':
        popupManager.currentComponentConfirm()
        return
      case 'Escape':
        popupManager.closeCurrentComponent()
        return
    }
  })
}
