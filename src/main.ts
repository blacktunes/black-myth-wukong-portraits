import './main.styl'

import { analytics } from 'star-rail-vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import App from './App.vue'
import { loadDatabase } from './assets/scripts/database'
import { hotkey } from './assets/scripts/hotkey'
import { initLog } from './assets/scripts/log'
import { showFirstItem } from './assets/scripts/portraits'
import { updateCheck } from './assets/scripts/update'

if (import.meta.env.MODE === 'production') {
  analytics('G-10B19F2P0B')
}

createApp(App)
  .use(VueDOMPurifyHTML, {
    allowedTags: ['br', 'span'],
    allowedAttributes: {
      span: ['style', 'class']
    }
  })
  .mount('#app')

hotkey()
initLog()
loadDatabase().then(() => {
  showFirstItem()
  updateCheck()
})
