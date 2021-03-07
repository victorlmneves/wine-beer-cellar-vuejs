import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/wine/:id",
    name: "WineDetails",
    component: () =>
      import("../components/WineDetails.vue"),
  },
  {
    path: "/add-item",
    name: "AddItems",
    component: () =>
      import("../components/AddItems.vue"),
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.name !== 'home') {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router;
