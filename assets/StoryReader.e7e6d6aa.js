import{u as Me}from"./StoryTableStore.df7801a2.js";import{u as Ie}from"./CharacterStore.6fb21276.js";import{R as De,C as Ne,u as He}from"./CharImageDialog.f64f1642.js";import{d as Z,h as y,l as O,_ as j,c as M,w as _,o as T,f as u,i as W,r as le,b as re,t as se,F as A,u as ie,j as p,s as Ae,k as ue,p as Pe,m as ce,n as P,q as de,v as ve,x as I,y as Ye,e as z,z as me,I as Oe,A as G,B as H,C as ge,D as We,E as ze,G as Xe,H as Fe,T as Ue,J as F,K as qe,L as Y}from"./index.af01303f.js";import{u as fe}from"./StoryReaderStore.6789030f.js";import{V as Ze}from"./VDialog.e858caa7.js";import{V as he,a as ye,b as je}from"./VList.f95ed554.js";import{V as Ge,t as Je,a as Ke}from"./VCard.01af00f6.js";import{m as be,a as pe,b as we,u as U,c as Se,d as Ve,e as Te,V as Qe,f as et,g as _e,h as tt}from"./router.da5ed236.js";import{m as ke,u as $e,a as at}from"./layout.561985f9.js";import{m as X}from"./tag.49f72dba.js";import{u as Be,V as ot}from"./ssrBoot.0b365c63.js";import{u as N}from"./useRender.d6870f84.js";import{V as nt}from"./index.74147b0e.js";import{V as Ce}from"./VBtn.6f709d3f.js";import{V as lt}from"./VApp.1356e92f.js";import{V as rt}from"./VContainer.490a7826.js";import"./VRow.f23ef9f5.js";/* empty css              */import"./forwardRefs.54bd1271.js";import"./resizeObserver.d901d395.js";const st=Z({name:"LanguageSelectorDialog",props:{options:{type:Array,default:()=>[]}},emits:["selectLanguage"],setup(e){return{languageOptions:y(()=>O.filter(n=>{var t;return(t=e.options)==null?void 0:t.includes(n.id)}))}}});function it(e,a,n,t,r,o){return T(),M(Ze,null,{default:_(()=>[u(Ge,null,{default:_(()=>[u(he,null,{default:_(()=>[(T(!0),W(A,null,le(e.languageOptions,s=>(T(),M(ye,{key:s.id,onClick:i=>e.$emit("selectLanguage",s.id)},{default:_(()=>[re(se(s.name),1)]),_:2},1032,["onClick"]))),128))]),_:1})]),_:1})]),_:1})}const ut=j(st,[["render",it]]),ct=Z({namme:"StoryReaderAppBar",setup(){const e=ie(),a=fe(),n=p(!1),t=p(!1),r=y(()=>a.storySet),o=y(()=>a.story),s=y(()=>{let d=[];return e.name==="render-story"?o&&(d=O.filter(c=>{var l;return o.value?c.id in((l=o.value)==null?void 0:l.name):!1}).map(c=>c.id)):e.name==="select-story"?r&&(d=O.filter(c=>{var l;return r.value?c.id in((l=r.value)==null?void 0:l.name):!1}).map(c=>c.id)):d=O.map(c=>c.id),d});return{drawer:n,selectLanguageDialog:t,availableLanguages:s,selectLanguage:d=>{a.setLanguage(d),t.value=!1},storyType:Ae}},components:{LanguageSelectorDialog:ut}});const dt=ue()({name:"VToolbarTitle",props:{text:String,...X()},setup(e,a){let{slots:n}=a;return N(()=>{var t;const r=!!(n.default||n.text||e.text);return u(e.tag,{class:"v-toolbar-title"},{default:()=>[r&&u("div",{class:"v-toolbar-title__placeholder"},[n.text?n.text():e.text,(t=n.default)==null?void 0:t.call(n)])]})}),{}}}),vt=[null,"prominent","default","comfortable","compact"],xe=Pe({absolute:Boolean,collapse:Boolean,color:String,density:{type:String,default:"default",validator:e=>vt.includes(e)},extended:Boolean,extensionHeight:{type:[Number,String],default:48},flat:Boolean,floating:Boolean,height:{type:[Number,String],default:64},image:String,title:String,...be(),...pe(),...we(),...X({tag:"header"}),...ce()},"v-toolbar"),q=ue()({name:"VToolbar",props:xe(),setup(e,a){var n;let{slots:t}=a;const{backgroundColorClasses:r,backgroundColorStyles:o}=U(P(e,"color")),{borderClasses:s}=Se(e),{elevationClasses:i}=Ve(e),{roundedClasses:d}=Te(e),{themeClasses:c}=de(e),l=p(!!(e.extended||(n=t.extension)!=null&&n.call(t))),f=y(()=>parseInt(Number(e.height)+(e.density==="prominent"?Number(e.height):0)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0),10)),g=y(()=>l.value?parseInt(Number(e.extensionHeight)+(e.density==="prominent"?Number(e.extensionHeight):0)-(e.density==="comfortable"?4:0)-(e.density==="compact"?8:0),10):0);return ve({VBtn:{variant:"text"}}),N(()=>{var m,k,x,B,L;const R=!!(e.title||t.title),w=!!(t.image||e.image),E=(m=t.extension)==null?void 0:m.call(t);return l.value=!!(e.extended||E),u(e.tag,{class:["v-toolbar",{"v-toolbar--absolute":e.absolute,"v-toolbar--collapse":e.collapse,"v-toolbar--flat":e.flat,"v-toolbar--floating":e.floating,[`v-toolbar--density-${e.density}`]:!0},r.value,s.value,i.value,d.value,c.value],style:[o.value]},{default:()=>[w&&u("div",{key:"image",class:"v-toolbar__image"},[u(Qe,{defaults:{VImg:{cover:!0,src:e.image}}},{default:()=>[t.image?(k=t.image)==null?void 0:k.call(t):u(et,null,null)]})]),u("div",{class:"v-toolbar__content",style:{height:I(f.value)}},[t.prepend&&u("div",{class:"v-toolbar__prepend"},[(x=t.prepend)==null?void 0:x.call(t)]),R&&u(dt,{key:"title",text:e.title},{text:t.title}),(B=t.default)==null?void 0:B.call(t),t.append&&u("div",{class:"v-toolbar__append"},[(L=t.append)==null?void 0:L.call(t)])]),u(nt,null,{default:()=>[l.value&&u("div",{class:"v-toolbar__extension",style:{height:I(g.value)}},[E])]})]})}),{contentHeight:f,extensionHeight:g}}});function mt(e){var a;return Ye(e,Object.keys((a=q==null?void 0:q.props)!=null?a:{}))}const gt=z({name:"VAppBar",props:{modelValue:{type:Boolean,default:!0},location:{type:String,default:"top",validator:e=>["top","bottom"].includes(e)},...xe(),...ke(),height:{type:[Number,String],default:64}},emits:{"update:modelValue":e=>!0},setup(e,a){let{slots:n}=a;const t=p(),r=_e(e,"modelValue"),o=y(()=>{var f,g;var i,d;const c=(f=(i=t.value)==null?void 0:i.contentHeight)!=null?f:0,l=(g=(d=t.value)==null?void 0:d.extensionHeight)!=null?g:0;return c+l}),{layoutItemStyles:s}=$e({id:e.name,order:y(()=>parseInt(e.order,10)),position:P(e,"location"),layoutSize:o,elementSize:o,active:r,absolute:P(e,"absolute")});return N(()=>{const[i]=mt(e);return u(q,me({ref:t,class:["v-app-bar",{"v-app-bar--bottom":e.location==="bottom"}],style:{...s.value,height:void 0}},i),n)}),{}}}),ft=z({name:"VAppBarNavIcon",props:{icon:{type:Oe,default:"$menu"}},setup(e,a){let{slots:n}=a;return N(()=>u(Ce,{class:"v-app-bar-nav-icon",icon:e.icon},n)),{}}});function ht(e){let{rootEl:a,isSticky:n,layoutItemStyles:t}=e;const r=p(!1),o=p(0),s=y(()=>{const c=typeof r.value=="boolean"?"top":r.value;return[n.value?{top:"auto",bottom:"auto",height:void 0}:void 0,r.value?{[c]:I(o.value)}:{top:t.value.top}]});G(()=>{H(n,c=>{c?window.addEventListener("scroll",d,{passive:!0}):window.removeEventListener("scroll",d)},{immediate:!0})}),ge(()=>{document.removeEventListener("scroll",d)});let i=0;function d(){var k;const c=i>window.scrollY?"up":"down",l=a.value.getBoundingClientRect(),f=parseFloat((k=t.value.top)!=null?k:0),g=window.scrollY-Math.max(0,o.value-f),m=l.height+Math.max(o.value,f)-window.scrollY-window.innerHeight;l.height<window.innerHeight-f?(r.value="top",o.value=f):c==="up"&&r.value==="bottom"||c==="down"&&r.value==="top"?(o.value=window.scrollY+l.top,r.value=!0):c==="down"&&m<=0?(o.value=0,r.value="bottom"):c==="up"&&g<=0&&(o.value=l.top+g,r.value="top"),i=window.scrollY}return{isStuck:r,stickyStyles:s}}const yt=100,bt=20;function oe(e){const a=1.41421356237;return(e<0?-1:1)*Math.sqrt(Math.abs(e))*a}function ne(e){if(e.length<2)return 0;if(e.length===2)return e[1].t===e[0].t?0:(e[1].d-e[0].d)/(e[1].t-e[0].t);let a=0;for(let n=e.length-1;n>0;n--){if(e[n].t===e[n-1].t)continue;const t=oe(a),r=(e[n].d-e[n-1].d)/(e[n].t-e[n-1].t);a+=(r-t)*Math.abs(r),n===e.length-1&&(a*=.5)}return oe(a)*1e3}function pt(){const e={};function a(r){Array.from(r.changedTouches).forEach(o=>{var i;((i=e[o.identifier])!=null?i:e[o.identifier]=new We(bt)).push([r.timeStamp,o])})}function n(r){Array.from(r.changedTouches).forEach(o=>{delete e[o.identifier]})}function t(r){var o;const s=(o=e[r])==null?void 0:o.values().reverse();if(!s)throw new Error(`No samples for touch id ${r}`);const i=s[0],d=[],c=[];for(const l of s){if(i[0]-l[0]>yt)break;d.push({t:l[0],d:l[1].clientX}),c.push({t:l[0],d:l[1].clientY})}return{x:ne(d),y:ne(c),get direction(){const{x:l,y:f}=this,[g,m]=[Math.abs(l),Math.abs(f)];return g>m&&l>=0?"right":g>m&&l<=0?"left":m>g&&f>=0?"down":m>g&&f<=0?"up":wt()}}}return{addMovement:a,endTouch:n,getVelocity:t}}function wt(){throw new Error}function St(e){let{isActive:a,isTemporary:n,width:t,touchless:r,position:o}=e;G(()=>{window.addEventListener("touchstart",L,{passive:!0}),window.addEventListener("touchmove",R,{passive:!1}),window.addEventListener("touchend",w,{passive:!0})}),ge(()=>{window.removeEventListener("touchstart",L),window.removeEventListener("touchmove",R),window.removeEventListener("touchend",w)});const s=y(()=>o.value!=="bottom"),{addMovement:i,endTouch:d,getVelocity:c}=pt();let l=!1;const f=p(!1),g=p(0),m=p(0);let k;function x(v,h){return(o.value==="left"?v:o.value==="right"?document.documentElement.clientWidth-v:o.value==="bottom"?document.documentElement.clientHeight-v:D())-(h?t.value:0)}function B(v){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;const b=o.value==="left"?(v-m.value)/t.value:o.value==="right"?(document.documentElement.clientWidth-v-m.value)/t.value:o.value==="bottom"?(document.documentElement.clientHeight-v-m.value)/t.value:D();return h?Math.max(0,Math.min(1,b)):b}function L(v){if(r.value)return;const h=v.changedTouches[0].clientX,b=v.changedTouches[0].clientY,S=25,C=o.value==="left"?h<S:o.value==="right"?h>document.documentElement.clientWidth-S:o.value==="bottom"?b>document.documentElement.clientHeight-S:D(),V=a.value&&(o.value==="left"?h<t.value:o.value==="right"?h>document.documentElement.clientWidth-t.value:o.value==="bottom"?b>document.documentElement.clientHeight-t.value:D());(C||V||a.value&&n.value)&&(l=!0,k=[h,b],m.value=x(s.value?h:b,a.value),g.value=B(s.value?h:b),d(v),i(v))}function R(v){const h=v.changedTouches[0].clientX,b=v.changedTouches[0].clientY;if(l){if(!v.cancelable){l=!1;return}const C=Math.abs(h-k[0]),V=Math.abs(b-k[1]);(s.value?C>V&&C>3:V>C&&V>3)?(f.value=!0,l=!1):(s.value?V:C)>3&&(l=!1)}if(!f.value)return;v.preventDefault(),i(v);const S=B(s.value?h:b,!1);g.value=Math.max(0,Math.min(1,S)),S>1?m.value=x(s.value?h:b,!0):S<0&&(m.value=x(s.value?h:b,!1))}function w(v){if(l=!1,!f.value)return;i(v),f.value=!1;const h=c(v.changedTouches[0].identifier),b=Math.abs(h.x),S=Math.abs(h.y);(s.value?b>S&&b>400:S>b&&S>3)?a.value=h.direction===({left:"right",right:"left",bottom:"up"}[o.value]||D()):a.value=g.value>.5}const E=y(()=>f.value?{transform:o.value==="left"?`translateX(calc(-100% + ${g.value*t.value}px))`:o.value==="right"?`translateX(calc(100% - ${g.value*t.value}px))`:o.value==="bottom"?`translateY(calc(100% - ${g.value*t.value}px))`:D(),transition:"none"}:void 0);return{isDragging:f,dragProgress:g,dragStyles:E}}function D(){throw new Error}const Vt=["start","end","left","right","bottom"],Tt=z({name:"VNavigationDrawer",props:{color:String,disableResizeWatcher:Boolean,disableRouteWatcher:Boolean,expandOnHover:Boolean,floating:Boolean,modelValue:{type:Boolean,default:null},permanent:Boolean,rail:Boolean,railWidth:{type:[Number,String],default:56},scrim:{type:[String,Boolean],default:!0},image:String,temporary:Boolean,touchless:Boolean,width:{type:[Number,String],default:256},location:{type:String,default:"start",validator:e=>Vt.includes(e)},sticky:Boolean,...be(),...pe(),...ke(),...we(),...X({tag:"nav"}),...ce()},emits:{"update:modelValue":e=>!0},setup(e,a){let{attrs:n,slots:t}=a;const{isRtl:r}=ze(),{themeClasses:o}=de(e),{borderClasses:s}=Se(e),{backgroundColorClasses:i,backgroundColorStyles:d}=U(P(e,"color")),{elevationClasses:c}=Ve(e),{mobile:l}=Xe(),{roundedClasses:f}=Te(e),g=tt(),m=_e(e,"modelValue",null,$=>!!$),{ssrBootStyles:k}=Be(),x=p(),B=p(!1),L=y(()=>e.rail&&e.expandOnHover&&B.value?Number(e.width):Number(e.rail?e.railWidth:e.width)),R=y(()=>Je(e.location,r.value)),w=y(()=>!e.permanent&&(l.value||e.temporary)),E=y(()=>e.sticky&&!w.value&&R.value!=="bottom");e.disableResizeWatcher||H(w,$=>!e.permanent&&(m.value=!$)),!e.disableRouteWatcher&&g&&H(g.currentRoute,()=>w.value&&(m.value=!1)),H(()=>e.permanent,$=>{$&&(m.value=!0)}),Fe(()=>{e.modelValue!=null||w.value||(m.value=e.permanent||!l.value)});const{isDragging:v,dragProgress:h,dragStyles:b}=St({isActive:m,isTemporary:w,width:L,touchless:P(e,"touchless"),position:R}),S=y(()=>{const $=w.value?0:e.rail&&e.expandOnHover?Number(e.railWidth):L.value;return v.value?$*h.value:$}),{layoutItemStyles:C,layoutRect:V,layoutItemScrimStyles:J}=$e({id:e.name,order:y(()=>parseInt(e.order,10)),position:R,layoutSize:S,elementSize:L,active:y(()=>m.value||v.value),disableTransitions:y(()=>v.value),absolute:y(()=>e.absolute||E.value&&typeof K.value!="string")}),{isStuck:K,stickyStyles:Le}=ht({rootEl:x,isSticky:E,layoutItemStyles:C}),Q=U(y(()=>typeof e.scrim=="string"?e.scrim:null)),Re=y(()=>({...v.value?{opacity:h.value*.2,transition:"none"}:void 0,...V.value?{left:I(V.value.left),right:I(V.value.right),top:I(V.value.top),bottom:I(V.value.bottom)}:void 0,...J.value}));return ve({VList:{bgColor:"transparent"}}),N(()=>{var $,ee,te,ae;const Ee=t.image||e.image;return u(A,null,[u(e.tag,me({ref:x,onMouseenter:()=>B.value=!0,onMouseleave:()=>B.value=!1,class:["v-navigation-drawer",`v-navigation-drawer--${R.value}`,{"v-navigation-drawer--expand-on-hover":e.expandOnHover,"v-navigation-drawer--floating":e.floating,"v-navigation-drawer--is-hovering":B.value,"v-navigation-drawer--rail":e.rail,"v-navigation-drawer--temporary":w.value,"v-navigation-drawer--active":m.value,"v-navigation-drawer--sticky":E.value},o.value,i.value,s.value,c.value,f.value],style:[d.value,C.value,b.value,k.value,Le.value]},n),{default:()=>[Ee&&u("div",{key:"image",class:"v-navigation-drawer__img"},[t.image?($=t.image)==null?void 0:$.call(t,{image:e.image}):u("img",{src:e.image,alt:""},null)]),t.prepend&&u("div",{class:"v-navigation-drawer__prepend"},[(ee=t.prepend)==null?void 0:ee.call(t)]),u("div",{class:"v-navigation-drawer__content"},[(te=t.default)==null?void 0:te.call(t)]),t.append&&u("div",{class:"v-navigation-drawer__append"},[(ae=t.append)==null?void 0:ae.call(t)])]}),u(Ue,{name:"fade-transition"},{default:()=>[w.value&&(v.value||m.value)&&!!e.scrim&&u("div",{class:["v-navigation-drawer__scrim",Q.backgroundColorClasses.value],style:[Re.value,Q.backgroundColorStyles.value],onClick:()=>m.value=!1},null)]})])}),{isStuck:K}}});function _t(e,a,n,t,r,o){const s=F("LanguageSelectorDialog");return T(),W(A,null,[u(Tt,{modelValue:e.drawer,"onUpdate:modelValue":a[0]||(a[0]=i=>e.drawer=i),bottom:"",temporary:""},{default:_(()=>[u(he,null,{default:_(()=>[(T(!0),W(A,null,le(e.storyType,(i,d)=>(T(),M(ye,{key:d,to:{name:i.routeName}},{default:_(()=>[u(je,null,{default:_(()=>[re(se(i.name),1)]),_:2},1024)]),_:2},1032,["to"]))),128))]),_:1})]),_:1},8,["modelValue"]),u(gt,{density:"compact"},{default:_(()=>[u(ft,{variant:"text",onClick:a[1]||(a[1]=qe(i=>e.drawer=!e.drawer,["stop"]))}),u(ot),u(Ce,{variant:"text",icon:"mdi-translate",onClick:a[2]||(a[2]=i=>e.selectLanguageDialog=!0)})]),_:1}),u(s,{modelValue:e.selectLanguageDialog,"onUpdate:modelValue":a[3]||(a[3]=i=>e.selectLanguageDialog=i),options:e.availableLanguages,onSelectLanguage:e.selectLanguage},null,8,["modelValue","options","onSelectLanguage"])],64)}const kt=j(ct,[["render",_t]]),$t=Z({name:"StoryReader",components:{RenderBlock:De,CharImageDialog:Ne,StoryReaderAppBar:kt},setup(){const e=ie(),a=fe(),{getStoryTable:n,getStoryList:t}=Me(),{getCharacterTable:r}=Ie(),{getCharacterSpriteTable:o}=He(),s=p(!0),i=p(!1),d=p([]),c=async()=>{s.value=!0;try{await n(),await t(),await r(),await o()}catch(l){d.value.push(l)}finally{s.value=!1,i.value=!0}};return G(async()=>{await c(),H(()=>[e.name,a.storySet,a.story],()=>{if(e.name==="select-story")if(a.storySet){let l=a.storySet.name[a.language||"zh_CN"];l?document.title=l:document.title="Arknights Tools | Story Reader"}else document.title="Arknights Tools | Story Reader";else if(e.name==="render-story"){if(a.story){let l=a.getStoryTitle(a.story.storyId);l?document.title=l:document.title="Arknights Tools | Story Reader"}}else document.title="Arknights Tools | Story Reader"},{immediate:!0})}),{loading:s,ready:i,errors:d,route:e}}});const Bt=z({name:"VMain",props:{scrollable:Boolean,...X({tag:"main"})},setup(e,a){let{slots:n}=a;const{mainStyles:t}=at(),{ssrBootStyles:r}=Be();return N(()=>{var o,s;return u(e.tag,{class:["v-main",{"v-main--scrollable":e.scrollable}],style:[t.value,r.value]},{default:()=>[e.scrollable?u("div",{class:"v-main__scroller"},[(o=n.default)==null?void 0:o.call(n)]):(s=n.default)==null?void 0:s.call(n)]})}),{}}});function Ct(e,a,n,t,r,o){const s=F("StoryReaderAppBar"),i=F("router-view");return T(),M(lt,null,{default:_(()=>[e.loading?(T(),M(Ke,{key:0,indeterminate:""})):Y("",!0),u(s),u(Bt,null,{default:_(()=>[e.route.name!=="render-story"?(T(),M(rt,{key:0},{default:_(()=>[e.ready?(T(),M(i,{key:0})):Y("",!0)]),_:1})):e.route.name==="render-story"?(T(),W(A,{key:1},[e.ready?(T(),M(i,{key:0})):Y("",!0)],64)):Y("",!0)]),_:1})]),_:1})}const Gt=j($t,[["render",Ct]]);export{Gt as default};