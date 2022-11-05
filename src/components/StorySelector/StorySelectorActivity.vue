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
        <v-card @click="$emit('select', storySet.id)">
          <v-img :src="getImageSrc(storySet.entryPic)"></v-img>
          <v-card-title>{{ storySet.name[language] }}</v-card-title>
        </v-card>
      </v-col>
    </template>
  </v-row>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from "vue";
import { assetUrl, StoryTypeEnum } from "../../constants";
import { useStoryTableStore } from "../../stores/StoryTableStore";

const props = defineProps<{
  language: string;
  type: StoryTypeEnum;
}>();
const emit = defineEmits<{
  (e: "select", storySetId: string): void;
}>();

const { getStoryByType } = useStoryTableStore();
const storyList = computed(() => getStoryByType(props.type)) as ComputedRef<
  ActivityStorySetDetail[]
>;

const getImageSrc = (entryPic: string) => {
  return `${assetUrl}/images/storyEntryPic/activity/${entryPic}.webp`;
};
</script>
