var ht=Object.defineProperty,yt=Object.defineProperties;var pt=Object.getOwnPropertyDescriptors;var K=Object.getOwnPropertySymbols;var Ee=Object.prototype.hasOwnProperty,Oe=Object.prototype.propertyIsEnumerable;var Ce=(e,t,a)=>t in e?ht(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,h=(e,t)=>{for(var a in t||(t={}))Ee.call(t,a)&&Ce(e,a,t[a]);if(K)for(var a of K(t))Oe.call(t,a)&&Ce(e,a,t[a]);return e},D=(e,t)=>yt(e,pt(t));var Pe=(e,t)=>{var a={};for(var n in e)Ee.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(e!=null&&K)for(var n of K(e))t.indexOf(n)<0&&Oe.call(e,n)&&(a[n]=e[n]);return a};import{p as z,b as m,L as H,T as J,U as ve,x as ee,I as p,W as He,X as F,Y as bt,Z as ze,$ as xt,a0 as Ve,y as fe,q as _t,a1 as wt,a2 as ge,s as kt,a3 as St,a4 as Ct,v as We,a5 as Et,a6 as Ot,z as me,C as Pt,a7 as Vt,a8 as At,a9 as he,D as Lt,aa as Bt,ab as Tt,E as qe,ac as $t,O as Ue,ad as Xe,ae as Ft,af as ne,S as Nt,ag as Ae,ah as Y,ai as L,G as B,aj as It,ak as V,al as te,am as W,an as Dt,ao as ye,ap as ae,aq as q,ar as Mt,as as Le,at as re,au as Be,av as k,aw as Rt,ax as jt,ay as Ht,az as zt,aA as Ye,aB as Ge,aC as pe,aD as Ke,A as ie,B as Wt,aE as qt,aF as Te,aG as Ut,aH as Xt,aI as Yt,F as Gt,aJ as Kt,aK as Zt,aL as Jt}from"./index.bee2eeb4.js";class Z{constructor(t){let{x:a,y:n,width:r,height:o}=t;this.x=a,this.y=n,this.width=r,this.height=o}get top(){return this.y}get bottom(){return this.y+this.height}get left(){return this.x}get right(){return this.x+this.width}}function Ze(e){const t=e.getBoundingClientRect(),a=getComputedStyle(e),n=a.transform;if(n){let r,o,i,l,c;if(n.startsWith("matrix3d("))r=n.slice(9,-1).split(/, /),o=+r[0],i=+r[5],l=+r[12],c=+r[13];else if(n.startsWith("matrix("))r=n.slice(7,-1).split(/, /),o=+r[0],i=+r[3],l=+r[4],c=+r[5];else return new Z(t);const s=a.transformOrigin,d=t.x-l-(1-o)*parseFloat(s),v=t.y-c-(1-i)*parseFloat(s.slice(s.indexOf(" ")+1)),f=o?t.width/o:e.offsetWidth,g=i?t.height/i:e.offsetHeight;return new Z({x:d,y:v,width:f,height:g})}else return new Z(t)}function Je(e){if(typeof e.getRootNode!="function"){for(;e.parentNode;)e=e.parentNode;return e!==document?null:document}const t=e.getRootNode();return t!==document&&t.getRootNode({composed:!0})!==document?null:t}const le="cubic-bezier(0.4, 0, 0.2, 1)",Qt="cubic-bezier(0.0, 0, 0.2, 1)",ea="cubic-bezier(0.4, 0, 1, 1)";function Qe(e){for(;e;){if(be(e))return e;e=e.parentElement}return document.scrollingElement}function se(e){const t=[];for(;e;)be(e)&&t.push(e),e=e.parentElement;return t}function be(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const t=window.getComputedStyle(e);return t.overflowY==="scroll"||t.overflowY==="auto"&&e.scrollHeight>e.clientHeight}function ta(e){for(;e;){if(window.getComputedStyle(e).position==="fixed")return!0;e=e.offsetParent}return!1}const aa=z({name:"VDialogTransition",props:{target:Object},setup(e,t){let{slots:a}=t;const n={onBeforeEnter(r){r.style.pointerEvents="none"},async onEnter(r,o){var i;await new Promise(g=>requestAnimationFrame(g));const{x:l,y:c,sx:s,sy:d,speed:v}=Fe(e.target,r),f=r.animate([{transform:`translate(${l}px, ${c}px) scale(${s}, ${d})`,opacity:0},{transform:""}],{duration:225*v,easing:Qt});(i=$e(r))==null||i.forEach(g=>{g.animate([{opacity:0},{opacity:0,offset:.33},{opacity:1}],{duration:225*2*v,easing:le})}),f.finished.then(()=>o())},onAfterEnter(r){r.style.removeProperty("pointer-events")},onBeforeLeave(r){r.style.pointerEvents="none"},async onLeave(r,o){var i;await new Promise(g=>requestAnimationFrame(g));const{x:l,y:c,sx:s,sy:d,speed:v}=Fe(e.target,r);r.animate([{transform:""},{transform:`translate(${l}px, ${c}px) scale(${s}, ${d})`,opacity:0}],{duration:125*v,easing:ea}).finished.then(()=>o()),(i=$e(r))==null||i.forEach(g=>{g.animate([{},{opacity:0,offset:.2},{opacity:0}],{duration:125*2*v,easing:le})})},onAfterLeave(r){r.style.removeProperty("pointer-events")}};return()=>e.target?m(J,H({name:"dialog-transition"},n,{css:!1}),a):m(J,{name:"dialog-transition"},a)}});function $e(e){var t;const a=(t=e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list"))==null?void 0:t.children;return a&&[...a]}function Fe(e,t){const a=e.getBoundingClientRect(),n=Ze(t),[r,o]=getComputedStyle(t).transformOrigin.split(" ").map(u=>parseFloat(u)),[i,l]=getComputedStyle(t).getPropertyValue("--v-overlay-anchor-origin").split(" ");let c=a.left+a.width/2;i==="left"||l==="left"?c-=a.width/2:(i==="right"||l==="right")&&(c+=a.width/2);let s=a.top+a.height/2;i==="top"||l==="top"?s-=a.height/2:(i==="bottom"||l==="bottom")&&(s+=a.height/2);const d=a.width/n.width,v=a.height/n.height,f=Math.max(1,d,v),g=d/f,_=v/f,b=n.width*n.height/(window.innerWidth*window.innerHeight),y=b>.12?Math.min(1.5,(b-.12)*10+1):1;return{x:c-(r+n.left),y:s-(o+n.top),sx:g,sy:_,speed:y}}const xe=["sm","md","lg","xl","xxl"],et=(()=>xe.reduce((e,t)=>(e[t]={type:[Boolean,String,Number],default:!1},e),{}))(),tt=(()=>xe.reduce((e,t)=>(e["offset"+ve(t)]={type:[String,Number],default:null},e),{}))(),at=(()=>xe.reduce((e,t)=>(e["order"+ve(t)]={type:[String,Number],default:null},e),{}))(),Ne={col:Object.keys(et),offset:Object.keys(tt),order:Object.keys(at)};function na(e,t,a){let n=e;if(!(a==null||a===!1))return t&&(n+=`-${t.replace(e,"")}`),e==="col"&&(n="v-"+n),e==="col"&&(a===""||a===!0)||(n+=`-${a}`),n.toLowerCase()}const za=z({name:"VCol",props:h(D(h(D(h(D(h({cols:{type:[Boolean,String,Number],default:!1}},et),{offset:{type:[String,Number],default:null}}),tt),{order:{type:[String,Number],default:null}}),at),{alignSelf:{type:String,default:null,validator:e=>["auto","start","end","center","baseline","stretch"].includes(e)}}),ee()),setup(e,t){let{slots:a}=t;const n=p(()=>{const r=[];let o;for(o in Ne)Ne[o].forEach(l=>{const c=e[l],s=na(o,l,c);s&&r.push(s)});const i=r.some(l=>l.startsWith("v-col-"));return r.push({"v-col":!i||!e.cols,[`v-col-${e.cols}`]:e.cols,[`offset-${e.offset}`]:e.offset,[`order-${e.order}`]:e.order,[`align-self-${e.alignSelf}`]:e.alignSelf}),r});return()=>{var r;return He(e.tag,{class:n.value},(r=a.default)==null?void 0:r.call(a))}}}),ra=["sm","md","lg","xl","xxl"],_e=["start","end","center"];function we(e,t){return ra.reduce((a,n)=>(a[e+ve(n)]=t(),a),{})}const nt=e=>[..._e,"baseline","stretch"].includes(e),rt=we("align",()=>({type:String,default:null,validator:nt})),ot=e=>[..._e,"space-between","space-around"].includes(e),it=we("justify",()=>({type:String,default:null,validator:ot})),lt=e=>[..._e,"space-between","space-around","stretch"].includes(e),st=we("alignContent",()=>({type:String,default:null,validator:lt})),Ie={align:Object.keys(rt),justify:Object.keys(it),alignContent:Object.keys(st)},oa={align:"align",justify:"justify",alignContent:"align-content"};function ia(e,t,a){let n=oa[e];if(a!=null)return t&&(n+=`-${t.replace(e,"")}`),n+=`-${a}`,n.toLowerCase()}const Wa=z({name:"VRow",props:h(h(D(h(D(h({dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:nt}},rt),{justify:{type:String,default:null,validator:ot}}),it),{alignContent:{type:String,default:null,validator:lt}}),st),ee()),setup(e,t){let{slots:a}=t;const n=p(()=>{const r=[];let o;for(o in Ie)Ie[o].forEach(i=>{const l=e[i],c=ia(o,i,l);c&&r.push(c)});return r.push({"v-row--no-gutters":e.noGutters,"v-row--dense":e.dense,[`align-${e.align}`]:e.align,[`justify-${e.justify}`]:e.justify,[`align-content-${e.alignContent}`]:e.alignContent}),r});return()=>{var r;return He(e.tag,{class:["v-row",n.value]},(r=a.default)==null?void 0:r.call(a))}}}),qa=F("flex-grow-1","div","VSpacer");const la=z({name:"VCardActions",setup(e,t){let{slots:a}=t;return bt({VBtn:{variant:"text"}}),ze(()=>{var n;return m("div",{class:"v-card-actions"},[a==null||(n=a.default)==null?void 0:n.call(a)])}),{}}}),De=F("v-card-avatar"),sa=F("v-card-content"),ca=F("v-card-header"),ua=F("v-card-header-text"),da=F("v-card-img"),va=F("v-card-subtitle"),fa=F("v-card-text"),ga=F("v-card-title"),Ua=z({name:"VCard",directives:{Ripple:xt},props:h(h(h(h(h(h(h(h(h(h(h({appendAvatar:String,appendIcon:Ve,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:Boolean,prependAvatar:String,prependIcon:Ve,ripple:Boolean,subtitle:String,text:String,title:String},fe()),_t()),wt()),ge()),kt()),St()),Ct()),We()),Et()),ee()),Ot({variant:"elevated"})),setup(e,t){let{attrs:a,slots:n}=t;const{themeClasses:r}=me(e),{borderClasses:o}=Pt(e),{colorClasses:i,colorStyles:l,variantClasses:c}=Vt(e),{densityClasses:s}=At(e),{dimensionStyles:d}=he(e),{elevationClasses:v}=Lt(e),{locationStyles:f}=Bt(e),{positionClasses:g}=Tt(e),{roundedClasses:_}=qe(e),b=$t(e,a);return()=>{var y,u,E,S;const w=b.isLink.value?"a":e.tag,C=!!(n.title||e.title),O=!!(n.subtitle||e.subtitle),P=C||O,M=!!(n.append||e.appendAvatar||e.appendIcon),$=!!(n.prepend||e.prependAvatar||e.prependIcon),T=!!(n.image||e.image),N=P||$||M,j=!!(n.text||e.text),A=!e.disabled&&(b.isClickable.value||e.link);return Ue(m(w,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":A},r.value,o.value,i.value,s.value,v.value,g.value,_.value,c.value],style:[l.value,d.value,f.value],href:b.href.value,onClick:A&&b.navigate},{default:()=>[Ft(A,"v-card"),T&&m(ne,{defaults:{VImg:{cover:!0,src:e.image}}},{default:()=>[m(da,null,{default:()=>[n.image?(y=n.image)==null?void 0:y.call(n):m(Nt,{alt:""},null)]})]}),(u=n.media)==null?void 0:u.call(n),N&&m(ca,null,{default:()=>[$&&m(ne,{defaults:{VAvatar:{density:e.density,icon:e.prependIcon,image:e.prependAvatar}}},{default:()=>[m(De,null,{default:()=>[n.prepend?n.prepend():m(Ae,null,null)]})]}),P&&m(ua,null,{default:()=>[C&&m(ga,null,{default:()=>[n.title?n.title():e.title]}),O&&m(va,null,{default:()=>[n.subtitle?n.subtitle():e.subtitle]}),(E=n.headerText)==null?void 0:E.call(n)]}),M&&m(ne,{defaults:{VAvatar:{density:e.density,icon:e.appendIcon,image:e.appendAvatar}}},{default:()=>[m(De,null,{default:()=>[n.append?n.append():m(Ae,null,null)]})]})]}),j&&m(fa,null,{default:()=>[n.text?n.text():e.text]}),n.content&&m(sa,null,{default:n.content}),(S=n.default)==null?void 0:S.call(n),n.actions&&m(la,null,{default:n.actions})]}),[[Xe("ripple"),A]])}}});const ma=Y({closeDelay:[Number,String],openDelay:[Number,String]},"delay");function ha(e,t){const a={},n=r=>()=>{if(!L)return Promise.resolve(!0);const o=r==="openDelay";return a.closeDelay&&window.clearTimeout(a.closeDelay),delete a.closeDelay,a.openDelay&&window.clearTimeout(a.openDelay),delete a.openDelay,new Promise(i=>{var l;const c=parseInt((l=e[r])!=null?l:0,10);a[r]=window.setTimeout(()=>{t==null||t(o),i(o)},c)})};return{runCloseDelay:n("closeDelay"),runOpenDelay:n("openDelay")}}const ya=Symbol.for("vuetify:v-menu"),pa=Y(h({activator:[String,Object],activatorProps:{type:Object,default:()=>({})},openOnClick:{type:Boolean,default:void 0},openOnHover:Boolean,openOnFocus:{type:Boolean,default:void 0},closeOnContentClick:Boolean},ma()));function ba(e,t){let{isActive:a,isTop:n}=t;const r=B();let o=!1,i=!1;const l=p(()=>e.openOnFocus||e.openOnFocus==null&&e.openOnHover),c=p(()=>e.openOnClick||e.openOnClick==null&&!e.openOnHover&&!l.value),{runOpenDelay:s,runCloseDelay:d}=ha(e,u=>{u===(e.openOnHover&&o||l.value&&i)&&!(e.openOnHover&&a.value&&!n.value)&&(a.value=u)}),v={click:u=>{u.stopPropagation(),r.value=u.currentTarget||u.target,a.value=!a.value},mouseenter:u=>{o=!0,r.value=u.currentTarget||u.target,s()},mouseleave:u=>{o=!1,d()},focus:u=>{Mt&&!u.target.matches(":focus-visible")||(i=!0,u.stopPropagation(),r.value=u.currentTarget||u.target,s())},blur:u=>{i=!1,u.stopPropagation(),d()}},f=p(()=>{const u={};return c.value&&(u.click=v.click),e.openOnHover&&(u.mouseenter=v.mouseenter,u.mouseleave=v.mouseleave),l.value&&(u.focus=v.focus,u.blur=v.blur),u}),g=p(()=>{const u={};if(e.openOnHover&&(u.mouseenter=()=>{o=!0,s()},u.mouseleave=()=>{o=!1,d()}),e.closeOnContentClick){const E=It(ya,null);u.click=()=>{a.value=!1,E==null||E.closeParents()}}return u});V(n,u=>{u&&e.openOnHover&&!o&&(a.value=!1)});const _=B();te(()=>{!_.value||W(()=>{const u=_.value;r.value=Dt(u)?u.$el:u})});const b=ye("useActivator");let y;return V(()=>!!e.activator,u=>{u&&L?(y=ae(),y.run(()=>{xa(e,b,{activatorEl:r,activatorEvents:f})})):y&&y.stop()},{flush:"post",immediate:!0}),{activatorEl:r,activatorRef:_,activatorEvents:f,contentEvents:g}}function xa(e,t,a){let{activatorEl:n,activatorEvents:r}=a;V(()=>e.activator,(c,s)=>{if(s&&c!==s){const d=l(s);d&&i(d)}c&&W(()=>o())},{immediate:!0}),V(()=>e.activatorProps,()=>{o()}),q(()=>{i()});function o(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:l(),s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;!c||(Object.entries(r.value).forEach(d=>{let[v,f]=d;c.addEventListener(v,f)}),Object.keys(s).forEach(d=>{s[d]==null?c.removeAttribute(d):c.setAttribute(d,s[d])}))}function i(){let c=arguments.length>0&&arguments[0]!==void 0?arguments[0]:l(),s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;!c||(Object.entries(r.value).forEach(d=>{let[v,f]=d;c.removeEventListener(v,f)}),Object.keys(s).forEach(d=>{c.removeAttribute(d)}))}function l(){var c;let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:e.activator,d;if(s)if(s==="parent"){var v,f;let g=t==null||(v=t.proxy)==null||(f=v.$el)==null?void 0:f.parentNode;for(;g.hasAttribute("data-no-activator");)g=g.parentNode;d=g}else typeof s=="string"?d=document.querySelector(s):"$el"in s?d=s.$el:d=s;return n.value=((c=d)==null?void 0:c.nodeType)===Node.ELEMENT_NODE?d:null,n.value}}function oe(e,t){return{x:e.x+t.x,y:e.y+t.y}}function _a(e,t){return{x:e.x-t.x,y:e.y-t.y}}function Me(e,t){if(e.side==="top"||e.side==="bottom"){const{side:a,align:n}=e,r=n==="start"?0:n==="center"?t.width/2:n==="end"?t.width:n,o=a==="top"?0:a==="bottom"?t.height:a;return oe({x:r,y:o},t)}else if(e.side==="start"||e.side==="end"){const{side:a,align:n}=e,r=a==="start"?0:a==="end"?t.width:a,o=n==="top"?0:n==="center"?t.height/2:n==="bottom"?t.height:n;return oe({x:r,y:o},t)}return oe({x:t.width/2,y:t.height/2},t)}const ct={static:Sa,connected:Ca},wa=Y({locationStrategy:{type:[String,Function],default:"static",validator:e=>typeof e=="function"||e in ct},location:{type:String,default:"bottom"},origin:{type:String,default:"auto"},offset:[Number,String]});function ka(e,t){const a=B({}),n=B();let r;te(async()=>{var i;(i=r)==null||i.stop(),n.value=void 0,L&&t.isActive.value&&e.locationStrategy&&(r=ae(),await W(),r.run(()=>{if(typeof e.locationStrategy=="function"){var l;n.value=(l=e.locationStrategy(t,e,a))==null?void 0:l.updateLocation}else{var c;n.value=(c=ct[e.locationStrategy](t,e,a))==null?void 0:c.updateLocation}}))}),L&&window.addEventListener("resize",o,{passive:!0}),q(()=>{var i;L&&window.removeEventListener("resize",o),n.value=void 0,(i=r)==null||i.stop()});function o(i){var l;(l=n.value)==null||l.call(n,i)}return{contentStyles:a,updateLocation:n}}function Sa(){}function Ca(e,t,a){const n=ta(e.activatorEl.value);n&&Object.assign(a.value,{position:"fixed"});const r=p(()=>Le(t.location)),o=p(()=>t.origin==="overlap"?r.value:t.origin==="auto"?re(r.value):Le(t.origin)),i=p(()=>r.value.side===o.value.side),l=p(()=>{const v=parseFloat(t.maxHeight);return isNaN(v)?1/0:v}),c=p(()=>{const v=parseFloat(t.minWidth);return isNaN(v)?1/0:v});let s=!1;if(L){const v=new ResizeObserver(()=>{s&&d()});v.observe(e.activatorEl.value),v.observe(e.contentEl.value),q(()=>{v.disconnect()})}function d(){var v;s=!1,requestAnimationFrame(()=>{requestAnimationFrame(()=>s=!0)});const f=e.activatorEl.value.getBoundingClientRect();t.offset&&(f.x-=+t.offset,f.y-=+t.offset,f.width+=+t.offset*2,f.height+=+t.offset*2);const g=Qe(e.contentEl.value),_=g.clientWidth,b=Math.min(g.clientHeight,window.innerHeight);let y;{const ke=new Map;e.contentEl.value.querySelectorAll("*").forEach(U=>{const G=U.scrollLeft,Se=U.scrollTop;(G||Se)&&ke.set(U,[G,Se])});const gt=e.contentEl.value.style.maxWidth,mt=e.contentEl.value.style.maxHeight;e.contentEl.value.style.removeProperty("max-width"),e.contentEl.value.style.removeProperty("max-height"),y=Ze(e.contentEl.value),y.x-=parseFloat(e.contentEl.value.style.left)||0,y.y-=parseFloat(e.contentEl.value.style.top)||0,e.contentEl.value.style.maxWidth=gt,e.contentEl.value.style.maxHeight=mt,ke.forEach((U,G)=>{G.scrollTo(...U)})}const u=Math.min(l.value,y.height),E=t.maxWidth===void 0?Number.MAX_VALUE:parseInt((v=t.maxWidth)!=null?v:0,10),S=12,w={top:f.top-S,bottom:b-f.bottom-S,left:Math.min(f.left-S,E),right:Math.min(_-f.right-S,E)},C=r.value.side==="bottom"&&u<=w.bottom||r.value.side==="top"&&u<=w.top,O=C?r.value:r.value.side==="bottom"&&w.top>w.bottom||r.value.side==="top"&&w.bottom>w.top?re(r.value):r.value,P=C?o.value:re(O),$=i.value||["center","top","bottom"].includes(O.side)?Math.min(_,Math.max(f.width,_-S*2)):O.side==="end"?w.right:O.side==="start"?w.left:null,T=Math.min(c.value,$,f.width),N=C?l.value:Math.min(l.value,Math.floor(O.side==="top"?w.top:w.bottom)),j=Me(O,f),A=Me(P,new Z(D(h({},y),{height:Math.min(u,N)}))),{x,y:I}=_a(j,A);Object.assign(a.value,{"--v-overlay-anchor-origin":Be(O,e.activatorEl.value),top:k(Math.round(I)),left:k(Math.round(x)),transformOrigin:Be(P,e.activatorEl.value),minWidth:k(T),maxWidth:k($),maxHeight:k(N)})}return V(()=>[r.value,o.value,t.offset],()=>d(),{immediate:!n}),n&&W(()=>d()),requestAnimationFrame(()=>{a.value.maxHeight&&d()}),{updateLocation:d}}let ce=!0;const Q=[];function Ea(e){!ce||Q.length?(Q.push(e),ue()):(ce=!1,e(),ue())}let Re=-1;function ue(){cancelAnimationFrame(Re),Re=requestAnimationFrame(()=>{const e=Q.shift();e&&e(),Q.length?ue():ce=!0})}const de={none:null,close:Va,block:Aa,reposition:La},Oa=Y({scrollStrategy:{type:[String,Function],default:"block",validator:e=>typeof e=="function"||e in de}});function Pa(e,t){if(!L)return;let a;te(async()=>{var n;(n=a)==null||n.stop(),t.isActive.value&&e.scrollStrategy&&(a=ae(),await W(),a.run(()=>{if(typeof e.scrollStrategy=="function")e.scrollStrategy(t);else{var r;(r=de[e.scrollStrategy])==null||r.call(de,t)}}))})}function Va(e){var t;function a(n){e.isActive.value=!1}ut((t=e.activatorEl.value)!=null?t:e.contentEl.value,a)}function Aa(e){var t;const a=[...new Set([...se(e.activatorEl.value),...se(e.contentEl.value)])].filter(o=>!o.classList.contains("v-overlay-scroll-blocked")),n=window.innerWidth-document.documentElement.offsetWidth,r=(o=>be(o)&&o)(((t=e.root.value)==null?void 0:t.offsetParent)||document.documentElement);r&&e.root.value.classList.add("v-overlay--scroll-blocked"),a.forEach((o,i)=>{o.style.setProperty("--v-body-scroll-x",k(-o.scrollLeft)),o.style.setProperty("--v-body-scroll-y",k(-o.scrollTop)),o.style.setProperty("--v-scrollbar-offset",k(n)),o.classList.add("v-overlay-scroll-blocked")}),q(()=>{a.forEach((o,i)=>{const l=parseFloat(o.style.getPropertyValue("--v-body-scroll-x")),c=parseFloat(o.style.getPropertyValue("--v-body-scroll-y"));o.style.removeProperty("--v-body-scroll-x"),o.style.removeProperty("--v-body-scroll-y"),o.style.removeProperty("--v-scrollbar-offset"),o.classList.remove("v-overlay-scroll-blocked"),o.scrollLeft=-l,o.scrollTop=-c}),r&&e.root.value.classList.remove("v-overlay--scroll-blocked")})}function La(e){var t;let a=!1,n=-1;function r(o){Ea(()=>{var i,l;const c=performance.now();(i=(l=e.updateLocation).value)==null||i.call(l,o),a=(performance.now()-c)/(1e3/60)>2})}ut((t=e.activatorEl.value)!=null?t:e.contentEl.value,o=>{a?(cancelAnimationFrame(n),n=requestAnimationFrame(()=>{n=requestAnimationFrame(()=>{r(o)})})):r(o)})}function ut(e,t){const a=[document,...se(e)];a.forEach(n=>{n.addEventListener("scroll",t,{passive:!0})}),q(()=>{a.forEach(n=>{n.removeEventListener("scroll",t)})})}function dt(e,t){let a;V(e,n=>{if(n&&!a)a=ae(),a.run(t);else{var r;(r=a)==null||r.stop(),a=void 0}},{immediate:!0})}function X(e){return{teleportTarget:p(()=>{const a=e.value;if(a===!0||!L)return;const n=a===!1?document.body:typeof a=="string"?document.querySelector(a):a;if(n==null){Rt(`Unable to locate target ${a}`);return}if(!X.cache.has(n)){const r=document.createElement("div");r.className="v-overlay-container",n.appendChild(r),X.cache.set(n,r)}return X.cache.get(n)})}}X.cache=new WeakMap;const Ba=Y({eager:Boolean},"lazy");function Ta(e,t){const a=B(!1),n=p(()=>a.value||e.eager||t.value);V(t,()=>a.value=!0);function r(){e.eager||(a.value=!1)}return{isBooted:a,hasContent:n,onAfterLeave:r}}const R=Ht([]);function $a(e,t){const a=ye("useStack"),n=B(+t.value);dt(e,()=>{var o;const i=(o=R[R.length-1])==null?void 0:o[1];n.value=i?i+10:+t.value,R.push([a,n.value]),q(()=>{const l=R.findIndex(c=>c[0]===a);R.splice(l,1)})});const r=B(!0);return te(()=>{var o;const i=zt((o=R[R.length-1])==null?void 0:o[0])===a;setTimeout(()=>r.value=i)}),{isTop:jt(r),stackStyles:p(()=>({zIndex:n.value}))}}function Fa(){return!0}function vt(e,t,a){if(!e||ft(e,a)===!1)return!1;const n=Je(t);if(typeof ShadowRoot!="undefined"&&n instanceof ShadowRoot&&n.host===e.target)return!1;const r=(typeof a.value=="object"&&a.value.include||(()=>[]))();return r.push(t),!r.some(o=>o==null?void 0:o.contains(e.target))}function ft(e,t){return(typeof t.value=="object"&&t.value.closeConditional||Fa)(e)}function Na(e,t,a){const n=typeof a.value=="function"?a.value:a.value.handler;t._clickOutside.lastMousedownWasOutside&&vt(e,t,a)&&setTimeout(()=>{ft(e,a)&&n&&n(e)},0)}function je(e,t){const a=Je(e);t(document),typeof ShadowRoot!="undefined"&&a instanceof ShadowRoot&&t(a)}const Ia={mounted(e,t){const a=r=>Na(r,e,t),n=r=>{e._clickOutside.lastMousedownWasOutside=vt(r,e,t)};je(e,r=>{r.addEventListener("click",a,!0),r.addEventListener("mousedown",n,!0)}),e._clickOutside||(e._clickOutside={lastMousedownWasOutside:!0}),e._clickOutside[t.instance.$.uid]={onClick:a,onMousedown:n}},unmounted(e,t){!e._clickOutside||(je(e,a=>{var n;if(!a||!((n=e._clickOutside)!=null&&n[t.instance.$.uid]))return;const{onClick:r,onMousedown:o}=e._clickOutside[t.instance.$.uid];a.removeEventListener("click",r,!0),a.removeEventListener("mousedown",o,!0)}),delete e._clickOutside[t.instance.$.uid])}};function Da(e){const r=e,{modelValue:t,color:a}=r,n=Pe(r,["modelValue","color"]);return m(J,{name:"fade-transition",appear:!0},{default:()=>[e.modelValue&&m("div",H({class:["v-overlay__scrim",e.color.backgroundColorClasses.value],style:e.color.backgroundColorStyles.value},n),null)]})}const Ma=Ye()({name:"VOverlay",directives:{ClickOutside:Ia},inheritAttrs:!1,props:h(h(h(h(h(h(h({absolute:Boolean,attach:[Boolean,String,Object],closeOnBack:{type:Boolean,default:!0},contained:Boolean,contentClass:null,contentProps:null,disabled:Boolean,noClickAnimation:Boolean,modelValue:Boolean,persistent:Boolean,scrim:{type:[String,Boolean],default:!0},zIndex:{type:[Number,String],default:2e3}},pa()),ge()),wa()),Oa()),fe()),Ge()),Ba()),emits:{"click:outside":e=>!0,"update:modelValue":e=>!0,afterLeave:()=>!0},setup(e,t){let{slots:a,attrs:n,emit:r}=t;const o=pe(e,"modelValue"),i=p({get:()=>o.value,set:x=>{x&&e.disabled||(o.value=x)}}),{teleportTarget:l}=X(p(()=>e.attach||e.contained)),{themeClasses:c}=me(e),{rtlClasses:s}=Ke(),{hasContent:d,onAfterLeave:v}=Ta(e,i),f=ie(p(()=>typeof e.scrim=="string"?e.scrim:null)),{isTop:g,stackStyles:_}=$a(i,Wt(e,"zIndex")),{activatorEl:b,activatorRef:y,activatorEvents:u,contentEvents:E}=ba(e,{isActive:i,isTop:g}),{dimensionStyles:S}=he(e);V(()=>e.disabled,x=>{x&&(i.value=!1)});const w=B(),C=B(),{contentStyles:O,updateLocation:P}=ka(e,{contentEl:C,activatorEl:b,isActive:i});Pa(e,{root:w,contentEl:C,activatorEl:b,isActive:i,updateLocation:P});function M(x){r("click:outside",x),e.persistent?A():i.value=!1}function $(){return i.value&&g.value}L&&V(i,x=>{x?window.addEventListener("keydown",T):window.removeEventListener("keydown",T)},{immediate:!0});function T(x){x.key==="Escape"&&g.value&&(e.persistent?A():i.value=!1)}const N=qt();dt(()=>e.closeOnBack,()=>{Kt(N,x=>{g.value&&i.value?(x(!1),e.persistent?A():i.value=!1):x()})});const j=B();V(()=>i.value&&(e.absolute||e.contained)&&l.value==null,x=>{if(x){const I=Qe(w.value);I&&I!==document.scrollingElement&&(j.value=I.scrollTop)}});function A(){var x;e.noClickAnimation||(x=C.value)==null||x.animate([{transformOrigin:"center"},{transform:"scale(1.03)"},{transformOrigin:"center"}],{duration:150,easing:le})}return ze(()=>{var x,I;return m(Gt,null,[(x=a.activator)==null?void 0:x.call(a,{isActive:i.value,props:H({ref:y},Te(u.value),e.activatorProps)}),L&&m(Ut,{disabled:!l.value,to:l.value},{default:()=>[d.value&&m("div",H({class:["v-overlay",{"v-overlay--absolute":e.absolute||e.contained,"v-overlay--active":i.value,"v-overlay--contained":e.contained},c.value,s.value],style:[_.value,{top:k(j.value)}],ref:w},n),[m(Da,{color:f,modelValue:i.value&&!!e.scrim},null),m(Xt,{appear:!0,persisted:!0,transition:e.transition,target:b.value,onAfterLeave:()=>{v(),r("afterLeave")}},{default:()=>[Ue(m("div",H({ref:C,class:["v-overlay__content",e.contentClass],style:[S.value,O.value]},Te(E.value),e.contentProps),[(I=a.default)==null?void 0:I.call(a,{isActive:i})]),[[Yt,i.value],[Xe("click-outside"),{handler:M,closeConditional:$,include:()=>[b.value]}]])]})])]})])}),{animateClick:A,contentEl:C,activatorEl:b,isTop:g,updateLocation:P}}});function Ra(){const t=ye("useScopeId").vnode.scopeId;return{scopeId:t?{[t]:""}:void 0}}const Xa=Ye()({name:"VDialog",inheritAttrs:!1,props:h(h({fullscreen:Boolean,origin:{type:String,default:"center center"},retainFocus:{type:Boolean,default:!0},scrollable:Boolean,modelValue:Boolean},ge({width:"auto"})),Ge({transition:{component:aa}})),emits:{"update:modelValue":e=>!0},setup(e,t){let{attrs:a,slots:n}=t;const r=pe(e,"modelValue"),{dimensionStyles:o}=he(e),{scopeId:i}=Ra(),l=B();function c(s){var d,v;const f=s.relatedTarget,g=s.target;if(f!==g&&(d=l.value)!=null&&d.contentEl&&(v=l.value)!=null&&v.isTop&&![document,l.value.contentEl].includes(g)&&!l.value.contentEl.contains(g)){const _=[...l.value.contentEl.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(u=>!u.hasAttribute("disabled"));if(!_.length)return;const b=_[0],y=_[_.length-1];f===b?y.focus():b.focus()}}return L&&V(()=>r.value&&e.retainFocus,s=>{s?document.addEventListener("focusin",c):document.removeEventListener("focusin",c)},{immediate:!0}),V(r,async s=>{if(await W(),s){var d;(d=l.value.contentEl)==null||d.focus({preventScroll:!0})}else{var v;(v=l.value.activatorEl)==null||v.focus({preventScroll:!0})}}),()=>m(Ma,H({modelValue:r.value,"onUpdate:modelValue":s=>r.value=s,class:["v-dialog",{"v-dialog--fullscreen":e.fullscreen,"v-dialog--scrollable":e.scrollable}],style:o.value,transition:e.transition,ref:l,"aria-role":"dialog","aria-modal":"true",activatorProps:{"aria-haspopup":"dialog","aria-expanded":String(r.value)},"z-index":2400},i,a),{default:n.default,activator:n.activator})}});const Ya=z({name:"VProgressLinear",props:h(h(h({active:{type:Boolean,default:!0},bgColor:String,bgOpacity:[Number,String],bufferValue:{type:[Number,String],default:0},clickable:Boolean,color:String,height:{type:[Number,String],default:4},indeterminate:Boolean,max:{type:[Number,String],default:100},modelValue:{type:[Number,String],default:0},reverse:Boolean,stream:Boolean,striped:Boolean,roundedBar:Boolean},We()),ee()),fe()),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a}=t;const n=pe(e,"modelValue"),{isRtl:r}=Ke(),{themeClasses:o}=me(e),{textColorClasses:i,textColorStyles:l}=Zt(e,"color"),{backgroundColorClasses:c,backgroundColorStyles:s}=ie(p(()=>e.bgColor||e.color)),{backgroundColorClasses:d,backgroundColorStyles:v}=ie(e,"color"),{roundedClasses:f}=qe(e),{intersectionRef:g,isIntersecting:_}=Jt(),b=p(()=>parseInt(e.max,10)),y=p(()=>parseInt(e.height,10)),u=p(()=>parseFloat(e.bufferValue)/b.value*100),E=p(()=>parseFloat(n.value)/b.value*100),S=p(()=>r.value!==e.reverse),w=p(()=>e.indeterminate?"fade-transition":"slide-x-transition"),C=p(()=>e.bgOpacity==null?e.bgOpacity:parseFloat(e.bgOpacity));function O(P){if(!g.value)return;const{left:M,right:$,width:T}=g.value.getBoundingClientRect(),N=S.value?T-P.clientX+($-T):P.clientX-M;n.value=Math.round(N/T*b.value)}return()=>m(e.tag,{ref:g,class:["v-progress-linear",{"v-progress-linear--active":e.active&&_.value,"v-progress-linear--reverse":S.value,"v-progress-linear--rounded":e.rounded,"v-progress-linear--rounded-bar":e.roundedBar,"v-progress-linear--striped":e.striped},f.value,o.value],style:{height:e.active?k(y.value):0,"--v-progress-linear-height":k(y.value)},role:"progressbar","aria-valuemin":"0","aria-valuemax":e.max,"aria-valuenow":e.indeterminate?void 0:E.value,onClick:e.clickable&&O},{default:()=>[e.stream&&m("div",{class:["v-progress-linear__stream",i.value],style:D(h({},l.value),{[S.value?"left":"right"]:k(-y.value),borderTop:`${k(y.value/2)} dotted`,opacity:C.value,top:`calc(50% - ${k(y.value/4)})`,width:k(100-u.value,"%"),"--v-progress-linear-stream-to":k(y.value*(S.value?1:-1))})},null),m("div",{class:["v-progress-linear__background",c.value],style:[s.value,{opacity:C.value,width:k(e.stream?u.value:100,"%")}]},null),m(J,{name:w.value},{default:()=>[e.indeterminate?m("div",{class:"v-progress-linear__indeterminate"},[["long","short"].map(P=>m("div",{key:P,class:["v-progress-linear__indeterminate",P,d.value],style:v.value},null))]):m("div",{class:["v-progress-linear__determinate",d.value],style:[v.value,{width:k(E.value,"%")}]},null)]}),a.default&&m("div",{class:"v-progress-linear__content"},[a.default({value:E.value,buffer:u.value})])]})}});export{qa as V,Ua as a,Xa as b,fa as c,za as d,Wa as e,Ya as f,ga as g,la as h,Ba as m,Ze as n,le as s,Ta as u};
