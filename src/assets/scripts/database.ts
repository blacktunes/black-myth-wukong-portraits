import { data } from '@/store/data'
import { createDatabase } from 'star-rail-vue'
import { popupManager } from './popup'

export const loadDatabase = () => {
  return new Promise<void>((resolve) => {
    // 数据库加载超时
    const timeout = setTimeout(() => {
      popupManager.open('confirm', {
        text: [
          '加载时间过长，可能是数据损坏',
          '点击<span style="color:red">确认</span>可以继续使用，但是可能出现功能异常'
        ],
        fn: () => {
          popupManager.close('loading')
        },
        close: () => {
          resolve()
        }
      })
    }, 30 * 1000)

    createDatabase('wukong-portraits', '影神图')
      .add({
        data: data,
        key: 'list',
        name: 'portraits'
      })
      .next()
      .then(() => {
        popupManager.close('confirm')
        resolve()
      })
      .catch((err) => {
        console.error(err)

        popupManager.open('confirm', {
          text: ['数据库初始化失败', '编辑的数据可能会丢失且不会被保存'],
          close: () => {
            resolve()
          }
        })
      })
      .finally(() => {
        clearTimeout(timeout)
        popupManager.close('loading')
      })
  })
}