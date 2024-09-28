interface Portrait {
  id: number
  name: string
  type: string
  info: string
  text: string
  image?: string
  overlay?: boolean
  time: number
}

interface LogData {
  time: string
  text: {
    text: string
    info?: string | string[]
    author?: string
    url?: string
    highlight?: boolean
  }[]
}
