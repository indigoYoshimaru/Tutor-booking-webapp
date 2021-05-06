import 'framework7/framework7-bundle.min.css'
import '/fonts.css'

import f7vue from 'framework7-vue'
import f7 from 'framework7/lite-bundle';

import App from '/components/App.vue'

import { createApp } from 'vue'

f7.use(f7vue)

createApp(App).mount("#app");