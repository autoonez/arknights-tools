<template>
  <v-card>
    <v-card-title></v-card-title>

    <v-progress-linear indeterminate v-if="isLoading"></v-progress-linear>

    <v-window v-model="stage">
      <v-window-item :value="1">
        <v-card-text>
          <v-text-field
            label="Google Sheets Url"
            hide-details="auto"
            v-model="inputGoogleSheetUrl"
          ></v-text-field>
          <p v-if="errorMessage">{{ errorMessage }}</p>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <v-card-text>
          <v-checkbox
            v-for="(sheet, index) in spreadsheet?.sheets"
            :key="index"
            v-model="selectedSheets"
            :label="sheet.properties.title"
            :value="sheet.properties.title"
            hide-details="auto"
          ></v-checkbox>
        </v-card-text>
      </v-window-item>
    </v-window>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-if="stage === 2" @click="selectAllSheets">select all</v-btn>
      <v-btn @click="goNext">next</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { AxiosError } from "axios";
import { defineComponent, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { HTTP } from "../../services/http-service";
import { useStoryReaderStore } from "../../stores/StoryReaderStore";

const spreadsheetRegEx =
  /.*\/docs.google.com\/spreadsheets\/d\/(?<spreadsheetId>.*)\/.*/g;

export default defineComponent({
  name: "Google Sheets",
  setup() {
    const stage = ref(1);
    const isLoading = ref(false);
    const errors: Ref<any[]> = ref([]);
    const errorMessage = ref("");

    const inputGoogleSheetUrl = ref("");
    const selectedSheets: Ref<string[]> = ref([]);

    const router = useRouter();
    const { setSpreadsheet } = useStoryReaderStore();

    const spreadsheet: Ref<GoogleSpreadsheet | undefined> = ref();

    const goNext = async () => {
      if (stage.value === 1) {
        if (inputGoogleSheetUrl.value.match(spreadsheetRegEx)) {
          const regExResult = spreadsheetRegEx.exec(inputGoogleSheetUrl.value);

          isLoading.value = true;
          errorMessage.value = "";

          HTTP.get(
            `https://sheets.googleapis.com/v4/spreadsheets/${regExResult?.groups?.spreadsheetId}`,
            {
              params: {
                key: "AIzaSyDu129ufi2q02ZHJhoLYsO_0ew6nh9kQAQ",
              },
            }
          )
            .then((response) => {
              spreadsheet.value = response.data;
              isLoading.value = false;
              stage.value = 2;
            })
            .catch((error) => {
              isLoading.value = false;
              if (error instanceof AxiosError) {
              } else {
                errors.value.push(error);
              }
            });
        } else {
          errorMessage.value = "Invalid Google Sheets url";
        }
      } else if (stage.value === 2) {
        if (selectedSheets.value.length > 0) {
          if (spreadsheet.value) {
            setSpreadsheet({
              id: spreadsheet.value.spreadsheetId,
              url: spreadsheet.value.spreadsheetUrl,
              title: spreadsheet.value.properties.title,
              sheets: selectedSheets.value,
              currentSheet: 0,
            });
            router.push({
              name: "render-story",
              query: {
                type: "spreadsheet",
              },
            });
          }
        }
      }
    };

    const selectAllSheets = () => {
      if (spreadsheet.value) {
        selectedSheets.value = spreadsheet.value.sheets.map(
          (sheet) => sheet.properties.title
        );
      }
    };

    return {
      stage,
      isLoading,
      inputGoogleSheetUrl,
      selectedSheets,
      spreadsheet,
      errorMessage,
      goNext,
      selectAllSheets,
    };
  },
});
</script>
