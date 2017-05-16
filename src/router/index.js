import Vue from 'vue'
import Router from 'vue-router'
import Wrapper from '@/components/WrapperTemplate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      nameToShow : 'Home', 
      component: Wrapper
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      isActive : true,
      nameToShow : 'Usuários', 
      component: Wrapper,
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
        	component: Wrapper
        },
   	  ],

    },
    {
      path: '/bandas',
      name: 'bandas',
      nameToShow : 'Bandas', 
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
