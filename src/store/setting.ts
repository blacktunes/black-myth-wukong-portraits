import { setLocalStorage } from 'star-rail-vue'

export const KEY = {
  DATABASE_NAME: 'wukong-portraits',
  SETTING_KEY: 'wukong-portraits-setting',
  FILE_ACCEPT: '.wukong',
  RAW_NAME: 'raw.wukong',
  UPDATE_KEY: 'wukong-portraits-update'
}

export const state: {
  ID?: number
  group: string
  expand: boolean
  window: 'index' | 'setting'
  screenshot: boolean
} = reactive({
  ID: undefined,
  group: '',
  expand: false,
  window: 'index',
  screenshot: false
})

export const setting: {
  download: boolean
  quality: number
  tip: boolean
} = reactive({
  download: true,
  quality: 1,
  tip: true
})

setLocalStorage(setting, KEY.SETTING_KEY)
