<template>
  <v-row>
    <template v-for="(storySet, i) in storyList" :key="i">
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        lx="2"
        xxl="1"
        v-if="language in storySet.name"
      >
        <v-card
          :to="{
            name: 'select-story',
            query: { storySetId: storySet.id },
          }"
        >
          <v-img :src="getImageSrc(storySet.entryPic)"></v-img>
          <v-card-title>{{ storySet.name[language] }}</v-card-title>
        </v-card>
      </v-col>
    </template>
  </v-row>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from "vue";
import { assetUrl } from "../../constants";
import { useStoryReaderStore } from "../../stores/StoryReaderStore";
import { useStoryTableStore } from "../../stores/StoryTableStore";

export default defineComponent({
  name: "StorySelectorActivity",
  props: ["type"],
  setup(props) {
    const store = useStoryReaderStore();
    const language = computed(() => store.language);

    const { getStoryByType } = useStoryTableStore();
    const storyList = computed(() => getStoryByType(props.type)) as ComputedRef<
      ActivityStorySetDetail[]
    >;
    const getImageSrc = (entryPic: string) => {
      return `${assetUrl}/images/storyEntryPic/activity/${entryPic}.png`;
    };

    return {
      storyList,
      language,
      getImageSrc,
    };
  },
});
</script>
