import{ae as h,r as c,af as n}from"./index.03ae83bd.js";import{H as l}from"./StoryReaderStore.55ed991b.js";const T=h("StoryTableStore",()=>{const a=c(),s=c([]),i=async()=>{a.value||(a.value=await l.get("/table/story_review_table.json").then(r=>r.data))},y=r=>{var e;if(a.value)return Object.values((e=a.value)==null?void 0:e.story).filter(t=>t.type===r)};return{storyTable:a,storyList:s,getStoryTable:i,getStoryByType:y,getMainStoryByChapter:()=>{if(a.value){let r=y(n.MAIN_STORY),e={};if(r){for(const t of r)if(t.chapter){let o=a.value.data.chapter[t.chapter];t.chapter in e||(e[t.chapter]={id:t.chapter,name:o.name,story:[]}),e[t.chapter].story.push(t)}}return e}},getStorySetByCharacterId:()=>{if(a.value){let r=y(n.CHARACTER_STORY),e={};if(r){for(const t of r)t.character in e||(e[t.character]=[]),e[t.character].push(t);return e}}},getCharacterStorySet:r=>{if(a.value){let e=[];for(const t of Object.values(a.value.story)){let o=t;o.character===r&&e.push(o)}return e}},getStoryList:async()=>{s.value.length===0&&(s.value=await l.get("table/all_story.json").then(r=>r.data))}}});export{T as u};