<template>
  <v-dialog
    v-model="dialog"
    :scrim="false"
    transition="dialog-bottom-transition"
    fullscreen
    scrollable
    class="dialog"
  >
    <template v-slot:activator="{ props }">
      <v-app-bar density="compact" v-bind="props">
        <StorySelectorBreadcrumb
          :items="getBreadcrumbItems()"
          :server="server"
          :type="'preview'"
        />
      </v-app-bar>
    </template>
    <v-card>
      <v-toolbar density="compact" class="d-none d-sm-flex">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <StorySelectorBreadcrumb
          :items="getBreadcrumbItems()"
          :server="server"
          :stage="stage"
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
        <v-btn :disabled="!ready" variant="outlined" text @click="select()"
          >Select</v-btn
        >
      </v-toolbar>
      <v-toolbar density="compact" class="d-flex d-sm-none">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <StorySelectorBreadcrumb
          :items="getBreadcrumbItems()"
          :server="server"
          :stage="stage"
          @SELECT_HOME="selectHome"
          @SELECT_TYPE="selectType"
        />
      </v-toolbar>
      <v-toolbar density="compact" class="d-flex d-sm-none">
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
      </v-toolbar>
      <v-container class="dialog-container overflow-auto my-3">
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
      </v-container>
      <v-footer
        bottom
        fixed
        border
        height="48px"
        class="footer d-flex d-sm-none"
        width="100%"
      >
        <v-btn variant="text" @click="goBack()">
          <v-icon>mdi-chevron-left</v-icon></v-btn
        >
        <v-spacer></v-spacer>
        <v-btn :disabled="!ready" variant="outlined" text @click="select()"
          >Select</v-btn
        >
      </v-footer>
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
    goBack() {
      this.ready = false;
      if (this.stage === "SELECT_STORY_INDEX") {
        this.stage = "SELECT_STORY_ID";
      } else {
        this.stage = "SELECT_TYPE";
      }
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
.dialog-container {
  max-height: calc(100vh - 168px);
}
@media (min-width: 600px) {
  .dialog-container {
    max-height: calc(100vh - 72px);
  }
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
.footer {
  box-shadow: 0px -2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%) !important;
}
.dialog {
  z-index: 2400 !important;
}
</style>
