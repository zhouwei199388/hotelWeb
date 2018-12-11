// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import ElementUI  from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from './vuex/store'

import routes from 'routes'
import  Mock from './mock'


Mock.bootStrap();
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
  routes
});

router.beforeEach((to,from,next)=>{
  if(to.path==='/login'){
    //Todo 进入登录界面删除缓存
    sessionStorage.removeItem("user");
  }
  let user = JSON.parse(sessionStorage.getItem("user"));
  if(!user && to.path!=='./login'){
    next({path:'/login'})
  }else{
    next()
  }
});

new Vue({
  router,
  store,
  render:h=>h(App)
}).$mount('#app');


