import{d as _,l as c,ah as C,_ as h,a3 as n,a4 as g,U as l,o as r,e as B,a5 as m,a as s,w as o,t as N,D as $,c as b,b as p,ad as k}from"./index.df28dd6e.js";import{u as w}from"./StoryReaderStore.a088d0d1.js";import{u as E}from"./StoryTableStore.098de5f5.js";import{a as I,V as D,n as M}from"./VCard.02cadcd2.js";import{t as T}from"./router.751d0875.js";import{a as v,V as R}from"./VRow.4e47e31e.js";/* empty css              */const U=_({name:"StorySelectorMain",setup(){const e=w(),i=c(()=>e.language),{getMainStoryByChapter:u}=E(),d=c(()=>u());return{language:i,storyByChapter:d,getEpisodeName:a=>`Episode ${a.split("_")[1]}`,getImageSrc:a=>`${C}/images/storyEntryPic/main/zone_page_${a}.webp`}}}),q={class:"text-h6 mb-2"};function z(e,i,u,d,f,y){return r(!0),n(l,null,g(e.storyByChapter,(a,S)=>(r(),n(l,{key:S},[e.language in a.name?(r(),n(l,{key:0},[B("p",q,m(a.name[e.language]),1),s(R,{class:"mb-4"},{default:o(()=>[(r(!0),n(l,null,g(a.story,(t,V)=>N((r(),b(v,{cols:"6",sm:"3",md:"2",key:V},{default:o(()=>[s(I,{to:{name:"select-story",query:{storySetId:t.id}}},{default:o(()=>[s(T,{src:e.getImageSrc(t.id)},null,8,["src"]),s(D,null,{default:o(()=>[p(m(e.getEpisodeName(t.id)),1)]),_:2},1024),s(M,null,{default:o(()=>[p(m(t.name[e.language]),1)]),_:2},1024)]),_:2},1032,["to"])]),_:2},1024)),[[$,e.language in t.name]])),128))]),_:2},1024)],64)):k("",!0)],64))),128)}const J=h(U,[["render",z]]);export{J as default};
