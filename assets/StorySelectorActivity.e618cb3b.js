import{d as y,g as l,Y as f,_ as S,c as m,w as r,o as a,s as i,u as V,F as u,b as o,e as _,v as C,O as $}from"./index.abfb314c.js";import{u as k}from"./StoryReaderStore.62d1f282.js";import{u as I}from"./StoryTableStore.20eb9f7c.js";import{V as v,a as w}from"./VRow.1c7812c4.js";import{e as x}from"./router.2bd6cf50.js";import{l as B,V as L}from"./VCard.a6c9d27f.js";/* empty css              */import"./tag.cb29de3f.js";import"./useRender.f718f098.js";const T=y({name:"StorySelectorActivity",props:["type"],setup(e){const s=k(),n=l(()=>s.language),{getStoryByType:c}=I();return{storyList:l(()=>c(e.type)),language:n,getImageSrc:t=>`${f}/images/storyEntryPic/activity/${t}.webp`}}});function b(e,s,n,c,p,d){return a(),m(v,null,{default:r(()=>[(a(!0),i(u,null,V(e.storyList,(t,g)=>(a(),i(u,{key:g},[e.language in t.name?(a(),m(w,{key:0,cols:"12",sm:"6",md:"4",lg:"3",lx:"2",xxl:"1"},{default:r(()=>[o(L,{to:{name:"select-story",query:{storySetId:t.id}}},{default:r(()=>[o(x,{src:e.getImageSrc(t.entryPic)},null,8,["src"]),o(B,null,{default:r(()=>[_(C(t.name[e.language]),1)]),_:2},1024)]),_:2},1032,["to"])]),_:2},1024)):$("",!0)],64))),128))]),_:1})}const O=S(T,[["render",b]]);export{O as default};
