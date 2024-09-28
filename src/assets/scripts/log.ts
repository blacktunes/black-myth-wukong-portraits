import log from '@/assets/data/log'
import { logCheck } from 'star-rail-vue'
import { popupManager } from './popup'

export const initLog = () => {
  logCheck('wukong-portraits-update', new Date(log[0]?.time)).then(() => popupManager.open('log'))
}
