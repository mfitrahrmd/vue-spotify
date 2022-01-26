import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/explore",
    name: "Explore",
    component: () => import("../views/Explore.vue"),
  },
  {
    path: "/collections",
    name: "Collections",
    component: () => import("../views/Collections.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("@/components/Auth.vue"),
  },
  {
    path: "/playlists/:id",
    component: () => import("@/components/Playlists.vue"),
  },
  {
    path: "/tracks/:id",
    component: () => import("@/components/Tracks.vue"),
  },
  {
    path: "/albums/:id",
    component: () => import("@/components/Albums.vue"),
  },
  {
    path: "/artists/:id",
    component: () => import("@/components/Artists.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
