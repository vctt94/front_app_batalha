import Vue     from 'vue'
import Router  from 'vue-router'
import Wrapper from '@/components/WrapperTemplate'
import Home    from '@/components/Home'


Vue.use(Router)
console.log(Home)
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
      path: '/usuarios',
      name: 'usuarios',
      isActive : false,
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
