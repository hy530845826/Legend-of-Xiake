import Vue from 'vue'
import Router from 'vue-router'

import Game from '@/components/Game.vue'
import Home from '@/components/Home.vue'

Vue.use(Router)

export default new Router({
    mode:'hash',
    routes: [
        {
            path: '/Game',
            name: 'Game',
            component: Game
        },
        {
            path: '/Home',
            component: Home
        },
        {
            path: '/',
            redirect: '/Home'
        }
    ]
})