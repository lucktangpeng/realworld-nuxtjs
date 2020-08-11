import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _66ab47c4 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _3c00c00e = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _5e2ca78f = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _0b724a3d = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _5ec7d04f = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _4592139c = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))
const _5adc6e07 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _66ab47c4,
    children: [{
      path: "",
      component: _3c00c00e,
      name: "home"
    }, {
      path: "/login",
      component: _5e2ca78f,
      name: "login"
    }, {
      path: "/register",
      component: _5e2ca78f,
      name: "register"
    }, {
      path: "/settings",
      component: _0b724a3d,
      name: "settings"
    }, {
      path: "/profile/:username",
      component: _5ec7d04f,
      name: "profile"
    }, {
      path: "/article/:slug",
      component: _4592139c,
      name: "article"
    }, {
      path: "/editor/",
      component: _5adc6e07,
      name: "create"
    }, {
      path: "/editor/",
      component: _5adc6e07,
      name: "update"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
