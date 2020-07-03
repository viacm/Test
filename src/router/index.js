import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import Login from '@/components/Login'
import home from '@/components/model/home'
import equipment from '@/components/model/equipment'
import equipmentdata from '@/components/model/equipmentdata'
import weijian from '@/components/model/weijian'
import trainmodel from '@/components/model/trainmodel'
import predict from '@/components/model/predict'
import system from '@/components/model/system'

Vue.use(Router)

export default new Router({
  // mode: 'history', // 打包时需注释
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/home',
          name: 'home',
          component: home,
          meta: {
            requireAuth: true
          }
        }, {
          path: '/equipment',
          name: 'equipment',
          component: equipment,
          meta: {
            requireAuth: true
          }
        }, {
          path: '/equipmentdata',
          name: 'equipmentdata',
          component: equipmentdata,
          meta: {
            requireAuth: true
          }
        }, {
          path: '/trainmodel',
          name: 'trainmodel',
          component: trainmodel,
          meta: {
            requireAuth: true
          }
        }, {
          path: '/predict',
          name: 'predict',
          component: predict,
          meta: {
            requireAuth: true
          }
        }, {
          path: '/weijian',
          name: 'weijian',
          component: weijian,
          meta: {
            requireAuth: true
          }
        }, {
          path: '/system',
          name: 'system',
          component: system,
          meta: {
            requireAuth: true
          }
        }

      ]
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
