import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { storyTypeDict, StoryTypeEnum } from "../constants";

const Home = () => import("../views/Home.vue");

const StoryReader = () => import("../views/StoryReader/StoryReader.vue");
const StorySelectorType = () =>
  import("../components/StoryReader/StorySelectorType.vue");
const StorySelectorMain = () =>
  import("../components/StoryReader/StorySelectorMain.vue");
const StorySelectorActivity = () =>
  import("../components/StoryReader/StorySelectorActivity.vue");
const StorySelectorCharacter = () =>
  import("../components/StoryReader/StorySelectorCharacter.vue");
const StorySelectorStorySet = () =>
  import("../components/StoryReader/StorySelectorStorySet.vue");
const StoryRender = () => import("../components/StoryReader/StoryRender.vue");

export const routes: Array<RouteRecordRaw> = [
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
        name: "select-story-type",
        component: StorySelectorType,
      },
      {
        path: "main",
        name: storyTypeDict.MAIN_STORY.routeName,
        component: StorySelectorMain,
      },
      {
        path: "activity",
        name: storyTypeDict.ACTIVITY_STORY.routeName,
        component: StorySelectorActivity,
        props: {
          type: StoryTypeEnum.ACTIVITY_STORY,
        },
      },
      {
        path: "mini",
        name: storyTypeDict.MINI_STORY.routeName,
        component: StorySelectorActivity,
        props: {
          type: StoryTypeEnum.MINI_STORY,
        },
      },
      {
        path: "character",
        name: storyTypeDict.CHARACTER_STORY.routeName,
        component: StorySelectorCharacter,
      },
      {
        path: "list",
        name: "select-story",
        component: StorySelectorStorySet,
        props: (route) => ({
          storySetId: route.query.storySetId,
        }),
      },
      {
        path: "story",
        name: "render-story",
        component: StoryRender,
        props: (route) => ({
          storyFile: route.query.storyFile,
          storySetId: route.query.storySetId,
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
