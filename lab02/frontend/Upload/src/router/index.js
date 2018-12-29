import Vue from 'vue'
import Router from 'vue-router'
import UploadTab from '@/components/UploadFile'
import ErrorApp from '@/components/Error'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
  {

    path: '/upload',
    name: 'App',
    component: UploadTab,
  },
  {
  	path:'*',
  	name :'Error',
  	component :ErrorApp,
  },
  {
  	path :'',
  	redirect : "/upload",

  }
  ]
})
