import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'

const routes: RouteRecordRaw[] = [
{
path: '/home',
name: 'home',
component: Home
},
{
path: '/login',
name: 'login',
component: Login
}
]

const router = createRouter({
history: createWebHistory(),
routes,
scrollBehavior(_to, _from, savedPosition) {
return savedPosition ?? { top: 0 }
}
})

export default router