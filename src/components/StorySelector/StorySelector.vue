<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ props }">
      <v-card v-bind="props">
        <StorySelectorBreadcrumb
          :items="getBreadcrumbItems()"
          :server="server"
          :type="'preview'"
        />
      </v-card>
    </template>
    <v-card>
      <v-layout>
        <v-app-bar density="compact">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <StorySelectorBreadcrumb
            :items="getBreadcrumbItems()"
            :server="server"
            @SELECT_HOME="selectHome"
            @SELECT_TYPE="selectType"
          />
          <v-spacer></v-spacer>
          <v-icon>mdi-earth</v-icon>
          <select v-model="server">
            <option
              v-for="(server, index) in serverList"
              :key="index"
              :value="server.id"
            >
              {{ server.name }}
            </option>
          </select>
          <v-btn :disabled="!ready" text @click="select()">Select</v-btn>
        </v-app-bar>
        <v-main>
          <StorySelectorType
            v-if="stageComponent === 'TYPE'"
            @SELECT_TYPE="selectType"
          />
          <StorySelectorMain
            v-if="stageComponent === 'MAIN'"
            :storyByChapter="getMainStoryByChapter()"
            :server="server"
            @SELECT_STORY_ID="selectStoryId"
          />
          <StorySelectorActivity
            v-if="stageComponent === 'ACTIVITY'"
            :storyList="getActivityStoryList()"
            :server="server"
            @SELECT_STORY_ID="selectStoryId"
          />
          <StorySelectorCharacter
            v-if="stageComponent === 'CHARACTER'"
            :storyList="getCharacterStoryList()"
            :server="server"
            @SELECT_STORY_ID="selectStoryId"
          />
          <StorySelectorIndex
            v-if="stageComponent === 'INDEX'"
            :storyList="getStoryList()"
            :server="server"
            @SELECT_STORY_INDEX="selectStoryIndex"
          />
        </v-main>
      </v-layout>
    </v-card>
  </v-dialog>
</template>
<script>
import StorySelectorType from "./StorySelectorType.vue";
import StorySelectorBreadcrumb from "./StorySelectorBreadcrumb.vue";
import StorySelectorMain from "./StorySelectorMain.vue";
import StorySelectorActivity from "./StorySelectorActivity.vue";
import StorySelectorIndex from "./StorySelectorIndex.vue";
import StorySelectorCharacter from "./StorySelectorCharacter.vue";
import { serverList, storyType } from "../../constants/story";
export default {
  props: ["storyTable"],
  emits: ["selectFile"],
  data() {
    return {
      dialog: false,
      ready: false,
      stage: "SELECT_TYPE",
      story: {
        type: "",
        id: "",
        index: 1,
      },
      server: "en_US",
      serverList: serverList,
    };
  },
  created() {
    this.$watch(
      () => [
        this.$route.query.storyType,
        this.$route.query.storyId,
        this.$route.query.storyIndex,
        this.$route.query.server,
      ],
      () => {
        this.getUrlQuery();
      },
      { immediate: true }
    );
  },
  computed: {
    stageComponent() {
      let component = "TYPE";
      if (this.stage === "SELECT_STORY_ID" && this.story.type === "MAIN_STORY")
        component = "MAIN";
      if (
        this.stage === "SELECT_STORY_ID" &&
        ["ACTIVITY_STORY", "MINI_STORY"].includes(this.story.type)
      )
        component = "ACTIVITY";
      if (
        this.stage === "SELECT_STORY_ID" &&
        this.story.type === "CHARACTER_STORY"
      )
        component = "CHARACTER";
      if (this.stage === "SELECT_STORY_INDEX") component = "INDEX";
      return component;
    },
  },
  methods: {
    getUrlQuery() {
      let query = this.$route.query;
      let ready = false;
      let server = "en_US";
      let file;
      if (query.server && serverList.find((s) => s.id === query.server))
        this.server = query.server;
      server = query.server;
      if (query.storyType && storyType.find((t) => t.id === query.storyType)) {
        let storyType = query.storyType;
        this.story.type = storyType;
        if (
          query.storyId &&
          query.storyId in this.storyTable.story[storyType]
        ) {
          let storyId = query.storyId;
          let storySet = this.storyTable.story[storyType][storyId];
          if (server in storySet.name) {
            this.story.id = storyId;
            let storyInfo;
            if (
              query.storyIndex &&
              (storyInfo = storySet.story.find(
                (s) => s.sort === parseInt(query.storyIndex)
              ))
            ) {
              this.story.index = storyInfo.sort;
              file = storyInfo.file;
              ready = true;
            }
          }
        }
      }
      if (ready) {
        this.$emit("selectFile", {
          file,
          server: this.server,
        });
      } else {
        this.dialog = true;
      }
    },
    getMainStoryByChapter() {
      let storyByChapter = Object.entries(
        this.storyTable.story.MAIN_STORY
      ).reduce((byChapter, [storyId, story]) => {
        if (!(story.chapter in byChapter)) {
          let chapter = this.storyTable.data.chapter[story.chapter];
          byChapter[story.chapter] = {
            id: story.chapter,
            name: chapter.name,
            story: [],
          };
        }
        byChapter[story.chapter]["story"].push({ ...story, id: storyId });
        return byChapter;
      }, {});
      return Object.values(storyByChapter);
    },
    getActivityStoryList() {
      return Object.entries(this.storyTable["story"][this.story.type]).map(
        ([id, story]) => ({
          ...story,
          id,
        })
      );
    },
    getCharacterStoryList() {
      return Object.entries(this.storyTable["story"]["CHARACTER_STORY"]).map(
        ([id, story]) => {
          let character = this.storyTable["data"]["character"][story.character];
          return {
            ...story,
            id,
            character: {
              id: story.character,
              name: character.name,
            },
          };
        }
      );
    },
    getStoryList() {
      return this.storyTable["story"][this.story.type][this.story.id]["story"];
    },
    getBreadcrumbItems() {
      let type, episode, story;
      type = storyType.find((t) => t.id === this.story.type);
      if (type)
        episode = this.storyTable["story"][this.story.type][this.story.id];
      if (episode)
        story = episode.story.find((s) => s.sort === this.story.index);
      return {
        type,
        episode: episode
          ? {
              ...episode,
              id: this.story.id,
            }
          : undefined,
        story: story ? { ...story, index: this.story.index } : undefined,
      };
    },
    selectHome() {
      this.ready = false;
      this.stage = "SELECT_TYPE";
      this.story = {};
    },
    selectType(id) {
      this.ready = false;
      this.stage = "SELECT_STORY_ID";
      this.story = {
        type: id,
      };
    },
    selectStoryId(id) {
      this.ready = false;
      this.stage = "SELECT_STORY_INDEX";
      this.story = {
        type: this.story.type,
        id,
      };
    },
    selectStoryIndex(index) {
      this.story = {
        type: this.story.type,
        id: this.story.id,
        index,
      };
      this.ready = true;
    },
    select() {
      this.dialog = false;
      this.$router.push({
        path: "/story-reader",
        query: {
          storyType: this.story.type,
          storyId: this.story.id,
          storyIndex: this.story.index,
          server: this.server,
        },
      });
    },
  },
  components: {
    StorySelectorType,
    StorySelectorBreadcrumb,
    StorySelectorMain,
    StorySelectorActivity,
    StorySelectorIndex,
    StorySelectorCharacter,
  },
};
</script>
<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
select {
  padding: 8px 16px;
  color: white;
  cursor: pointer;
}
select option {
  background: #1e1e1e;
  padding: 8px 16px;
}
</style>
