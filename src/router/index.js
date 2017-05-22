import Vue     from 'vue'
import Router  from 'vue-router'
import Wrapper from '@/components/WrapperTemplate'
import Home    from '@/views/Home'
import Users   from '@/views/Users/Users'
import UserCreate   from '@/views/Users/UserCreate.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      isActive : true,
      nameToShow : 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'batalha',
      isActive : true,
      nameToShow : 'Batalha !',
      component: Home
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      isActive : false,
      nameToShow : 'Usuários',
      component: Users,
      children :  [
        {
        	path: '/listar',
        	append : true,
        	nameToShow : 'Listar Todos',
        	name 	   : 'listar',
        	component: Wrapper,
        },
        {
        	path: '/cadastrar',
        	append : true,
        	nameToShow : 'Cadastrar',
        	name 	   : 'cadastrar',
        	component: UserCreate
        },
   	  ],

    },
    {
      path: '/bandas',
      name: 'bandas',
      nameToShow : 'Bandas',
      isActive : false,
      children : [
        {
        	path: '/listar',
        	append : true,
        	nameToShow : 'Listar Todos',
        	name 	   : 'listar',
        	component: Wrapper,
        },
        {
        	path: '/cadastrar',
        	append : true,
        	nameToShow : 'Cadastrar',
        	name 	   : 'cadastrar',
        	component: Wrapper,
        },

      ],
      component: Wrapper
    }
  ]
})
