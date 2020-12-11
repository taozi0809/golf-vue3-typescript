import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vant/lib/index.css';
import vant from './plugins/vant'

import './mock/index'

const app = createApp(App)


createApp(App)
    .use(store)
    .use(router)
    .use(vant)
    .mount('#app')
