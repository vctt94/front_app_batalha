import Vue     from 'vue'
import Router  from 'vue-router'
import Wrapper from '@/components/WrapperTemplate'
import Home    from '@/views/Home'
import Users   from '@/views/Users/Users'
import UserCreate   from '@/views/Users/UserCreate.vue'
import BandCreate   from '@/views/bands/BandCreate.vue'


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
      component: UserCreate,
      children :  [
        {
        	path: '/listar',
        	append : true,
          meta : {
            label: 'Listar Todos',
          },
        	name 	   : 'listar',
        	component: Wrapper,
        },
        {
        	path: '/cadastrar',
        	append : true,
          meta : {
            label: 'Cadastrar',
          },
        	name 	   : 'cadastrar',
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
      component  :  BandCreate,
      isActive : false,
      children : [
        {
        	path: '/listar',
        	append : true,
          meta : {
            label: 'Listar Todos',
          },
        	name 	   : 'listar',
        	component: Wrapper,
        },
        {
        	path: '/cadastrar',
        	append : true,
          meta : {
            label: 'Cadastrar',
          },
        	name 	   : 'cadastrar',
        	component: Wrapper,
        },

      ],
    }
  ]
})
