import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import myTitle from '@/components/myTitle.vue'
import mynav from '@/components/mynav.vue'
import axios from 'axios'
Vue.use(ElementUI)
Vue.component("my-Title", myTitle)
Vue.component("mynav", mynav)
axios.defaults.baseURL = "http://localhost:8282";
//axios请求默认是不携带cookie的，让了让其带上cookie，需要做一些设置。
// 允许携带cookie
axios.defaults.withCredentials = true;

Vue.prototype.axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
