import log from '@/assets/data/log'
import { KEY } from '@/store/setting'
import { timeComparison } from 'star-rail-vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import type { WatchStopHandle } from 'vue'
import { popupManager } from './popup'

export const logCheck = () => {
  timeComparison(KEY.UPDATE_KEY, log[0]?.time).then(() => popupManager.open('log'))
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
