import { state } from './setting'

export const current = computed(() => {
  const index = data.list.findIndex((item) => item.id === state.ID)
  if (index === -1) return
  return data.list[index]
})

export const list = computed(() => {
  const _list: Map<string, Portrait[]> = new Map([
    ['小妖', []],
    ['头目', []],
    ['妖王', []],
    ['人物', []]
  ])
  data.list.forEach((item) => {
    if (!_list.has(item.type)) {
      _list.set(item.type, [item])
    } else {
      _list.get(item.type)!.push(item)
    }
  })
  for (const group of _list.values()) {
    group.sort((a, b) => b.time - a.time)
  }
  return _list
})

export const data = reactive<{
  list: Portrait[]
}>({
  list: []
})
