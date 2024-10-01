import { confirm } from '@/components/Popup/Confirm'
import { cropper } from '@/components/Popup/Cropper'
import Data from '@/components/Popup/Data.vue'
import { input } from '@/components/Popup/Input'
import Loading from '@/components/Popup/Loading.vue'
import Log from '@/components/Popup/Log.vue'
import { select } from '@/components/Popup/Select'
import { createPopupManager } from 'star-rail-vue'

export const popupManager = createPopupManager({
  loading: { component: Loading },
  log: { component: Log },
  data: { component: Data },
  cropper,
  confirm,
  input,
  select
})

popupManager.open('loading')
