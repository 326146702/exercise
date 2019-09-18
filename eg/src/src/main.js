import Vue from 'vue'
import ElementUI from 'element-ui'
import fabric from 'fabric'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './index'
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(fabric);
// Vue.directive('rainbow',{
//   bind(el,binding,vnode){
//     el.style.color = '#' + Math.random().toString(16).slice(2,8);
//   }
// })
// Vue.filter("to-uppercase",function(value){
//   return value.toUpperCase();
// })
Vue.filter("snippet",function(value){
  return value.slice(0,100) + "...";
})

// const router = new VueRouter({
//   routes:Routes,
//   mode:"history"
// })
new Vue({
  el: '#app',
  render: h => h(App),
  // router:router
})
