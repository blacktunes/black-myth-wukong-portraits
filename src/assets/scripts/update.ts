import log from '@/assets/data/log'
import { KEY } from '@/store/setting'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import type { WatchStopHandle } from 'vue'
import { popupManager } from './popup'

export const logCheck = (key: string, time?: string | number) => {
  return new Promise<void>((resolve) => {
    if (!time) return
    const lastUpdate = new Date(time).getTime()
    const localLastUpdate = localStorage.getItem(key)
    if (localLastUpdate === null) {
      localStorage.setItem(key, JSON.stringify(lastUpdate))
      return
    }
    if (lastUpdate) {
      if (lastUpdate > Number(localLastUpdate)) {
        resolve()
        localStorage.setItem(key, JSON.stringify(lastUpdate))
      }
    }
  })
}

export const initLog = () => {
  logCheck(KEY.UPDATE_KEY, log[0]?.time).then(() => popupManager.open('log'))
}

const { needRefresh, updateServiceWorker } = useRegisterSW()

export const updateCheck = () => {
  const updateWatcher: WatchStopHandle = watchEffect(() => {
    if (needRefresh.value) {
      nextTick(() => {
        updateWatcher()
      })
      popupManager.open('confirm', {
        text: ['发现新版本，是否立刻更新？'],
        fn: () => {
          popupManager.open('loading')
          updateServiceWorker(true)
        }
      })
    }
  })
}
