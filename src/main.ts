import Vue from 'vue';
import App from './App.vue';
import store from './store/store';
import './registerServiceWorker';
import './assets/css/bootstrap-reboot.css';
import './assets/css/style.css';
import './assets/css/chat-block.css';
import './assets/css/chat.css';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
