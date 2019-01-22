import Vue from 'vue'
import Router from 'vue-router'
import UploadTab from '@/components/UploadFile'
import ManageTab from '@/components/Manage'
import ErrorApp from '@/components/Error'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/upload',
      name: 'Upload',
      component: UploadTab
    },
    {
      path : '/manage',
      name : 'Manage',
      component : ManageTab
    },
    {
  	  path:'*',
  	  name :'Error',
  	  component :ErrorApp
    },
    {
      path :'',
  	  redirect : "/upload"

    }
  ]
})
