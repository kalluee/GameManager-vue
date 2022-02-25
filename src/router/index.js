import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login";
import Admin from "@/views/Admin";
import Referee from "@/views/Referee";
import TeamLead from "@/views/TeamLead";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin
    },
    {
        path: '/referee',
        name: 'Referee',
        component: Referee
    },
    {
        path: '/teamlead',
        name: 'TeamLead',
        component: TeamLead
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/result',
        name: 'Result',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "about" */ '../views/Result.vue')
        }
    }
]

const router = new VueRouter({
    routes
})

export default router
