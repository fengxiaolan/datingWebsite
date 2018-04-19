
import Vue from 'vue';
import App from './App'
import router from './router'
import iView from 'iview';
import './my-theme/index.less';

Vue.use(iView)
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  beforeMount(){
    this.$Message.config({
        top: 30,
        duration: 3
    });
  }
})
