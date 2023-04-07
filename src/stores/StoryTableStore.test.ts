import { createPinia, setActivePinia } from "pinia";
import { describe, expect, test } from "vitest";
import { StoryTypeEnum } from "../constants";
import { useStoryTableStore } from "./StoryTableStore";

describe("StoryTableStore.ts", () => {
  setActivePinia(createPinia());
  const store = useStoryTableStore();

  test("getStoryTable", async () => {
    await store.getStoryTable();
    expect(store.storyTable).toBeTruthy();
  });

  test("getStoryByType", () => {
    for (const type of Object.values(StoryTypeEnum)) {
      expect(store.getStoryByType(type)).toBeTruthy();
    }
  });

  test("getStoryList", async () => {
    await store.getStoryList();
    expect(store.storyList.length).toBeGreaterThan(0);
  });

  test("getMainStoryByChapter", () => {
    expect(store.getMainStoryByChapter()).toBeTruthy()
  })

  test('getStorySetByCharacterId', () => {
    expect(store.getStorySetByCharacterId()).toBeTruthy()
  })

  test('getCharacterStorySet', () => {
    expect(store.getCharacterStorySet("char_009_12fce")?.length).toBeGreaterThan(0)
  })
});
