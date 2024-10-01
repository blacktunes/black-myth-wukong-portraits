import Select from './Select.vue'
import { callback, data } from './data'

export const useSelect = () => data

export const select = {
  component: Select,
  ...callback
}
