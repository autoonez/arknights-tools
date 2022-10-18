export const assetUrl =
  process.env.NODE_ENV === "production"
    ? `/arknights-assets`
    : `http://localhost:5000/arknights-assets`;

export const storyType = [
  { id: "MAIN_STORY", routeName: "select-story-main", name: "Main Theme" },
  {
    id: "ACTIVITY_STORY",
    routeName: "select-story-activity",
    name: "Public Affairs",
  },
  {
    id: "MINI_STORY",
    routeName: "select-story-mini",
    name: "Special Operation",
  },
  {
    id: "CHARACTER_STORY",
    routeName: "select-story-character",
    name: "Operator Records",
  },
  {
    id: "GOOGLE_SHEETS",
    routeName: "google-sheets",
    name: "Google Sheets",
  },
];

export const storyTypeDict: {
  [storyType: string]: {
    id: string;
    routeName: string;
    name: string;
  };
} = {
  MAIN_STORY: {
    id: "MAIN_STORY",
    routeName: "select-story-main",
    name: "Main Theme",
  },
  ACTIVITY_STORY: {
    id: "ACTIVITY_STORY",
    routeName: "select-story-activity",
    name: "Public Affairs",
  },
  MINI_STORY: {
    id: "MINI_STORY",
    routeName: "select-story-mini",
    name: "Special Operation",
  },
  CHARACTER_STORY: {
    id: "CHARACTER_STORY",
    routeName: "select-story-character",
    name: "Operator Records",
  },
};

export const languageList = [
  { id: "zh_CN", name: "Chinese (Simplified)" },
  { id: "zh_TW", name: "Chinese (Traditional )" },
  { id: "en_US", name: "English" },
  { id: "ja_JP", name: "Japanese" },
  { id: "ko_KR", name: "Korean" },
];

export const tagRexEx = /\[(?<tag>.+?)\((?<params>.*)\)\]\s*(?<other>.*)/g;
export const otherTagRexEx = /\[(?<tag>.*)=(?<value>.*)\]/g;
export const blankTagRexEx = /\[(?<tag>.*)\]/;
export const splitParamsRegEx =
  /(?<name>\w*?)\s*=\s*(?<value>".*?"|[^",)\]\s]*)/g;
export const characterSpeechRexEx =
  /\[[Nn][Aa][Mm][Ee]="(?<name>.*)"(?<params>.*)\]\s*(?<text>.*)/g;

export enum StoryTypeEnum {
  ACTIVITY_STORY = "ACTIVITY_STORY",
  MINI_STORY = "MINI_STORY",
  MAIN_STORY = "MAIN_STORY",
  CHARACTER_STORY = "CHARACTER_STORY",
}

export const textTags = [
  "DIALOG",
  "DESCRIPTION",
  "SUBTITLE",
  "STICKER",
  "MULTILINE",
];
