import { createRouter, createWebHistory } from 'vue-router'
import type { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue' 
import Customer from '../components/Customer.vue'
import CustomerRegister from '../components/CustomerRegister.vue'

const routes: RouteRecordRaw[] = [
    {
    path: '/',
    redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: '/customer',
        name: 'customer',
        component: Customer,
        meta: { requiresAuth: true }
    },
    {
        path: '/customer/register',
        name: 'customer-register',
        component: CustomerRegister,
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(_to, _from, savedPosition) {
        return savedPosition ?? { top: 0 }
    }
})
// Guard
router.beforeEach((
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    const token = localStorage.getItem('token')
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth && !token) {
    next({ name: 'login' })
    } else if (to.name === 'login' && token) {
    next({ name: 'home' })
    } else {
    next()
    }
})

export default router