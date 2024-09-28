import Input from './Input.vue'
import { data, callback } from './data'

export const useInput = () => data

export const input = {
  component: Input,
  ...callback
}
