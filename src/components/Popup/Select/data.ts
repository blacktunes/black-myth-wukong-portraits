export const data = reactive<{
  title: string
  list: string[] | readonly string[]
  select?: string
  extra?: { name: string; fn: () => void }
  fn?: () => void
}>({
  title: '',
  list: [],
  select: undefined,
  fn: undefined
})

let confirm = () => {}
export const callback = {
  open: <T extends string[] | readonly string[]>(config: {
    title: string
    list: T
    select?: T[number]
    extra?: { name: string; fn: () => void }
  }) => {
    return new Promise<T[number] | undefined>((resolve) => {
      data.title = config.title
      data.list = config.list
      data.select = config.select
      data.extra = config.extra
      data.fn = () => {
        resolve(data.select)
      }
    })
  },
  close: () => {
    data.title = ''
    data.list = []
    data.select = undefined
    data.extra = undefined
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
