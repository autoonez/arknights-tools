import{d as g,Y as B,_ as y,c as _,w as i,o as c,a as p,v as I,g as S,b as m,s as h,u as V,e as D,F as f,aF as O,y as $,r as v}from"./index.abfb314c.js";import{u as w}from"./CharacterStore.e8ccaff6.js";import{u as L}from"./StoryReaderStore.62d1f282.js";import{u as k}from"./StoryTableStore.20eb9f7c.js";import{V as N}from"./VCard.a6c9d27f.js";import{V as F}from"./VDialog.2bde1a24.js";import{V as T,a as z,b as R}from"./VList.df4439d1.js";import"./useRender.f718f098.js";import"./router.2bd6cf50.js";import"./tag.cb29de3f.js";import"./forwardRefs.62c1fbe2.js";import"./index.c0fe89d5.js";import"./VDivider.3f5ed1de.js";const U=g({name:"OperatorCard",props:["characterId","characterName","isSelected"],setup(e){return{imgSrc:`${B}/images/avatar/${e.characterId}.webp`}}});const q={class:"operator-card-img-wrap"},E=["src"],Y={class:"operator-card-name"};function j(e,a,n,r,o,l){return c(),_(N,{"max-width":"64px",class:"rounded-0"},{default:i(()=>[p("div",q,[p("img",{src:e.imgSrc,class:"operator-card-img"},null,8,E)]),p("p",Y,I(e.characterName),1)]),_:1})}const A=y(U,[["render",j],["__scopeId","data-v-0b92bedf"]]),G=g({name:"CharStorySetListDialog",props:["characterId"],emits:["selectStorySet"],setup(e,{emit:a}){const n=L(),r=S(()=>n.language),{getCharacterStorySet:o}=k(),l=S(()=>o(e.characterId));return{language:r,storySetList:l}}});function H(e,a,n,r,o,l){return c(),_(F,null,{default:i(()=>[m(N,null,{default:i(()=>[m(T,null,{default:i(()=>[(c(!0),h(f,null,V(e.storySetList,(s,d)=>(c(),_(z,{key:d,onClick:t=>e.$emit("selectStorySet",s.id)},{default:i(()=>[m(R,null,{default:i(()=>[D(I(s.name[e.language]||s.name.zh_CN),1)]),_:2},1024)]),_:2},1032,["onClick"]))),128))]),_:1})]),_:1})]),_:1})}const J=y(G,[["render",H]]),K=g({name:"StorySelectorCharacter",components:{OperatorCard:A,CharStorySetListDialog:J},setup(){const e=L(),a=O(),n=S(()=>e.language),r=$(!1),o=$(""),{getStorySetByCharacterId:l}=k(),{getOperators:s}=w(),d=S(()=>l()),t=s().filter(u=>d.value?u.id in d.value:!1);return{dialog:r,selectedCharacter:o,language:n,operators:t,selectCharacter:u=>{o.value=u,r.value=!0},selectStorySet:u=>{r.value=!1,a.push({name:"select-story",query:{storySetId:u}})}}}});const M={class:"character-container"};function P(e,a,n,r,o,l){const s=v("OperatorCard"),d=v("CharStorySetListDialog");return c(),h(f,null,[p("div",M,[(c(!0),h(f,null,V(e.operators,(t,C)=>(c(),_(s,{key:C,characterId:t.id,characterName:t.name[e.language]||t.appellation||t.name.zh_CN,onClick:b=>e.selectCharacter(t.id)},null,8,["characterId","characterName","onClick"]))),128))]),m(d,{modelValue:e.dialog,"onUpdate:modelValue":a[0]||(a[0]=t=>e.dialog=t),characterId:e.selectedCharacter,onSelectStorySet:e.selectStorySet},null,8,["modelValue","characterId","onSelectStorySet"])],64)}const le=y(K,[["render",P],["__scopeId","data-v-0cf76850"]]);export{le as default};
