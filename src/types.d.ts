interface StoryReaderStoreSelected {
  type: string;
  id: string;
  index: number;
  language: string;
}

interface StoryReaderStoreState {
  selected: StoryReaderStoreSelected;
}

interface LanguageNameDict {
  [index: string]: string;
}

interface CharacterDetail {
  appellation: string;
  displayNumber: string;
  groupId: string | null;
  id: string;
  isNotObtainable: boolean;
  name: LanguageNameDict;
  nationId: string;
  profession: string;
  rarity: number;
  subProfessionId: string;
  teamId: string | null;
}

interface StoryDetail {
  storyId: string;
  code?: string;
  file: string;
  name: LanguageNameDict;
  sort: number;
}

interface StorySetDetail {
  id: string;
  type: string;
  name: LanguageNameDict;
  story: {
    [storyId: string]: StoryDetail;
  };
}

interface MainStorySetDetail extends StorySetDetail {
  chapter: string;
}

interface ActivityStorySetDetail extends StorySetDetail {
  entryPic: string;
}

interface CharacterStorySetDetail extends StorySetDetail {
  character: string;
}

interface StoryChapterDetail {
  name: LanguageNameDict;
}

interface StoryTable {
  story: {
    [storyId: string]:
      | MainStorySetDetail
      | ActivityStorySetDetail
      | CharacterStorySetDetail;
  };
  data: {
    chapter: {
      [index: string]: StoryChapterDetail;
    };
    character: {
      [characterId: string]: CharacterDetail;
    };
  };
}

interface CharacterData {
  id: string;
  name: LanguageNameDict;
  nationId: string;
  groupId: string;
  teamId: string;
  displayNumber: string;
  rarity: number;
  profession: string;
  subProfessionId: string;
  isNotObtainable: boolean;
  appellation: string;
}

interface StoryLine {
  tag: string;
  params: {
    [key: string]: any;
  };
}

interface StoryData {
  lines: StoryLine[];
  tagCount: {
    [tag: string]: number;
  };
  otherLines: string[];
}

interface CharacterSpriteTable {
  [charId: string]: {
    [spriteSet: string]: {
      facePos: {
        x: number;
        y: number;
      };
      faceSize: {
        x: number;
        y: number;
      };
      sprites: {
        [spriteNumber: string]: {
          sprite: string;
          alias: string;
          isWholeBody: number;
        };
      };
    };
  };
}

interface GoogleSpreadsheetSheetProperties {
  sheetId: number;
  title: string;
  index: number;
}

interface GoogleSpreadsheetSheet {
  properties: GoogleSpreadsheetSheetProperties;
}

interface GoogleSpreadsheet {
  sheets: GoogleSpreadsheetSheet[];
  spreadsheetUrl: string;
  spreadsheetId: string;
  properties: {
    title: string;
  };
}

interface SpreadsheetStore {
  id: string;
  title: string;
  url: string;
  sheets: string[];
  currentSheet: number;
}

interface StoryDownloadFile {
  name?: string;
  code?: string;
  fileName: string;
  data: string;
}

interface StoryDownloadOptions {
  tags: {
    DIALOG: { enable: boolean };
    MULTILINE: { enable: boolean };
    DESCRIPTION: { enable: boolean };
    SUBTITLE: { enable: boolean };
    STICKER: { enable: boolean };
    DECISION: { enable: boolean };
    CHARACTER: { enable: boolean };
    BACKGROUND: {
      enable: boolean;
      type: "name" | "link";
    };
    IMAGE: {
      enable: boolean;
      type: "name" | "link";
    };
  };
  extra: {
    layoutForStoryReader: boolean;
    characterNameSheet: boolean;
    characterNameSheetWithImage: boolean;
    characterImageLookUpSheet: boolean;
  };
  sheet: {
    sheetName: "code-name" | "code" | "file";
  };
}
