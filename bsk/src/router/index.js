import Vue from 'vue'
import Router from 'vue-router'
import global from "@/core/global"
// console.log(global.getParam())
Vue.use(Router)

 const routers=new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/components/home'], resolve),
      // 重定向 如果是/ 显示info页
      redirect: "index",
      children:[
        {
          path:"index",
          name: 'index',
          meta:{
            keepAlive:true
          },
          //keepAlive true 禁止重复加载  false不禁止
          component: resolve => require(['@/components/main/index'], resolve)
        },
        {
          path:"news",
          name: 'news',
          component: resolve => require(['@/components/main/news'], resolve),
        },
        {
              path:"cart",
              name: 'cart',
              component: resolve => require(['@/components/main/cart'], resolve)
          },
          {
              path:"xq",
              name: 'xq',
              component: resolve => require(['@/components/main/xq'], resolve)
          },
          {
              path:"edit",
              name: 'edit',
              component: resolve => require(['@/components/main/edit'], resolve)
          },
          {
              path:"login",
              name: 'login',
              component: resolve => require(['@/components/main/login'], resolve)
          },
          {
              path:"my",
              name: 'my',
              component: resolve => require(['@/components/main/my'], resolve)
          }

      ]
    }
  ]
})

export default routers
