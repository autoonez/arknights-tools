import{u as ie}from"./VBtn.885e87c3.js";import{q as ee,B as ue,A as te,r as z,aj as pe,ak as ce,l as E,g as me,y as j,z as ae,ai as U,n as G,a8 as fe,al as ge,am as V,an as X,ao as Y,ap as q,aq as W,ar as se,ah as Z}from"./index.039e7fc9.js";const M=Symbol.for("vuetify:layout"),re=Symbol.for("vuetify:layout-item"),J=1e3,xe=ee({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},"layout"),Ee=ee({name:{type:String},order:{type:[Number,String],default:0},absolute:Boolean},"layout-item");function Te(){const p=j(M);if(!p)throw new Error("[Vuetify] Could not find injected layout");return{getLayoutItem:p.getLayoutItem,mainRect:p.mainRect,mainStyles:p.mainStyles}}function be(p){var u;const t=j(M);if(!t)throw new Error("[Vuetify] Could not find injected layout");const n=(u=p.id)!=null?u:`layout-item-${ue()}`,e=te("useLayoutItem");ae(re,{id:n});const m=z(!1);pe(()=>m.value=!0),ce(()=>m.value=!1);const{layoutItemStyles:s,layoutItemScrimStyles:i}=t.register(e,{...p,active:E(()=>m.value?!1:p.active.value),id:n});return me(()=>t.unregister(n)),{layoutItemStyles:s,layoutRect:t.layoutRect,layoutItemScrimStyles:i}}const he=(p,t,n,e)=>{let m={top:0,left:0,right:0,bottom:0};const s=[{id:"",layer:{...m}}];for(const i of p){const u=t.get(i),o=n.get(i),f=e.get(i);if(!u||!o||!f)continue;const r={...m,[u.value]:parseInt(m[u.value],10)+(f.value?parseInt(o.value,10):0)};s.push({id:i,layer:r}),m=r}return s};function Ae(p){const t=j(M,null),n=E(()=>t?t.rootZIndex.value-100:J),e=z([]),m=U(new Map),s=U(new Map),i=U(new Map),u=U(new Map),o=U(new Map),{resizeRef:f,contentRect:r}=ie(),d=E(()=>{var h;const g=new Map,x=(h=p.overlaps)!=null?h:[];for(const T of x.filter(I=>I.includes(":"))){const[I,b]=T.split(":");if(!e.value.includes(I)||!e.value.includes(b))continue;const A=m.get(I),S=m.get(b),k=s.get(I),$=s.get(b);!A||!S||!k||!$||(g.set(b,{position:A.value,amount:parseInt(k.value,10)}),g.set(I,{position:S.value,amount:-parseInt($.value,10)}))}return g}),v=E(()=>{const g=[...new Set([...i.values()].map(h=>h.value))].sort((h,T)=>h-T),x=[];for(const h of g){const T=e.value.filter(I=>{var b;return((b=i.get(I))==null?void 0:b.value)===h});x.push(...T)}return he(x,m,s,u)}),C=E(()=>!Array.from(o.values()).some(g=>g.value)),l=E(()=>v.value[v.value.length-1].layer),c=E(()=>({"--v-layout-left":G(l.value.left),"--v-layout-right":G(l.value.right),"--v-layout-top":G(l.value.top),"--v-layout-bottom":G(l.value.bottom),...C.value?void 0:{transition:"none"}})),L=E(()=>v.value.slice(1).map((g,x)=>{let{id:h}=g;const{layer:T}=v.value[x],I=s.get(h),b=m.get(h);return{id:h,...T,size:Number(I.value),position:b.value}})),D=g=>L.value.find(x=>x.id===g),R=te("createLayout"),N=z(!1);fe(()=>{N.value=!0}),ae(M,{register:(g,x)=>{let{id:h,order:T,position:I,layoutSize:b,elementSize:A,active:S,disableTransitions:k,absolute:$}=x;i.set(h,T),m.set(h,I),s.set(h,b),u.set(h,S),k&&o.set(h,k);const K=ge(re,R==null?void 0:R.vnode).indexOf(g);K>-1?e.value.splice(K,0,h):e.value.push(h);const _=E(()=>L.value.findIndex(w=>w.id===h)),P=E(()=>n.value+v.value.length*2-_.value*2),ne=E(()=>{const w=I.value==="left"||I.value==="right",B=I.value==="right",le=I.value==="bottom",F={[I.value]:0,zIndex:P.value,transform:`translate${w?"X":"Y"}(${(S.value?0:-110)*(B||le?-1:1)}%)`,position:$.value||n.value!==J?"absolute":"fixed",...C.value?void 0:{transition:"none"}};if(!N.value)return F;const O=L.value[_.value];if(!O)throw new Error(`[Vuetify] Could not find layout item "${h}"`);const H=d.value.get(h);return H&&(O[H.position]+=H.amount),{...F,height:w?`calc(100% - ${O.top}px - ${O.bottom}px)`:A.value?`${A.value}px`:void 0,left:B?void 0:`${O.left}px`,right:B?`${O.right}px`:void 0,top:I.value!=="bottom"?`${O.top}px`:void 0,bottom:I.value!=="top"?`${O.bottom}px`:void 0,width:w?A.value?`${A.value}px`:void 0:`calc(100% - ${O.left}px - ${O.right}px)`}}),oe=E(()=>({zIndex:P.value-1}));return{layoutItemStyles:ne,layoutItemScrimStyles:oe,zIndex:P}},unregister:g=>{i.delete(g),m.delete(g),s.delete(g),u.delete(g),o.delete(g),e.value=e.value.filter(x=>x!==g)},mainRect:l,mainStyles:c,getLayoutItem:D,items:L,layoutRect:r,rootZIndex:n});const a=E(()=>["v-layout",{"v-layout--full-height":p.fullHeight}]),y=E(()=>({zIndex:n.value,position:t?"relative":void 0,overflow:t?"hidden":void 0}));return{layoutClasses:a,layoutStyles:y,getLayoutItem:D,items:L,layoutRect:r,layoutRef:f}}const de=p=>{var m,s,i;let t={lines:[],tagCount:{},otherLines:[]},n=p.split(`
`),e=u=>{u in t.tagCount||(t.tagCount[u]=0),t.tagCount[u]+=1};for(const u of n)if(u.match(V)){let o=V.exec(u);if(o!=null&&o.groups){let{tag:f,params:r,other:d}=o.groups;f=f.toUpperCase();let v={},C;for(;(C=X.exec(r))!==null;)if(C.groups){const{name:l,value:c}=C.groups;v[l]=c.replace(/"/g,"")}d&&(v.other=d),t.lines.push({tag:f,params:v}),e(f)}}else if(u.match(Y)){let o=Y.exec(u);if(o!=null&&o.groups){let{name:f,params:r,text:d}=o.groups,v={},C;if(r)for(;(C=X.exec((m=o==null?void 0:o.groups)==null?void 0:m.params))!==null;){let l=(s=C.groups)==null?void 0:s.name,c=((i=C.groups)==null?void 0:i.value)||"";l&&(v[l]=c.replace(/"/g,""))}t.lines.push({tag:"DIALOG",params:{...v,name:f,text:d}}),e("DIALOG")}}else if(u.match(q)){let o=q.exec(u);if(o!=null&&o.groups){let{tag:f,value:r}=o.groups;f=f.toUpperCase(),t.lines.push({tag:f,params:{[f]:r}}),e(f)}}else if(u.match(W)){let o=W.exec(u);if(o!=null&&o.groups){let{tag:f}=o.groups;f=f.toUpperCase(),t.lines.push({tag:f,params:{}}),e(f)}}else if(u.length>0&&u.indexOf("//")!==0&&u!=="\r"){let o="DESCRIPTION";t.lines.push({tag:o,params:{text:u}}),e(o)}else t.otherLines.push(u);return t},Q=/\[OPTION (?<value>.*)\]/g,Se=p=>{var n;let t={lines:[],tagCount:{},otherLines:[]};try{const e=p.find(m=>m[0]==="[LAYOUT]");if(e){const m=e.indexOf("[NAME]"),s=e.indexOf("[TEXT]");if(m&&s){for(let i=0;i<p.length;i++){const u=p[i];let o=u[0]||"";o=o.replace(/[\[\]]/g,"");const f=u[m],r=u[s];if(se.includes(o))t.lines.push({tag:o,params:{name:f,text:r}}),o in t.tagCount?t.tagCount[o]=t.tagCount[o]+1:t.tagCount[o]=1;else if(o==="DECISION"){let d=[],v=[];for(let C=i+1;C<p.length;C++){const l=p[C];if(l[0]==="[END_DECISION]"){t.lines.push({tag:"DECISION",params:{options:d.join(";"),values:v.join(";")}}),"DECISION"in t.tagCount?t.tagCount.DECISION=t.tagCount.DECISION+1:t.tagCount.DECISION=1,i=C;break}if(l[0].match(Q)){const c=Q.exec(l[0]);if(c){const L=(n=c.groups)==null?void 0:n.value;v.push(L),d.push(l[s])}}}}}return{result:t}}else return{error:"[NAME] or [TEXT] not found"}}else return{error:"[LAYOUT] not found"}}catch(e){return{error:e.message}}},Oe=({original:p,target:t})=>{let n=[],e={},m={};for(const s of t)s.tag in e||(e[s.tag]=[],m[s.tag]=0),e[s.tag].push(s);for(const s of p)if(s.tag in e)if(m[s.tag]<e[s.tag].length&&Object.keys(s.params).length>0){const i=e[s.tag][m[s.tag]],u=s;s.params.name&&i.params.name&&(u.params.name=i.params.name),s.params.text&&i.params.text&&(u.params.text=i.params.text),s.params.options&&i.params.options&&(u.params.options=i.params.options),n.push(u),m[s.tag]+=1}else n.push(s);else n.push(s);return n},Le=p=>{let t="1",n="1",e="";return p.split("#").length>1?([e,t]=p.split("#"),[t,n]=t.split("$")):p.split("$").length>1?[e,n]=p.split("$"):e=p.split("#")[0],{name:e,num:t,group:n||"1"}},Re=async p=>{var u,o;let t=[],n=[],e,m,s="",i={};for(let f=0;f<p.length;f++){let r=p[f];switch(r.tag){case"DESCRIPTION":{e?e.tag==="DESCRIPTION"?e.params.text.push(r.params.text):(n.push(e),e={tag:"DESCRIPTION",params:{text:[r.params.text]}}):e={tag:"DESCRIPTION",params:{text:[r.params.text]}};break}case"SUBTITLE":{r.params.text&&(e?e.tag==="SUBTITLE"?e.params.text.push(r.params.text):(n.push(e),e={tag:"SUBTITLE",params:{text:[r.params.text]}}):e={tag:"SUBTITLE",params:{text:[r.params.text]}});break}case"DIALOG":{if(!r.params.text)break;let d={...r.params,text:[r.params.text],image:s};e?e.tag==="DIALOG"&&((o=(u=e.params)==null?void 0:u.name)==null?void 0:o.localeCompare(r.params.name,void 0,{sensitivity:"base"}))===0?e.params.text.push(r.params.text):(n.push(e),e={tag:"DIALOG",params:d}):e={tag:"DIALOG",params:d};break}case"MULTILINE":{let d={tag:"DIALOG",params:{...r.params,text:[r.params.other],image:s}};e&&n.push(e),e=d;break}case"DECISION":{e&&n.push(e);let d=r.params.options.split(";"),v=r.params.values.split(";"),C=!1;if(m){for(let l of v)if(m.options.includes(l)){C=!0;break}}C&&(t.push(n),n=[],e=null),(!m||C)&&(m={options:v}),e={...r,params:{options:d.map((l,c)=>({text:l,value:v[c]}))}};break}case"PREDICATE":{e&&n.push(e);let d=r.params.references.split(";");e={...r,params:{references:d}};break}case"IMAGE":{e&&n.push(e),e=r;break}case"BACKGROUND":{e&&n.push(e),e=r;break}case"CHARACTER":{if(r.params.focus)switch(parseInt(r.params.focus)){case 1:{s=r.params.name;break}case 2:{s=r.params.name2;break}default:{s="";break}}else s=r.params.name;break}case"CHARSLOT":r.params.name&&r.params.slot&&(i[r.params.slot]=r.params.name),r.params.focus&&i[r.params.focus]&&(s=i[r.params.focus])}}return e&&n[n.length-1]!==e&&n.push(e),t[t.length-1]!==n&&t.push(n),t},Ie={tags:{DIALOG:{enable:!0},MULTILINE:{enable:!0},DESCRIPTION:{enable:!0},SUBTITLE:{enable:!0},STICKER:{enable:!0},DECISION:{enable:!0},CHARACTER:{enable:!1},BACKGROUND:{enable:!0,type:"name"},IMAGE:{enable:!0,type:"name"}},extra:{layoutForStoryReader:!1,characterImageLookUpSheet:!1,characterNameSheet:!1,characterNameSheetWithImage:!1},sheet:{sheetName:"file"}},Ne=(p,t=Ie)=>{var C;const n=["DIALOG","MULTILINE","CHARACTER","CHARSLOT"],e=["IMAGE","BACKGROUND"];let m=[];for(const[l,c]of Object.entries(t.tags))c.enable&&(m.push(l),l==="DECISION"&&m.push("PREDICATE"),l==="CHARACTER"&&m.push("CHARSLOT"));let s="",i="",u={},o={},f=[],r=[],d={};const v=(l,c)=>{l in d||(d[l]=[]),c&&!d[l].includes(c)&&d[l].push(c)};for(const l of p){const c=[],L=de(l.data);t.extra.layoutForStoryReader&&(c.push(["[FILE]",l.fileName]),t.tags.CHARACTER.enable?c.push(["[LAYOUT]","","","","","[NAME]","[TEXT]"]):c.push(["[LAYOUT]","","","","[NAME]","[TEXT]"]));for(const a of L.lines)if(!(se.includes(a.tag)&&!a.params.text&&!a.params.other)&&!(a.tag==="IMAGE"&&!a.params.image)){if(a.tag==="CHARACTER"&&!a.params.name){i="";continue}if(a.tag==="CHARSLOT"&&!a.params.name){u={};continue}if(m.includes(a.tag)){let y;switch(a.tag){case"DIALOG":{y=[a.params.name,a.params.text||a.params.other],a.params.head&&(i=a.params.head),t.extra.characterNameSheet&&v(a.params.name,i);break}case"MULTILINE":{y=[a.params.name,a.params.other],t.extra.characterNameSheet&&v(a.params.name,i);break}case"DESCRIPTION":{y=["",a.params.text];break}case"SUBTITLE":{y=["",a.params.text];break}case"STICKER":{y=["",a.params.text];break}case"DECISION":{let g=a.params.options.split(";"),x=a.params.values.split(";");((C=c[c.length-1])==null?void 0:C.length)>1&&s!=="PREDICATE"&&c.push([""]);let h=["[DECISION]"],T=["[END_DECISION]"];t.tags.CHARACTER.enable&&(h.push(""),T.push("")),t.extra.layoutForStoryReader&&(h.push("[DECISION]"),T.push("[END_DECISION]")),c.push(h);for(let I=0;I<g.length;I++){let b=g[I],A=x[I],S=[`[OPTION ${A}]`,b];t.tags.CHARACTER.enable&&(S=["",...S]),t.extra.layoutForStoryReader&&(S=[`[OPTION ${A}]`,...S]),o[A]=c.length+1,c.push(S)}c.push(T);break}case"PREDICATE":{let g=a.params.references.split(";"),x=[];for(const h of g)x.push(o[h]);y=["[PREDICATE]",g.join(","),x.join(",")];break}case"IMAGE":{if(a.params.image)switch(y=["[IMAGE]"],t.tags.IMAGE.type){case"name":{y.push(a.params.image);break}case"link":{y.push(`${Z}/images/avg/imgs/${a==null?void 0:a.params.image}.webp`);break}}break}case"BACKGROUND":{let g=a.params.image||"bg_black";switch(y=["[BACKGROUND]"],t.tags.BACKGROUND.type){case"name":{y.push(g);break}case"link":{y.push(`${Z}/images/avg/imgs/${g}.webp`);break}}break}case"CHARACTER":{a.params.name?(a.params.name2&&a.params.focus==="2"?i=a.params.name2.toLowerCase():i=a.params.name.toLowerCase(),i==="char_empty"&&(i="")):i="";break}case"CHARSLOT":a.params.name&&a.params.slot&&(u[a.params.slot]=a.params.name),a.params.focus&&u[a.params.focus]&&(i=u[a.params.focus])}["CHARACTER","CHARSLOT"].includes(a.tag)&&t.extra.characterImageLookUpSheet&&!r.includes(i)&&r.push(i),c.length>0&&a.tag!==s&&a.tag!=="DECISION"&&s!=="PREDICATE"&&([...n,...e].includes(a.tag)?n.includes(a.tag)&&!n.includes(s)?c.push([""]):e.includes(a.tag)&&!e.includes(s)&&c.push([""]):c.push([""])),y&&(t.tags.CHARACTER.enable&&(["DIALOG","MULTILINE"].includes(a.tag)?y=[i,...y]:y=["",...y]),t.extra.layoutForStoryReader&&(y=[`[${a.tag}]`,...y]),c.push(y)),s=a.tag}}let D=l.fileName.split("/"),R=D[D.length-1],N=R;switch(t.sheet.sheetName){case"code":{N=l.code?l.code:R;break}case"code-name":{N=l.code&&l.name?`${l.code} ${l.name}`:R;break}}f.push({name:N,aoa:c})}return t.extra.characterImageLookUpSheet&&(f=[{name:"Characters Images Lookup",aoa:r.sort((l,c)=>l.localeCompare(c)).map(l=>[l])},...f]),t.extra.characterNameSheet&&(f=[{name:"Characters",aoa:Object.keys(d).sort((l,c)=>l.localeCompare(c)).map(l=>{let c=[l];return t.extra.characterNameSheetWithImage&&(c=[...c,...d[l]]),c})},...f]),f},De=(p,t="zh_CN")=>{let n="";return p!=null&&p.code?n=`${p.code}: ${p.name[t]||p.name.zh_CN}`:n=`${p.name[t]||p.name.zh_CN}`,n};export{xe as a,Te as b,Ae as c,Re as d,Se as e,De as f,Le as g,Ie as h,Ne as i,Ee as m,Oe as r,de as s,be as u};
