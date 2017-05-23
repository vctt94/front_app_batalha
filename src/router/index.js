import Vue     from 'vue'
import Router  from 'vue-router'
import Wrapper from '@/components/WrapperTemplate'
import Home    from '@/views/Home'
import Users   from '@/views/Users/Users'
import UserCreate   from '@/views/Users/UserCreate.vue'

/**
 * band
 */
import Band   from '@/views/bands/Band.vue'



Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'batalha',
      isActive : true,
      meta : {
        label: 'Batalha !'
      },
      component: Home
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      isActive : false,
      meta : {
        label: 'Usuários',
      },
      component: Users,
      children :  [
        {
        	path: 'listar',
          meta : {
            label: 'Listar Todos',
          },
        	name 	   : 'userList',
        	component: Wrapper,
        },
        {
        	path: 'cadastrar',
          meta : {
            label: 'Cadastrar',
          },
        	name 	   : 'userCreate',
        	component: UserCreate
        },
   	  ],

    },
    {
      path: '/bandas',
      name: 'bandas',
      meta : {
        label: 'Bandas',
      },
      component  :  Band,
      isActive : false,

    }
  ]
})
