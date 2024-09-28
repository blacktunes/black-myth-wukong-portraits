import { confirm } from '@/components/Popup/Confirm'
import { cropper } from '@/components/Popup/Cropper'
import { input } from '@/components/Popup/Input'
import Loading from '@/components/Popup/Loading.vue'
import Log from '@/components/Popup/Log.vue'
import { createPopupManager } from 'star-rail-vue'

export const popupManager = createPopupManager({
  loading: { component: Loading },
  log: { component: Log },
  cropper,
  confirm,
  input
})

popupManager.open('loading')
