// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import {Steps, Step, Notification, Checkbox, Dialog, Button} from 'element-ui'
import VueSocketio from 'vue-socket.io';

Vue.use(Vuex);
Vue.use(VueSocketio, 'http://127.0.0.1:3001',store);

Vue.use(VueAxios, axios)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Checkbox)
Vue.use(Dialog)
Vue.use(Button)

Vue.prototype.$notify = Notification

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  sockets:{
    connect: function(){
      console.log('socket connected')
    },
    battleUpdated: function(){
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
  },

})
