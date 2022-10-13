
import Home from '@/pages/Home'
import ThreadShow from '@/pages/ThreadShow'
import ThreadCreate from '@/pages/ThreadCreate'
import ThreadEdit from '@/pages/ThreadEdit'
import Forum from '@/pages/Forum'
import Category from '@/pages/Category'
import Profile from '@/pages/Profile'
import NotFound from '@/pages/NotFound'
import { createRouter, createWebHistory } from 'vue-router'
import { findById } from '@/helpers'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile,
    meta: { toTop: true, smoothScroll: true }
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: Profile,
    props: { edit: true }
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category,
    props: true
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: Forum,
    props: true
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true,
    beforeRouter (to, from, next) {
      const threadExists = findById(this.$store.state, to.params.id)
      if (threadExists) {
        return next()
      } else {
        next({
          name: 'NotFound',
          // keep the current URL, including params, query & hash
          params: { pathMatch: to.path.toString(1).split('/') },
          query: to.query,
          hash: to.hash
        })
      }
    }
  },
  {
    path: '/forum/:forumId/thread/create',
    name: 'ThreadCreate',
    component: ThreadCreate,
    props: true
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    component: ThreadEdit,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to) {
    // only apply when meta defined on the route
    const scroll = {}
    if (to.meta.toTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'
    return scroll
  }
})
