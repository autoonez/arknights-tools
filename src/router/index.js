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
    children: [
      {
        path: "",
        component: () => import("../views/StoryReader/StoryReaderHome.vue"),
      },
      {
        path: "story",
        component: () => import("../views/StoryReader/StoryReaderMain.vue"),
        props: (route) => ({
          storyId: route.query.id,
          storyIndex: route.query.index,
          server: route.query.server,
        }),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
