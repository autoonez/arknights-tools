import{f as p,l as s,aE as W,a as o,y as le,q as H,s as me,B as j,u as D,r as _,V as Ye,Q as Oe,g as We,a8 as je,h as Q,aH as ge,I as M,aI as z,C as N,aJ as he,E as ae,m as Z,aD as Ge,z as ye,p as Ue,x as T,aK as oe,t as G,v as ie,F as L,aw as ve,k as be,n as ne,D as ue,U as J,aL as ze,R as Ce,aM as Ne,aN as Ve,j as Ke}from"./index.df28dd6e.js";import{y as Ie,e as se,u as A,M as re,w as ke,a as xe,p as _e,R as qe,f as Je,I as Qe,m as Ze}from"./router.751d0875.js";import{a as Se,b as et}from"./index.d545f964.js";import{m as tt,j as nt,L as lt}from"./VCard.02cadcd2.js";import{n as at,a as ot,s as it,f as ut,m as st,u as rt}from"./forwardRefs.9edc86a2.js";import{a as ct,V as fe,m as dt,b as vt}from"./VBtn.07902e6c.js";import{u as ft}from"./ssrBoot.39214026.js";const mt=p({name:"VMessages",props:{active:Boolean,color:String,messages:{type:[Array,String],default:()=>[]},...Ie({transition:{component:Se,leaveAbsolute:!0,group:!0}})},setup(e,l){let{slots:a}=l;const t=s(()=>W(e.messages)),{textColorClasses:n,textColorStyles:u}=se(s(()=>e.color));return A(()=>o(re,{transition:e.transition,tag:"div",class:["v-messages",n.value],style:u.value},{default:()=>[e.active&&t.value.map((i,r)=>o("div",{class:"v-messages__message",key:`${r}-${t.value}`},[a.message?a.message({message:i}):i]))]})),{}}}),gt=Symbol.for("vuetify:form");function ht(){return le(gt,null)}const yt=H({disabled:Boolean,error:Boolean,errorMessages:{type:[Array,String],default:()=>[]},maxErrors:{type:[Number,String],default:1},name:String,label:String,readonly:Boolean,rules:{type:Array,default:()=>[]},modelValue:null,validationValue:null},"validation");function bt(e){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:me(),a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:j();const t=D(e,"modelValue"),n=s(()=>e.validationValue===void 0?t.value:e.validationValue),u=ht(),i=_([]),r=_(!0),c=s(()=>!!(W(t.value===""?null:t.value).length||W(n.value===""?null:n.value).length)),g=s(()=>!!(e.disabled||u!=null&&u.isDisabled.value)),I=s(()=>!!(e.readonly||u!=null&&u.isReadonly.value)),v=s(()=>e.errorMessages.length?W(e.errorMessages):i.value),d=s(()=>e.error||v.value.length?!1:e.rules.length&&r.value?null:!0),h=_(!1),y=s(()=>({[`${l}--error`]:d.value===!1,[`${l}--dirty`]:c.value,[`${l}--disabled`]:g.value,[`${l}--readonly`]:I.value})),V=s(()=>{var m;return(m=e.name)!=null?m:Ye(a)});Oe(()=>{u==null||u.register({id:V.value,validate:k,reset:S,resetValidation:x})}),We(()=>{u==null||u.unregister(V.value)}),je(()=>u==null?void 0:u.update(V.value,d.value,v.value)),Q(n,()=>{n.value!=null&&k()}),Q(d,()=>{u==null||u.update(V.value,d.value,v.value)});function S(){x(),t.value=null}function x(){r.value=!0,i.value=[]}async function k(){const m=[];h.value=!0;for(const f of e.rules){if(m.length>=(e.maxErrors||1))break;const C=await(typeof f=="function"?f:()=>f)(n.value);if(C!==!0){if(typeof C!="string"){console.warn(`${C} is not a valid value. Rule functions must return boolean true or a string.`);continue}m.push(C)}}return i.value=m,h.value=!1,r.value=!1,i.value}return{errorMessages:v,isDirty:c,isDisabled:g,isReadonly:I,isPristine:r,isValid:d,isValidating:h,reset:S,resetValidation:x,validate:k,validationClasses:y}}function $e(e){const{t:l}=ge();function a(t){var c;let{name:n}=t;const u={prepend:"prependAction",prependInner:"prependAction",append:"appendAction",appendInner:"appendAction",clear:"clear"}[n],i=e[`onClick:${n}`],r=i&&u?l(`$vuetify.input.${u}`,(c=e.label)!=null?c:""):void 0;return o(ke,{icon:e[`${n}Icon`],"aria-label":r,onClick:i},null)}return{InputIcon:a}}const ce=H({id:String,appendIcon:M,prependIcon:M,hideDetails:[Boolean,String],messages:{type:[Array,String],default:()=>[]},direction:{type:String,default:"horizontal",validator:e=>["horizontal","vertical"].includes(e)},"onClick:prepend":z,"onClick:append":z,...xe(),...yt()},"VInput"),de=N()({name:"VInput",props:{...ce()},emits:{"update:modelValue":e=>!0},setup(e,l){let{attrs:a,slots:t,emit:n}=l;const{densityClasses:u}=_e(e),{InputIcon:i}=$e(e),r=j(),c=s(()=>e.id||`input-${r}`),{errorMessages:g,isDirty:I,isDisabled:v,isReadonly:d,isPristine:h,isValid:y,isValidating:V,reset:S,resetValidation:x,validate:k,validationClasses:m}=bt(e,"v-input",c),f=s(()=>({id:c,isDirty:I,isDisabled:v,isReadonly:d,isPristine:h,isValid:y,isValidating:V,reset:S,resetValidation:x,validate:k}));return A(()=>{var b,C,R,X,P;const $=!!(t.prepend||e.prependIcon),B=!!(t.append||e.appendIcon),E=!!((b=e.messages)!=null&&b.length||g.value.length),F=!e.hideDetails||e.hideDetails==="auto"&&(E||!!t.details);return o("div",{class:["v-input",`v-input--${e.direction}`,u.value,m.value]},[$&&o("div",{key:"prepend",class:"v-input__prepend"},[(C=t.prepend)==null?void 0:C.call(t,f.value),e.prependIcon&&o(i,{key:"prepend-icon",name:"prepend"},null)]),t.default&&o("div",{class:"v-input__control"},[(R=t.default)==null?void 0:R.call(t,f.value)]),B&&o("div",{key:"append",class:"v-input__append"},[e.appendIcon&&o(i,{key:"append-icon",name:"append"},null),(X=t.append)==null?void 0:X.call(t,f.value)]),F&&o("div",{class:"v-input__details"},[o(mt,{active:E,messages:g.value.length>0?g.value:e.messages},{message:t.message}),(P=t.details)==null?void 0:P.call(t,f.value)])])}),{reset:S,resetValidation:x,validate:k}}});function Be(e){const l=Object.keys(de.props).filter(a=>!he(a));return ae(e,l)}const Pe=p({name:"VLabel",props:{text:String,clickable:Boolean,...Z()},setup(e,l){let{slots:a}=l;return A(()=>{var t;return o("label",{class:["v-label",{"v-label--clickable":e.clickable}]},[e.text,(t=a.default)==null?void 0:t.call(a)])}),{}}});const we=Symbol.for("vuetify:selection-control-group"),Ae=H({color:String,disabled:Boolean,error:Boolean,id:String,inline:Boolean,falseIcon:M,trueIcon:M,ripple:{type:Boolean,default:!0},multiple:{type:Boolean,default:null},name:String,readonly:Boolean,modelValue:null,type:String,valueComparator:{type:Function,default:Ge},...Z(),...xe()},"VSelectionControlGroup");p({name:"VSelectionControlGroup",props:{defaultsTarget:{type:String,default:"VSelectionControl"},...Ae()},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l;const t=D(e,"modelValue"),n=j(),u=s(()=>e.id||`v-selection-control-group-${n}`),i=s(()=>e.name||u.value);return ye(we,{modelValue:t}),Ue({[e.defaultsTarget]:{color:T(e,"color"),disabled:T(e,"disabled"),density:T(e,"density"),error:T(e,"error"),inline:T(e,"inline"),modelValue:t,multiple:s(()=>!!e.multiple||e.multiple==null&&Array.isArray(t.value)),name:i,falseIcon:T(e,"falseIcon"),trueIcon:T(e,"trueIcon"),readonly:T(e,"readonly"),ripple:T(e,"ripple"),type:T(e,"type"),valueComparator:T(e,"valueComparator")}}),A(()=>{var r;return o("div",{class:["v-selection-control-group",{"v-selection-control-group--inline":e.inline}],"aria-labelled-by":e.type==="radio"?u.value:void 0,role:e.type==="radio"?"radiogroup":void 0},[(r=a.default)==null?void 0:r.call(a)])}),{}}});const Fe=H({label:String,trueValue:null,falseValue:null,value:null,...Ae()},"VSelectionControl");function Ct(e){const l=le(we,void 0),{densityClasses:a}=_e(e),t=D(e,"modelValue"),n=s(()=>e.trueValue!==void 0?e.trueValue:e.value!==void 0?e.value:!0),u=s(()=>e.falseValue!==void 0?e.falseValue:!1),i=s(()=>!!e.multiple||e.multiple==null&&Array.isArray(t.value)),r=s({get(){const v=l?l.modelValue.value:t.value;return i.value?v.some(d=>e.valueComparator(d,n.value)):e.valueComparator(v,n.value)},set(v){if(e.readonly)return;const d=v?n.value:u.value;let h=d;i.value&&(h=v?[...W(t.value),d]:W(t.value).filter(y=>!e.valueComparator(y,n.value))),l?l.modelValue.value=h:t.value=h}}),{textColorClasses:c,textColorStyles:g}=se(s(()=>r.value&&!e.error&&!e.disabled?e.color:void 0)),I=s(()=>r.value?e.trueIcon:e.falseIcon);return{group:l,densityClasses:a,trueValue:n,falseValue:u,model:r,textColorClasses:c,textColorStyles:g,icon:I}}const Vt=N()({name:"VSelectionControl",directives:{Ripple:qe},inheritAttrs:!1,props:Fe(),emits:{"update:modelValue":e=>!0},setup(e,l){let{attrs:a,slots:t}=l;const{densityClasses:n,icon:u,model:i,textColorClasses:r,textColorStyles:c,trueValue:g}=Ct(e),I=j(),v=s(()=>e.id||`input-${I}`),d=_(!1),h=_(!1),y=_();function V(k){d.value=!0,(!ve||ve&&k.target.matches(":focus-visible"))&&(h.value=!0)}function S(){d.value=!1,h.value=!1}function x(k){i.value=k.target.checked}return A(()=>{var k,m;const f=t.label?t.label({label:e.label,props:{for:v.value}}):e.label,[b,C]=oe(a);return o("div",L({class:["v-selection-control",{"v-selection-control--dirty":i.value,"v-selection-control--disabled":e.disabled,"v-selection-control--error":e.error,"v-selection-control--focused":d.value,"v-selection-control--focus-visible":h.value,"v-selection-control--inline":e.inline},n.value]},b),[o("div",{class:["v-selection-control__wrapper",r.value],style:c.value},[(k=t.default)==null?void 0:k.call(t),G(o("div",{class:["v-selection-control__input"]},[u.value&&o(ke,{key:"icon",icon:u.value},null),o("input",L({ref:y,checked:i.value,disabled:e.disabled,id:v.value,onBlur:S,onFocus:V,onInput:x,"aria-readonly":e.readonly,type:e.type,value:g.value,name:e.name,"aria-checked":e.type==="checkbox"?i.value:void 0},C),null),(m=t.input)==null?void 0:m.call(t,{model:i,textColorClasses:r,textColorStyles:c,props:{onFocus:V,onBlur:S,id:v.value}})]),[[ie("ripple"),e.ripple&&[!e.disabled&&!e.readonly,null,["center","circle"]]]])]),f&&o(Pe,{for:v.value,clickable:!0},{default:()=>[f]})])}),{isFocused:d,input:y}}}),Te=H({indeterminate:Boolean,indeterminateIcon:{type:M,default:"$checkboxIndeterminate"},...Fe({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"VCheckboxBtn"),Ee=p({name:"VCheckboxBtn",props:Te(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,l){let{slots:a}=l;const t=D(e,"indeterminate"),n=D(e,"modelValue");function u(c){t.value&&(t.value=!1)}const i=s(()=>e.indeterminate?e.indeterminateIcon:e.falseIcon),r=s(()=>e.indeterminate?e.indeterminateIcon:e.trueIcon);return A(()=>o(Vt,L(e,{modelValue:n.value,"onUpdate:modelValue":[c=>n.value=c,u],class:"v-checkbox-btn",type:"checkbox",inline:!0,falseIcon:i.value,trueIcon:r.value,"aria-checked":e.indeterminate?"mixed":void 0}),a)),{}}});function It(e){return ae(e,Object.keys(Ee.props))}const Wt=p({name:"VCheckbox",inheritAttrs:!1,props:{...ce(),...Te()},setup(e,l){let{attrs:a,slots:t}=l;const n=j(),u=s(()=>e.id||`checkbox-${n}`);return A(()=>{const[i,r]=oe(a),[c,g]=Be(e),[I,v]=It(e);return o(de,L({class:"v-checkbox"},i,c,{id:u.value}),{...t,default:d=>{let{id:h,isDisabled:y,isReadonly:V}=d;return o(Ee,L(I,{id:h.value,disabled:y.value,readonly:V.value},r),t)}})}),{}}});const q=p({name:"VFieldLabel",props:{floating:Boolean},setup(e,l){let{slots:a}=l;return A(()=>o(Pe,{class:["v-field-label",{"v-field-label--floating":e.floating}],"aria-hidden":e.floating||void 0},a)),{}}}),kt=H({focused:Boolean},"focus");function xt(e){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:me();const a=D(e,"focused"),t=s(()=>({[`${l}--focused`]:a.value}));function n(){a.value=!0}function u(){a.value=!1}return{focusClasses:t,isFocused:a,focus:n,blur:u}}const _t=["underlined","outlined","filled","solo","plain"],Re=H({appendInnerIcon:M,bgColor:String,clearable:Boolean,clearIcon:{type:M,default:"$clear"},active:Boolean,color:String,dirty:Boolean,disabled:Boolean,error:Boolean,label:String,persistentClear:Boolean,prependInnerIcon:M,reverse:Boolean,singleLine:Boolean,variant:{type:String,default:"filled",validator:e=>_t.includes(e)},"onClick:clear":z,"onClick:appendInner":z,"onClick:prependInner":z,...Z(),...tt()},"v-field"),Le=N()({name:"VField",inheritAttrs:!1,props:{id:String,...kt(),...Re()},emits:{"click:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,l){let{attrs:a,emit:t,slots:n}=l;const{themeClasses:u}=be(e),{loaderClasses:i}=nt(e),{focusClasses:r,isFocused:c,focus:g,blur:I}=xt(e),{InputIcon:v}=$e(e),d=s(()=>e.dirty||e.active),h=s(()=>!e.singleLine&&!!(e.label||n.label)),y=j(),V=s(()=>e.id||`input-${y}`),S=_(),x=_(),k=_(),{backgroundColorClasses:m,backgroundColorStyles:f}=Je(T(e,"bgColor")),{textColorClasses:b,textColorStyles:C}=se(s(()=>d.value&&c.value&&!e.error&&!e.disabled?e.color:void 0));Q(d,P=>{if(h.value){const $=S.value.$el,B=x.value.$el,E=at($),F=B.getBoundingClientRect(),Y=F.x-E.x,O=F.y-E.y-(E.height/2-F.height/2),w=F.width/.75,K=Math.abs(w-E.width)>1?{maxWidth:ne(w)}:void 0,ee=getComputedStyle($),U=getComputedStyle(B),te=parseFloat(ee.transitionDuration)*1e3||150,He=parseFloat(U.getPropertyValue("--v-field-label-scale")),Xe=U.getPropertyValue("color");$.style.visibility="visible",B.style.visibility="hidden",ot($,{transform:`translate(${Y}px, ${O}px) scale(${He})`,color:Xe,...K},{duration:te,easing:it,direction:P?"normal":"reverse"}).finished.then(()=>{$.style.removeProperty("visibility"),B.style.removeProperty("visibility")})}},{flush:"post"});const R=s(()=>({isActive:d,isFocused:c,controlRef:k,blur:I,focus:g}));function X(P){P.target!==document.activeElement&&P.preventDefault(),t("click:control",P)}return A(()=>{var P,$,B;const E=e.variant==="outlined",F=n["prepend-inner"]||e.prependInnerIcon,Y=!!(e.clearable||n.clear),O=!!(n["append-inner"]||e.appendInnerIcon||Y),w=n.label?n.label({label:e.label,props:{for:V.value}}):e.label;return o("div",L({class:["v-field",{"v-field--active":d.value,"v-field--appended":O,"v-field--disabled":e.disabled,"v-field--dirty":e.dirty,"v-field--error":e.error,"v-field--has-background":!!e.bgColor,"v-field--persistent-clear":e.persistentClear,"v-field--prepended":F,"v-field--reverse":e.reverse,"v-field--single-line":e.singleLine,"v-field--no-label":!w,[`v-field--variant-${e.variant}`]:!0},u.value,m.value,r.value,i.value],style:[f.value,C.value],onClick:X},a),[o("div",{class:"v-field__overlay"},null),o(lt,{name:"v-field",active:e.loading,color:e.error?"error":e.color},{default:n.loader}),F&&o("div",{key:"prepend",class:"v-field__prepend-inner"},[e.prependInnerIcon&&o(v,{key:"prepend-icon",name:"prependInner"},null),(P=n["prepend-inner"])==null?void 0:P.call(n,R.value)]),o("div",{class:"v-field__field","data-no-activator":""},[["solo","filled"].includes(e.variant)&&h.value&&o(q,{key:"floating-label",ref:x,class:[b.value],floating:!0,for:V.value},{default:()=>[w]}),o(q,{ref:S,for:V.value},{default:()=>[w]}),($=n.default)==null?void 0:$.call(n,{...R.value,props:{id:V.value,class:"v-field__input"},focus:g,blur:I})]),Y&&o(et,{key:"clear"},{default:()=>[G(o("div",{class:"v-field__clearable"},[n.clear?n.clear():o(v,{name:"clear"},null)]),[[ue,e.dirty]])]}),O&&o("div",{key:"append",class:"v-field__append-inner"},[(B=n["append-inner"])==null?void 0:B.call(n,R.value),e.appendInnerIcon&&o(v,{key:"append-icon",name:"appendInner"},null)]),o("div",{class:["v-field__outline",b.value]},[E&&o(J,null,[o("div",{class:"v-field__outline__start"},null),h.value&&o("div",{class:"v-field__outline__notch"},[o(q,{ref:x,floating:!0,for:V.value},{default:()=>[w]})]),o("div",{class:"v-field__outline__end"},null)]),["plain","underlined"].includes(e.variant)&&h.value&&o(q,{ref:x,floating:!0,for:V.value},{default:()=>[w]})])])}),{controlRef:k}}});function St(e){const l=Object.keys(Le.props).filter(a=>!he(a));return ae(e,l)}const $t=p({name:"VCounter",functional:!0,props:{active:Boolean,max:[Number,String],value:{type:[Number,String],default:0},...Ie({transition:{component:Se}})},setup(e,l){let{slots:a}=l;const t=s(()=>e.max?`${e.value} / ${e.max}`:String(e.value));return A(()=>o(re,{transition:e.transition},{default:()=>[G(o("div",{class:"v-counter"},[a.default?a.default({counter:t.value,max:e.max,value:e.value}):t.value]),[[ue,e.active]])]})),{}}}),Bt=["color","file","time","date","datetime-local","week","month"],jt=N()({name:"VTextField",directives:{Intersect:Qe},inheritAttrs:!1,props:{autofocus:Boolean,counter:[Boolean,Number,String],counterValue:Function,hint:String,persistentHint:Boolean,prefix:String,placeholder:String,persistentPlaceholder:Boolean,persistentCounter:Boolean,suffix:String,type:{type:String,default:"text"},...ce(),...Re()},emits:{"click:control":e=>!0,"click:input":e=>!0,"update:modelValue":e=>!0},setup(e,l){let{attrs:a,emit:t,slots:n}=l;const u=D(e,"modelValue"),i=s(()=>{var m;return typeof e.counterValue=="function"?e.counterValue(u.value):((m=u.value)!=null?m:"").toString().length}),r=s(()=>{if(a.maxlength)return a.maxlength;if(!(!e.counter||typeof e.counter!="number"&&typeof e.counter!="string"))return e.counter});function c(m,f){var b,C;!e.autofocus||!m||(b=f[0].target)==null||(C=b.focus)==null||C.call(b)}const g=_(),I=_(),v=_(!1),d=_(),h=s(()=>Bt.includes(e.type)||e.persistentPlaceholder||v.value),y=s(()=>e.messages.length?e.messages:v.value||e.persistentHint?e.hint:"");function V(){if(d.value!==document.activeElement){var m;(m=d.value)==null||m.focus()}v.value||(v.value=!0)}function S(m){V(),t("click:control",m)}function x(m){m.stopPropagation(),V(),Ce(()=>{u.value="",Ne(e["onClick:clear"],m)})}function k(m){u.value=m.target.value}return A(()=>{const m=!!(n.counter||e.counter||e.counterValue),f=!!(m||n.details),[b,C]=oe(a),[{modelValue:R,...X}]=Be(e),[P]=St(e);return o(de,L({ref:g,modelValue:u.value,"onUpdate:modelValue":$=>u.value=$,class:["v-text-field",{"v-text-field--prefixed":e.prefix,"v-text-field--suffixed":e.suffix,"v-text-field--flush-details":["plain","underlined"].includes(e.variant)}],"onClick:prepend":e["onClick:prepend"],"onClick:append":e["onClick:append"]},b,X,{messages:y.value}),{...n,default:$=>{let{id:B,isDisabled:E,isDirty:F,isReadonly:Y,isValid:O}=$;return o(Le,L({ref:I,onMousedown:w=>{w.target!==d.value&&w.preventDefault()},"onClick:control":S,"onClick:clear":x,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"],role:"textbox"},P,{id:B.value,active:h.value||F.value,dirty:F.value||e.dirty,focused:v.value,error:O.value===!1}),{...n,default:w=>{let{props:{class:K,...ee}}=w;const U=G(o("input",L({ref:d,value:u.value,onInput:k,autofocus:e.autofocus,readonly:Y.value,disabled:E.value,name:e.name,placeholder:e.placeholder,size:1,type:e.type,onFocus:V,onBlur:()=>v.value=!1},ee,C),null),[[ie("intersect"),{handler:c},null,{once:!0}]]);return o(J,null,[e.prefix&&o("span",{class:"v-text-field__prefix"},[e.prefix]),n.default?o("div",{class:K,onClick:te=>t("click:input",te),"data-no-activator":""},[n.default(),U]):ze(U,{class:K}),e.suffix&&o("span",{class:"v-text-field__suffix"},[e.suffix])])}})},details:f?$=>{var B;return o(J,null,[(B=n.details)==null?void 0:B.call(n,$),m&&o(J,null,[o("span",null,null),o($t,{active:e.persistentCounter||v.value,value:i.value,max:r.value},n.counter)])])}:void 0})}),ut({},g,I,d)}});const Pt=e=>{const{touchstartX:l,touchendX:a,touchstartY:t,touchendY:n}=e,u=.5,i=16;e.offsetX=a-l,e.offsetY=n-t,Math.abs(e.offsetY)<u*Math.abs(e.offsetX)&&(e.left&&a<l-i&&e.left(e),e.right&&a>l+i&&e.right(e)),Math.abs(e.offsetX)<u*Math.abs(e.offsetY)&&(e.up&&n<t-i&&e.up(e),e.down&&n>t+i&&e.down(e))};function wt(e,l){var a;const t=e.changedTouches[0];l.touchstartX=t.clientX,l.touchstartY=t.clientY,(a=l.start)==null||a.call(l,{originalEvent:e,...l})}function At(e,l){var a;const t=e.changedTouches[0];l.touchendX=t.clientX,l.touchendY=t.clientY,(a=l.end)==null||a.call(l,{originalEvent:e,...l}),Pt(l)}function Ft(e,l){var a;const t=e.changedTouches[0];l.touchmoveX=t.clientX,l.touchmoveY=t.clientY,(a=l.move)==null||a.call(l,{originalEvent:e,...l})}function Tt(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const l={touchstartX:0,touchstartY:0,touchendX:0,touchendY:0,touchmoveX:0,touchmoveY:0,offsetX:0,offsetY:0,left:e.left,right:e.right,up:e.up,down:e.down,start:e.start,move:e.move,end:e.end};return{touchstart:a=>wt(a,l),touchend:a=>At(a,l),touchmove:a=>Ft(a,l)}}function Et(e,l){var c,g;var a;const t=l.value,n=t!=null&&t.parent?e.parentElement:e,u=(c=t==null?void 0:t.options)!=null?c:{passive:!0},i=(a=l.instance)==null?void 0:a.$.uid;if(!n||!i)return;const r=Tt(l.value);n._touchHandlers=(g=n._touchHandlers)!=null?g:Object.create(null),n._touchHandlers[i]=r,Ve(r).forEach(I=>{n.addEventListener(I,r[I],u)})}function Rt(e,l){var a,t;const n=(a=l.value)!=null&&a.parent?e.parentElement:e,u=(t=l.instance)==null?void 0:t.$.uid;if(!(n!=null&&n._touchHandlers)||!u)return;const i=n._touchHandlers[u];Ve(i).forEach(r=>{n.removeEventListener(r,i[r])}),delete n._touchHandlers[u]}const Me={mounted:Et,unmounted:Rt},Lt=Me,pe=Symbol.for("vuetify:v-window"),De=Symbol.for("vuetify:v-window-group"),Gt=N()({name:"VWindow",directives:{Touch:Me},props:{continuous:Boolean,nextIcon:{type:[Boolean,String,Function,Object],default:"$next"},prevIcon:{type:[Boolean,String,Function,Object],default:"$prev"},reverse:Boolean,showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||e==="hover"},touch:{type:[Object,Boolean],default:void 0},direction:{type:String,default:"horizontal"},modelValue:null,disabled:Boolean,selectedClass:{type:String,default:"v-window-item--active"},mandatory:{default:"force"},...Ze(),...Z()},emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l;const{themeClasses:t}=be(e),{isRtl:n}=Ke(),{t:u}=ge(),i=ct(e,De),r=_(),c=s(()=>n.value?!e.reverse:e.reverse),g=_(!1),I=s(()=>{const f=e.direction==="vertical"?"y":"x",C=(c.value?!g.value:g.value)?"-reverse":"";return`v-window-${f}${C}-transition`}),v=_(0),d=_(void 0),h=s(()=>i.items.value.findIndex(f=>i.selected.value.includes(f.id)));Q(h,(f,b)=>{const C=i.items.value.length,R=C-1;C<=2?g.value=f<b:f===R&&b===0?g.value=!0:f===0&&b===R?g.value=!1:g.value=f<b}),ye(pe,{transition:I,isReversed:g,transitionCount:v,transitionHeight:d,rootRef:r});const y=s(()=>e.continuous||h.value!==0),V=s(()=>e.continuous||h.value!==i.items.value.length-1);function S(){y.value&&i.prev()}function x(){V.value&&i.next()}const k=s(()=>{const f=[],b={icon:n.value?e.nextIcon:e.prevIcon,class:`v-window__${c.value?"right":"left"}`,onClick:i.prev,ariaLabel:u("$vuetify.carousel.prev")};f.push(y.value?a.prev?a.prev({props:b}):o(fe,b,null):o("div",null,null));const C={icon:n.value?e.prevIcon:e.nextIcon,class:`v-window__${c.value?"left":"right"}`,onClick:i.next,ariaLabel:u("$vuetify.carousel.next")};return f.push(V.value?a.next?a.next({props:C}):o(fe,C,null):o("div",null,null)),f}),m=s(()=>e.touch===!1?e.touch:{...{left:()=>{c.value?S():x()},right:()=>{c.value?x():S()},start:b=>{let{originalEvent:C}=b;C.stopPropagation()}},...e.touch===!0?{}:e.touch});return A(()=>{var f,b;return G(o(e.tag,{ref:r,class:["v-window",{"v-window--show-arrows-on-hover":e.showArrows==="hover"},t.value]},{default:()=>[o("div",{class:"v-window__container",style:{height:d.value}},[(f=a.default)==null?void 0:f.call(a,{group:i}),e.showArrows!==!1&&o("div",{class:"v-window__controls"},[k.value])]),(b=a.additional)==null?void 0:b.call(a,{group:i})]}),[[ie("touch"),m.value]])}),{group:i}}}),Ut=p({name:"VWindowItem",directives:{Touch:Lt},props:{reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},...dt(),...st()},emits:{"group:selected":e=>!0},setup(e,l){let{slots:a}=l;const t=le(pe),n=vt(e,De),{isBooted:u}=ft();if(!t||!n)throw new Error("[Vuetify] VWindowItem must be used inside VWindow");const i=_(!1),r=s(()=>t.isReversed.value?e.reverseTransition!==!1:e.transition!==!1);function c(){!i.value||!t||(i.value=!1,t.transitionCount.value>0&&(t.transitionCount.value-=1,t.transitionCount.value===0&&(t.transitionHeight.value=void 0)))}function g(){if(!(i.value||!t)){if(i.value=!0,t.transitionCount.value===0){var y;t.transitionHeight.value=ne((y=t.rootRef.value)==null?void 0:y.clientHeight)}t.transitionCount.value+=1}}function I(){c()}function v(y){!i.value||Ce(()=>{!r.value||!i.value||!t||(t.transitionHeight.value=ne(y.clientHeight))})}const d=s(()=>{const y=t.isReversed.value?e.reverseTransition:e.transition;return r.value?{name:typeof y!="string"?t.transition.value:y,onBeforeEnter:g,onAfterEnter:c,onEnterCancelled:I,onBeforeLeave:g,onAfterLeave:c,onLeaveCancelled:I,onEnter:v}:!1}),{hasContent:h}=rt(e,n.isSelected);return A(()=>{var y;return o(re,{transition:u.value&&d.value},{default:()=>[G(o("div",{class:["v-window-item",n.selectedClass.value]},[h.value&&((y=a.default)==null?void 0:y.call(a))]),[[ue,n.isSelected.value]])]})}),{}}});export{Ut as V,jt as a,Wt as b,Gt as c,Ee as d};