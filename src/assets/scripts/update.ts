import { useRegisterSW } from 'virtual:pwa-register/vue'
import type { WatchStopHandle } from 'vue'
import { popupManager } from './popup'

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
