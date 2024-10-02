import './main.styl'

import { analytics } from 'star-rail-vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import App from './App.vue'
import { loadDatabase } from './assets/scripts/database'
import { hotkey } from './assets/scripts/hotkey'
import { showFirstItem } from './assets/scripts/portraits'
import { logCheck, updateCheck } from './assets/scripts/update'

analytics('G-10B19F2P0B', import.meta.env.MODE === 'development')

createApp(App)
  .use(VueDOMPurifyHTML, {
    allowedTags: ['br', 'span'],
    allowedAttributes: {
      span: ['style', 'class']
    }
  })
  .mount('#app')

hotkey()
logCheck()
loadDatabase().then(() => {
  showFirstItem()
  updateCheck()
})
