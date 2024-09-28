import Confirm from './Confirm.vue'
import { data, callback } from './data'

export const useConfirm = () => data

export const confirm = {
  component: Confirm,
  ...callback
}
