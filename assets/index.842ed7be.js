import{r as v,o as m,c as _,w as l,V,a as i,b as w,d as $,e as k,f as A,g as L,h as f,i as b,j as I,k as d,l as x,m as E,n as u,p as N,q as O,s as R}from"./vendor.fb4d9537.js";const T=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}};T();var y=(t,r)=>{const a=t.__vccOpts||t;for(const[n,e]of r)a[n]=e;return a};const q={name:"App",data:()=>({drawer:!1})},P=d("Arknights Tools"),B=d("Home"),C=d("Story Reader");function D(t,r,a,n,e,o){const s=v("router-view");return m(),_(V,null,{default:l(()=>[i(w,{density:"compact"},{default:l(()=>[i(k,{onClick:r[0]||(r[0]=$(c=>t.drawer=!t.drawer,["stop"]))}),i(A,null,{default:l(()=>[P]),_:1})]),_:1}),i(L,{modelValue:t.drawer,"onUpdate:modelValue":r[1]||(r[1]=c=>t.drawer=c),temporary:""},{default:l(()=>[i(b,null,{default:l(()=>[i(f,{to:"/"},{default:l(()=>[B]),_:1}),i(f,{to:"/story-reader/"},{default:l(()=>[C]),_:1})]),_:1})]),_:1},8,["modelValue"]),i(I,null,{default:l(()=>[i(s)]),_:1})]),_:1})}var H=y(q,[["render",D]]);var S=x({theme:{defaultTheme:"dark"}});const F="modulepreload",p={},G="/arknights-tools/",h=function(r,a){return!a||a.length===0?r():Promise.all(a.map(n=>{if(n=`${G}${n}`,n in p)return;p[n]=!0;const e=n.endsWith(".css"),o=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${o}`))return;const s=document.createElement("link");if(s.rel=e?"stylesheet":F,e||(s.as="script",s.crossOrigin=""),s.href=n,document.head.appendChild(s),e)return new Promise((c,g)=>{s.addEventListener("load",c),s.addEventListener("error",g)})})).then(()=>r())};async function K(){(await h(()=>import("./webfontloader.f5e2b0ed.js").then(function(r){return r.w}),[])).load({google:{families:["Roboto:100,300,400,500,700,900&display=swap"]}})}const M={name:"Home"},W=u("ul",null,[u("li",null,[d(" Arknights Game Data: "),u("a",{href:"https://github.com/Kengxxiao/ArknightsGameData"},"Kengxxiao/ArknightsGameData")])],-1);function j(t,r,a,n,e,o){return m(),_(E,null,{default:l(()=>[W]),_:1})}var U=y(M,[["render",j]]);const z=()=>h(()=>import("./StoryReader.a12dadad.js"),["assets/StoryReader.a12dadad.js","assets/StoryReader.19ff2b5f.css","assets/vendor.fb4d9537.js","assets/vendor.042d5ff5.css"]),J=[{path:"/",name:"Home",component:U},{path:"/story-reader",name:"Story Reader",component:z,props:t=>({storyType:t.query.storyType,storyId:t.query.storyId,storyIndex:t.query.storyIndex,server:t.query.server})}],Q=N({history:O(),routes:J});K();R(H).use(Q).use(S).mount("#app");export{y as _};
