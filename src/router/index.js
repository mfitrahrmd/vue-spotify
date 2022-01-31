import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

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
    path: "/404",
    name: "NotFound",
    component: () => import("@/components/NotFound.vue"),
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
  {
    path: "*",
    component: () => import("@/components/NotFound.vue"),
  },
];

const protectedRoutes = routes.filter((route) => {
  return route.path != "/" && route.path != "/auth" && route.path != "/404";
});

protectedRoutes.map((m) => {
  m.beforeEnter = function (to, from, next) {
    if (!store.getters["auth/getAccessToken"]) {
      router.push("/");
    } else {
      next();
    }
  };
});

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    store.commit("auth/SET_TOKEN", { access_token: token });
  }
  next();
});

export default router;
