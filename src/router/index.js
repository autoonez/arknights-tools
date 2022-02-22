import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
const StoryReader = () => import("../views/StoryReader/StoryReader.vue");
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/story-reader",
    name: "Story Reader",
    component: StoryReader,
    props: (route) => ({
      storyType: route.query.storyType,
      storyId: route.query.storyId,
      storyIndex: route.query.storyIndex,
      server: route.query.server,
    }),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
