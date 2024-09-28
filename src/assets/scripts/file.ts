import { current, data, setting, state } from '@/store/data'
import { Parameter, setLocale, zhLocale } from '@ckpack/parameter'
import { decompressFromArrayBuffer, decompressFromZip, screenshot } from 'star-rail-vue'
import { popupManager } from './popup'

const dataRule = {
  id: {
    isRequired: false,
    type: 'number'
  },
  name: 'string',
  type: 'string',
  info: 'string',
  text: 'string',
  image: {
    isRequired: false,
    type: 'string'
  },
  overlay: {
    isRequired: false,
    type: 'boolean'
  },
  time: {
    isRequired: false,
    type: 'number'
  }
}

export const Accept = '.wukong'
export const Raw = 'raw.wukong'

setLocale(zhLocale)
const parameter = new Parameter()

export const inputFile = async () => {
  const el = document.createElement('input')
  el.type = 'file'
  el.accept = `.png,${Accept}`
  el.onchange = async () => {
    const file = el.files?.[0]
    if (file) {
      await importFile(file)
    }
  }
  el.click()
  el.remove()
}

export const importFile = async (file: File, open?: boolean) => {
  const accept = file.name.split('.').pop()
  if (`.${accept}` === Accept) {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onload = (e) => {
      if (e.target?.result) {
        try {
          const newDataList: Portrait[] = decompressFromArrayBuffer(e.target.result as ArrayBuffer)
          let time = Date.now()
          let num = 0
          for (const i in newDataList) {
            newDataList[i].time = time
            newDataList[i].id = time++
            const val = parameter.validate(dataRule, newDataList[i])
            if (val) {
              val.forEach((err) => {
                console.warn(err.message)
              })
            } else {
              data.list.push(newDataList[i])
              num += 1
            }
          }
          if (num === 0) {
            popupManager.open('confirm', {
              text: ['影神图导入失败', '请检查文件是否正确']
            })
          } else {
            popupManager.open('confirm', {
              text: [`已添加${num}张新影神图`]
            })
          }
        } catch (err) {
          popupManager.open('confirm', {
            text: ['影神图导入失败', String(err)]
          })
        }
      }
    }
  } else {
    try {
      const newData = await decompressFromZip<Portrait>(file, Raw)
      const time = Date.now()
      newData.time = time
      newData.id = time
      const val = parameter.validate(dataRule, newData)
      if (val) {
        val.forEach((err) => {
          console.warn(err.message)
        })
        throw Error()
      } else {
        data.list.push(newData)
        if (open) {
          state.window = 'index'
          state.group = newData.type
          state.ID = newData.id
        } else {
          popupManager.open('confirm', {
            text: ['已添加影神图', newData.name]
          })
        }
      }
    } catch {
      popupManager.open('confirm', {
        text: ['该文件可能不是由影神图生成器导出或内容已被修改']
      })
    }
  }
}

export const createScreenshot = (dom?: HTMLElement | null) => {
  if (popupManager.isLoading()) return

  state.screenshot = true
  popupManager.open('loading')
  nextTick(() => {
    if (dom) {
      if (!current.value) return

      screenshot(
        dom,
        {
          name: current.value.name,
          download: setting.download,
          data: {
            raw: JSON.stringify(toRaw(current.value)),
            filename: Raw
          }
        },
        { pixelRatio: setting.quality }
      )
        .catch(() => {
          popupManager.open('confirm', {
            text: ['图片保存失败']
          })
        })
        .finally(() => {
          setTimeout(() => {
            state.screenshot = false
            popupManager.close('loading')
          }, 1000)
        })
    } else {
      state.screenshot = false
      popupManager.close('loading')
    }
  })
}