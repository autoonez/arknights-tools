<template>
  <v-dialog>
    <v-card>
      <v-card-text>
        <input type="file" accept=".txt" multiple @change="onInputFileChange" />
      </v-card-text>
      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="(file, index) in files"
          :key="index"
          :title="file.fileName"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="files.length === 0" @click="saveFiles">save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";

export default defineComponent({
  name: "StoryFilesUploadDialog",
  emits: ["saveFiles"],
  setup(props, { emit }) {
    const files: Ref<StoryDownloadFile[]> = ref([]);
    const onInputFileChange = async (event: Event) => {
      const target = <HTMLInputElement>event.target;
      if (target.files) {
        let result: any[] = [];

        for (let i = 0; i < target.files.length; i++) {
          const file = target.files[i];
          if (file) {
            const data = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = (e: ProgressEvent<FileReader>) => {
                resolve(e.target?.result);
              };
              reader.readAsText(file);
            });
            result.push({
              fileName: file.name.split(".")[0],
              data,
            });
          }
        }

        files.value = result;
      }
    };
    const saveFiles = () => {
      if (files.value.length > 0) {
        emit("saveFiles", files.value);
      }
    };
    return {
      files,
      onInputFileChange,
      saveFiles,
    };
  },
});
</script>
