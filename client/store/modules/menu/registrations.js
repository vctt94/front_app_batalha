import lazyLoading from './lazyLoading'

export default {
    name: 'Cadastro',
    path: '/register',
    meta: {
        icon: 'fa-plus-square',
        expanded: false,
        link: 'register/index.vue'
    },
    component: lazyLoading('charts', true),

    children: [

        {
            name: 'Concurso',
            path: 'contest',
            component: lazyLoading('register/Contest'),
            meta: {
                link: 'register/Contest.vue'
            }
        },
        {
            name: 'Questão',
            path: 'question',
            component: lazyLoading('register/Question'),
            meta: {
                link: 'register/Question.vue'
            }
        },
        {
            name: 'Questão Discursiva',
            path: 'discursive',
            component: lazyLoading('register/Discursive'),
            meta: {
                link: 'register/Discursive.vue'
            }
        },


    ]
}
