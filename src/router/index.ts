import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path:"/",
    redirect:'/h5'
  },
  {
    path: '/h5',
    name: 'H5',
    component: () => import(/* webpackChunkName: "H5" */'../views/home.vue'),
    children:[
      {
        path: '',
        name: 'Match',
        component: () => import(/* webpackChunkName: "Match" */'../views/match/match.vue'),
      },
      {
        path: 'overview/:skipId',
        name: 'Overview',
        component: () => import(/* webpackChunkName: "Overview" */'../views/match/overview.vue')
      },
      {
        path: 'guess/:matchId',
        name: 'Guess',
        component: () => import(/* webpackChunkName: "Guess" */'../views/match/guess.vue'),
      },
      {
        path: 'bet/:betTypeId',
        name: 'Bet',
        component: () => import(/* webpackChunkName: "Bet" */'../views/match/bet.vue'),
      },

      {
        path: 'info',
        name: 'Info',
        component: () => import(/* webpackChunkName: "Info" */'../views/profile/info.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'shop',
        name: 'Shop',
        component: () => import(/* webpackChunkName: "Shop" */'../views/shop/shop.vue'),
      },
      {
        path: 'convert',
        name: 'Convert',
        component: () => import(/* webpackChunkName: "Convert" */'../views/shop/convert.vue'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login" */'../views/login/login.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "Register" */'../views/login/register.vue'),
      },
      {
        path: 'forget',
        name: 'Forget',
        component: () => import(/* webpackChunkName: "Forget" */'../views/login/forget.vue'),
      },

    ],
  },
  {
    path: "/:catchAll(.*)",
    component: () => import(/* webpackChunkName: "catchAll" */'../views/404/err.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
 const isLogin = !!store.state.token
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLogin) {
      next({
        path: '/h5/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})


export default router
