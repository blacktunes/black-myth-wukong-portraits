export const data = reactive<{
  text: string[]
  fn?: () => void
  close?: () => void
}>({
  text: [],
  fn: undefined
})

let confirm = () => {}
export const callback = {
  open: (config: typeof data) => {
    data.text = config.text
    data.fn = config.fn
    data.close = config.close
  },
  close: () => {
    data.text = []
    data.fn = undefined
    if (data.close) {
      data.close()
      data.close = undefined
    }
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
