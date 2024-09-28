export const data = reactive<{
  title: string
  required: boolean
  text: string
  placeholder?: string
  textarea?: boolean
  fn?: (str: string | null) => void
}>({
  title: '',
  required: true,
  text: '',
  placeholder: undefined,
  textarea: undefined,
  fn: undefined
})

let confirm = () => {}
export const callback = {
  open: (config: {
    title: string
    required?: boolean
    defaultText?: string
    placeholder?: string
    textarea?: boolean
  }) => {
    return new Promise<string | null>((resolve) => {
      data.title = config.title
      data.required = config.required === undefined ? true : config.required
      if (config.defaultText) {
        data.text = config.defaultText
      }
      data.placeholder = config.placeholder
      data.textarea = config.textarea
      data.fn = (str: string | null) => {
        resolve(str)
      }
    })
  },
  close: () => {
    data.fn?.(null)
    data.title = ''
    data.required = true
    data.text = ''
    data.placeholder = undefined
    data.textarea = undefined
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
