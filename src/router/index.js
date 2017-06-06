import Vue     from 'vue'
import Router  from 'vue-router'
import Wrapper from '@/components/WrapperTemplate'
import Home    from '@/views/Home'
import Users   from '@/views/Users/Users'
import UsersMain from '@/views/Users/UsersMain'
import Battle from '@/views/Battle/Battle'
import Landing from '@/views/Battle/Landing'
/**
* band
*/
import Band   from '@/views/Bands/Band.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'batalha',
            isActive : true,
            meta : {
                label: 'Batalha !',
                sidebar: true
            },
            component: Landing
        },
        {
            path: '/batalha',
            name: 'batalha',
            component  :  Battle,
            meta : {
                label: 'Batalha !',
                sidebar: false
            },
            isActive : false,
        },
        {
            path: '/usuarios',
            name: 'usuarios',
            isActive : false,
            meta : {
                label: 'Usuários',
                sidebar: true
            },
            component: UsersMain,
        },
        {
            path: '/bandas',
            name: 'bandas',
            meta : {
                label: 'Bandas',
                sidebar: true
            },
            component  :  Band,
            isActive : false,
        }
    ]
})
