import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'home',
  component: () => import('../views/01_Home.vue'),
},
{
  path: '/mv',
  name: "musicvideo",
  component: () => import('../views/02_MusicVideo.vue'),
},
{
  path: '/musicbox',
  name: "musicbox",
  component: () => import('../views/03_MusicBox.vue'),
},
{
  path: '/singers',
  name: "singers",
  component: () => import('../views/04_singers.vue'),
},
{
  path: '/mine',
  name: "mine",
  component: () => import('../views/05_Mine.vue'),
},
{
  path: '/login',
  name: "login",
  component: () => import('../views/06_login.vue'),
},
{
  path: '/playlist',
  name: "playlist",
  component: () => import('../views/07_playList.vue'),
},
{
  path: '/search',
  name: "search",
  component: () => import('../views/08_Search.vue'),
},

]

const router = new VueRouter({ routes })

export default router
