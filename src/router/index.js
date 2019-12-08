import Vue from 'vue'
import Router from 'vue-router'

import Game from '@/components/Game.vue'
import GameStart from '@/components/GameStart.vue'

Vue.use(Router)

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/Game',
            name: 'Game',
            component: Game
        },
        {
            path: '/GameStart',
            component: GameStart
        },
        {
            path: '/',
            redirect: '/GameStart'
        }
    ]
})