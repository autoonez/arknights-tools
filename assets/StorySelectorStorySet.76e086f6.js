import{d as f,l as S,Q as p,h as g,aG as _,_ as I,c as y,w as u,o as l,a3 as c,a4 as h,U as m,a as V,b as v,a5 as C,ad as L}from"./index.df28dd6e.js";import{u as N}from"./StoryReaderStore.a088d0d1.js";import{u as T}from"./StoryTableStore.098de5f5.js";import{V as k,a as B,c as $}from"./VList.8e40183d.js";import"./index.d545f964.js";import"./router.751d0875.js";const w=f({name:"StorySelectorStorySet",props:["storySetId","storySetId"],setup(e){const i=_(),t=N(),{storyTable:r}=T(),o=S(()=>t.language),a=S(()=>t.storySet),s=n=>t.getStoryTitle(n);return p(()=>{g(()=>[e.storySetId,o.value],()=>{e.storySetId?(t.setStorySet(r==null?void 0:r.story[e.storySetId]),a.value&&!(o.value in a.value.name)&&o.value!=="zh_CN"&&t.setLanguage("zh_CN")):i.push({name:"select-story-type"})},{immediate:!0})}),{language:o,storySet:a,getStoryTitle:s}}});function z(e,i,t,r,o,a){return l(),y(k,null,{default:u(()=>{var s;return[(l(!0),c(m,null,h((s=e.storySet)==null?void 0:s.story,(n,d)=>(l(),c(m,null,[e.language in n.name?(l(),y(B,{key:0,to:{name:"render-story",query:{storyFile:n.file,storySetId:e.storySetId,type:"original"}}},{default:u(()=>[V($,null,{default:u(()=>[v(C(e.getStoryTitle(d.toString())),1)]),_:2},1024)]),_:2},1032,["to"])):L("",!0)],64))),256))]}),_:1})}const E=I(w,[["render",z]]);export{E as default};