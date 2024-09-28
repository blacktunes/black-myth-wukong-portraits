import { imageCompress } from 'star-rail-vue'
import { SuperImageCropper } from 'super-image-cropper'

export const imageCropper = new SuperImageCropper()

export const data = reactive<{
  img: string
  aspectRatio?: number
  fn?: (img: string) => void
}>({
  img: ''
})

const cropperOpen = (img: string, aspectRatio?: number) => {
  return new Promise<string>((resolve) => {
    data.img = img
    data.aspectRatio = aspectRatio
    data.fn = (str) => resolve(str)
  })
}

let confirm = () => {}
export const callback = {
  open: (config?: { aspectRatio?: number; maxWidth?: number }) => {
    return new Promise<{ base64: string; raw: File }>((resolve) => {
      const el = document.createElement('input')
      el.type = 'file'
      el.accept = 'image/*'
      el.onchange = async () => {
        if (el.files?.[0]) {
          resolve({
            base64: await cropperOpen(
              await imageCompress(el.files[0], config?.maxWidth),
              config?.aspectRatio
            ),
            raw: el.files[0]
          })
        }
      }
      el.click()
    })
  },
  close: () => {
    data.img = ''
    data.aspectRatio = undefined
    data.fn = undefined
  },
  set confirm(fn: () => any) {
    confirm = fn
  },
  get confirm() {
    return () => {
      confirm()
    }
  }
}
