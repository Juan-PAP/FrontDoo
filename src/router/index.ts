import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue' 
import Customer from '../components/Customer.vue'
import CustomerLogin from '../components/CustomerLogin.vue'

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
},
{
path: '/customer',
name: 'customer',
component: Customer
},
{
path: '/customer/login',
name: 'customer-login',
component: CustomerLogin
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