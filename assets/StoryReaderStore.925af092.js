import{ah as fr,ae as lr,r as B}from"./index.039e7fc9.js";function cr(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var He={exports:{}},ue={exports:{}},Me=function(r,t){return function(){for(var n=new Array(arguments.length),a=0;a<n.length;a++)n[a]=arguments[a];return r.apply(t,n)}},dr=Me,fe=Object.prototype.toString,le=function(e){return function(r){var t=fe.call(r);return e[t]||(e[t]=t.slice(8,-1).toLowerCase())}}(Object.create(null));function O(e){return e=e.toLowerCase(),function(t){return le(t)===e}}function ce(e){return Array.isArray(e)}function F(e){return typeof e>"u"}function hr(e){return e!==null&&!F(e)&&e.constructor!==null&&!F(e.constructor)&&typeof e.constructor.isBuffer=="function"&&e.constructor.isBuffer(e)}var Je=O("ArrayBuffer");function pr(e){var r;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?r=ArrayBuffer.isView(e):r=e&&e.buffer&&Je(e.buffer),r}function vr(e){return typeof e=="string"}function mr(e){return typeof e=="number"}function Ve(e){return e!==null&&typeof e=="object"}function L(e){if(le(e)!=="object")return!1;var r=Object.getPrototypeOf(e);return r===null||r===Object.prototype}var Er=O("Date"),Rr=O("File"),yr=O("Blob"),br=O("FileList");function de(e){return fe.call(e)==="[object Function]"}function wr(e){return Ve(e)&&de(e.pipe)}function Sr(e){var r="[object FormData]";return e&&(typeof FormData=="function"&&e instanceof FormData||fe.call(e)===r||de(e.toString)&&e.toString()===r)}var Or=O("URLSearchParams");function Ar(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function Cr(){return typeof navigator<"u"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")?!1:typeof window<"u"&&typeof document<"u"}function he(e,r){if(!(e===null||typeof e>"u"))if(typeof e!="object"&&(e=[e]),ce(e))for(var t=0,i=e.length;t<i;t++)r.call(null,e[t],t,e);else for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&r.call(null,e[n],n,e)}function oe(){var e={};function r(n,a){L(e[a])&&L(n)?e[a]=oe(e[a],n):L(n)?e[a]=oe({},n):ce(n)?e[a]=n.slice():e[a]=n}for(var t=0,i=arguments.length;t<i;t++)he(arguments[t],r);return e}function xr(e,r,t){return he(r,function(n,a){t&&typeof n=="function"?e[a]=dr(n,t):e[a]=n}),e}function Tr(e){return e.charCodeAt(0)===65279&&(e=e.slice(1)),e}function Pr(e,r,t,i){e.prototype=Object.create(r.prototype,i),e.prototype.constructor=e,t&&Object.assign(e.prototype,t)}function _r(e,r,t){var i,n,a,s={};r=r||{};do{for(i=Object.getOwnPropertyNames(e),n=i.length;n-- >0;)a=i[n],s[a]||(r[a]=e[a],s[a]=!0);e=Object.getPrototypeOf(e)}while(e&&(!t||t(e,r))&&e!==Object.prototype);return r}function Nr(e,r,t){e=String(e),(t===void 0||t>e.length)&&(t=e.length),t-=r.length;var i=e.indexOf(r,t);return i!==-1&&i===t}function Dr(e){if(!e)return null;var r=e.length;if(F(r))return null;for(var t=new Array(r);r-- >0;)t[r]=e[r];return t}var Ur=function(e){return function(r){return e&&r instanceof e}}(typeof Uint8Array<"u"&&Object.getPrototypeOf(Uint8Array)),v={isArray:ce,isArrayBuffer:Je,isBuffer:hr,isFormData:Sr,isArrayBufferView:pr,isString:vr,isNumber:mr,isObject:Ve,isPlainObject:L,isUndefined:F,isDate:Er,isFile:Rr,isBlob:yr,isFunction:de,isStream:wr,isURLSearchParams:Or,isStandardBrowserEnv:Cr,forEach:he,merge:oe,extend:xr,trim:Ar,stripBOM:Tr,inherits:Pr,toFlatObject:_r,kindOf:le,kindOfTest:O,endsWith:Nr,toArray:Dr,isTypedArray:Ur,isFileList:br},T=v;function ye(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var We=function(r,t,i){if(!t)return r;var n;if(i)n=i(t);else if(T.isURLSearchParams(t))n=t.toString();else{var a=[];T.forEach(t,function(f,h){f===null||typeof f>"u"||(T.isArray(f)?h=h+"[]":f=[f],T.forEach(f,function(d){T.isDate(d)?d=d.toISOString():T.isObject(d)&&(d=JSON.stringify(d)),a.push(ye(h)+"="+ye(d))}))}),n=a.join("&")}if(n){var s=r.indexOf("#");s!==-1&&(r=r.slice(0,s)),r+=(r.indexOf("?")===-1?"?":"&")+n}return r},gr=v;function j(){this.handlers=[]}j.prototype.use=function(r,t,i){return this.handlers.push({fulfilled:r,rejected:t,synchronous:i?i.synchronous:!1,runWhen:i?i.runWhen:null}),this.handlers.length-1};j.prototype.eject=function(r){this.handlers[r]&&(this.handlers[r]=null)};j.prototype.forEach=function(r){gr.forEach(this.handlers,function(i){i!==null&&r(i)})};var qr=j,Br=v,Lr=function(r,t){Br.forEach(r,function(n,a){a!==t&&a.toUpperCase()===t.toUpperCase()&&(r[t]=n,delete r[a])})},ze=v;function _(e,r,t,i,n){Error.call(this),this.message=e,this.name="AxiosError",r&&(this.code=r),t&&(this.config=t),i&&(this.request=i),n&&(this.response=n)}ze.inherits(_,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var Xe=_.prototype,Ke={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED"].forEach(function(e){Ke[e]={value:e}});Object.defineProperties(_,Ke);Object.defineProperty(Xe,"isAxiosError",{value:!0});_.from=function(e,r,t,i,n,a){var s=Object.create(Xe);return ze.toFlatObject(e,s,function(f){return f!==Error.prototype}),_.call(s,e.message,r,t,i,n),s.name=e.name,a&&Object.assign(s,a),s};var D=_,Qe={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},b=v;function $r(e,r){r=r||new FormData;var t=[];function i(a){return a===null?"":b.isDate(a)?a.toISOString():b.isArrayBuffer(a)||b.isTypedArray(a)?typeof Blob=="function"?new Blob([a]):Buffer.from(a):a}function n(a,s){if(b.isPlainObject(a)||b.isArray(a)){if(t.indexOf(a)!==-1)throw Error("Circular reference detected in "+s);t.push(a),b.forEach(a,function(f,h){if(!b.isUndefined(f)){var l=s?s+"."+h:h,d;if(f&&!s&&typeof f=="object"){if(b.endsWith(h,"{}"))f=JSON.stringify(f);else if(b.endsWith(h,"[]")&&(d=b.toArray(f))){d.forEach(function(u){!b.isUndefined(u)&&r.append(l,i(u))});return}}n(f,l)}}),t.pop()}else r.append(s,i(a))}return n(e),r}var Ye=$r,W,be;function Fr(){if(be)return W;be=1;var e=D;return W=function(t,i,n){var a=n.config.validateStatus;!n.status||!a||a(n.status)?t(n):i(new e("Request failed with status code "+n.status,[e.ERR_BAD_REQUEST,e.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))},W}var z,we;function jr(){if(we)return z;we=1;var e=v;return z=e.isStandardBrowserEnv()?function(){return{write:function(i,n,a,s,o,f){var h=[];h.push(i+"="+encodeURIComponent(n)),e.isNumber(a)&&h.push("expires="+new Date(a).toGMTString()),e.isString(s)&&h.push("path="+s),e.isString(o)&&h.push("domain="+o),f===!0&&h.push("secure"),document.cookie=h.join("; ")},read:function(i){var n=document.cookie.match(new RegExp("(^|;\\s*)("+i+")=([^;]*)"));return n?decodeURIComponent(n[3]):null},remove:function(i){this.write(i,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),z}var Ir=function(r){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(r)},kr=function(r,t){return t?r.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):r},Hr=Ir,Mr=kr,Ge=function(r,t){return r&&!Hr(t)?Mr(r,t):t},X,Se;function Jr(){if(Se)return X;Se=1;var e=v,r=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];return X=function(i){var n={},a,s,o;return i&&e.forEach(i.split(`
`),function(h){if(o=h.indexOf(":"),a=e.trim(h.substr(0,o)).toLowerCase(),s=e.trim(h.substr(o+1)),a){if(n[a]&&r.indexOf(a)>=0)return;a==="set-cookie"?n[a]=(n[a]?n[a]:[]).concat([s]):n[a]=n[a]?n[a]+", "+s:s}}),n},X}var K,Oe;function Vr(){if(Oe)return K;Oe=1;var e=v;return K=e.isStandardBrowserEnv()?function(){var t=/(msie|trident)/i.test(navigator.userAgent),i=document.createElement("a"),n;function a(s){var o=s;return t&&(i.setAttribute("href",o),o=i.href),i.setAttribute("href",o),{href:i.href,protocol:i.protocol?i.protocol.replace(/:$/,""):"",host:i.host,search:i.search?i.search.replace(/^\?/,""):"",hash:i.hash?i.hash.replace(/^#/,""):"",hostname:i.hostname,port:i.port,pathname:i.pathname.charAt(0)==="/"?i.pathname:"/"+i.pathname}}return n=a(window.location.href),function(o){var f=e.isString(o)?a(o):o;return f.protocol===n.protocol&&f.host===n.host}}():function(){return function(){return!0}}(),K}var Q,Ae;function I(){if(Ae)return Q;Ae=1;var e=D,r=v;function t(i){e.call(this,i==null?"canceled":i,e.ERR_CANCELED),this.name="CanceledError"}return r.inherits(t,e,{__CANCEL__:!0}),Q=t,Q}var Y,Ce;function Wr(){return Ce||(Ce=1,Y=function(r){var t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(r);return t&&t[1]||""}),Y}var G,xe;function Te(){if(xe)return G;xe=1;var e=v,r=Fr(),t=jr(),i=We,n=Ge,a=Jr(),s=Vr(),o=Qe,f=D,h=I(),l=Wr();return G=function(u){return new Promise(function(ar,A){var U=u.data,g=u.headers,q=u.responseType,C;function me(){u.cancelToken&&u.cancelToken.unsubscribe(C),u.signal&&u.signal.removeEventListener("abort",C)}e.isFormData(U)&&e.isStandardBrowserEnv()&&delete g["Content-Type"];var c=new XMLHttpRequest;if(u.auth){var sr=u.auth.username||"",or=u.auth.password?unescape(encodeURIComponent(u.auth.password)):"";g.Authorization="Basic "+btoa(sr+":"+or)}var M=n(u.baseURL,u.url);c.open(u.method.toUpperCase(),i(M,u.params,u.paramsSerializer),!0),c.timeout=u.timeout;function Ee(){if(!!c){var y="getAllResponseHeaders"in c?a(c.getAllResponseHeaders()):null,x=!q||q==="text"||q==="json"?c.responseText:c.response,S={data:x,status:c.status,statusText:c.statusText,headers:y,config:u,request:c};r(function(V){ar(V),me()},function(V){A(V),me()},S),c=null}}if("onloadend"in c?c.onloadend=Ee:c.onreadystatechange=function(){!c||c.readyState!==4||c.status===0&&!(c.responseURL&&c.responseURL.indexOf("file:")===0)||setTimeout(Ee)},c.onabort=function(){!c||(A(new f("Request aborted",f.ECONNABORTED,u,c)),c=null)},c.onerror=function(){A(new f("Network Error",f.ERR_NETWORK,u,c,c)),c=null},c.ontimeout=function(){var x=u.timeout?"timeout of "+u.timeout+"ms exceeded":"timeout exceeded",S=u.transitional||o;u.timeoutErrorMessage&&(x=u.timeoutErrorMessage),A(new f(x,S.clarifyTimeoutError?f.ETIMEDOUT:f.ECONNABORTED,u,c)),c=null},e.isStandardBrowserEnv()){var Re=(u.withCredentials||s(M))&&u.xsrfCookieName?t.read(u.xsrfCookieName):void 0;Re&&(g[u.xsrfHeaderName]=Re)}"setRequestHeader"in c&&e.forEach(g,function(x,S){typeof U>"u"&&S.toLowerCase()==="content-type"?delete g[S]:c.setRequestHeader(S,x)}),e.isUndefined(u.withCredentials)||(c.withCredentials=!!u.withCredentials),q&&q!=="json"&&(c.responseType=u.responseType),typeof u.onDownloadProgress=="function"&&c.addEventListener("progress",u.onDownloadProgress),typeof u.onUploadProgress=="function"&&c.upload&&c.upload.addEventListener("progress",u.onUploadProgress),(u.cancelToken||u.signal)&&(C=function(y){!c||(A(!y||y&&y.type?new h:y),c.abort(),c=null)},u.cancelToken&&u.cancelToken.subscribe(C),u.signal&&(u.signal.aborted?C():u.signal.addEventListener("abort",C))),U||(U=null);var J=l(M);if(J&&["http","https","file"].indexOf(J)===-1){A(new f("Unsupported protocol "+J+":",f.ERR_BAD_REQUEST,u));return}c.send(U)})},G}var Z,Pe;function zr(){return Pe||(Pe=1,Z=null),Z}var p=v,_e=Lr,Ne=D,Xr=Qe,Kr=Ye,Qr={"Content-Type":"application/x-www-form-urlencoded"};function De(e,r){!p.isUndefined(e)&&p.isUndefined(e["Content-Type"])&&(e["Content-Type"]=r)}function Yr(){var e;return(typeof XMLHttpRequest<"u"||typeof process<"u"&&Object.prototype.toString.call(process)==="[object process]")&&(e=Te()),e}function Gr(e,r,t){if(p.isString(e))try{return(r||JSON.parse)(e),p.trim(e)}catch(i){if(i.name!=="SyntaxError")throw i}return(t||JSON.stringify)(e)}var k={transitional:Xr,adapter:Yr(),transformRequest:[function(r,t){if(_e(t,"Accept"),_e(t,"Content-Type"),p.isFormData(r)||p.isArrayBuffer(r)||p.isBuffer(r)||p.isStream(r)||p.isFile(r)||p.isBlob(r))return r;if(p.isArrayBufferView(r))return r.buffer;if(p.isURLSearchParams(r))return De(t,"application/x-www-form-urlencoded;charset=utf-8"),r.toString();var i=p.isObject(r),n=t&&t["Content-Type"],a;if((a=p.isFileList(r))||i&&n==="multipart/form-data"){var s=this.env&&this.env.FormData;return Kr(a?{"files[]":r}:r,s&&new s)}else if(i||n==="application/json")return De(t,"application/json"),Gr(r);return r}],transformResponse:[function(r){var t=this.transitional||k.transitional,i=t&&t.silentJSONParsing,n=t&&t.forcedJSONParsing,a=!i&&this.responseType==="json";if(a||n&&p.isString(r)&&r.length)try{return JSON.parse(r)}catch(s){if(a)throw s.name==="SyntaxError"?Ne.from(s,Ne.ERR_BAD_RESPONSE,this,null,this.response):s}return r}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:zr()},validateStatus:function(r){return r>=200&&r<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};p.forEach(["delete","get","head"],function(r){k.headers[r]={}});p.forEach(["post","put","patch"],function(r){k.headers[r]=p.merge(Qr)});var pe=k,Zr=v,et=pe,rt=function(r,t,i){var n=this||et;return Zr.forEach(i,function(s){r=s.call(n,r,t)}),r},ee,Ue;function Ze(){return Ue||(Ue=1,ee=function(r){return!!(r&&r.__CANCEL__)}),ee}var ge=v,re=rt,tt=Ze(),nt=pe,it=I();function te(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new it}var at=function(r){te(r),r.headers=r.headers||{},r.data=re.call(r,r.data,r.headers,r.transformRequest),r.headers=ge.merge(r.headers.common||{},r.headers[r.method]||{},r.headers),ge.forEach(["delete","get","head","post","put","patch","common"],function(n){delete r.headers[n]});var t=r.adapter||nt.adapter;return t(r).then(function(n){return te(r),n.data=re.call(r,n.data,n.headers,r.transformResponse),n},function(n){return tt(n)||(te(r),n&&n.response&&(n.response.data=re.call(r,n.response.data,n.response.headers,r.transformResponse))),Promise.reject(n)})},E=v,er=function(r,t){t=t||{};var i={};function n(l,d){return E.isPlainObject(l)&&E.isPlainObject(d)?E.merge(l,d):E.isPlainObject(d)?E.merge({},d):E.isArray(d)?d.slice():d}function a(l){if(E.isUndefined(t[l])){if(!E.isUndefined(r[l]))return n(void 0,r[l])}else return n(r[l],t[l])}function s(l){if(!E.isUndefined(t[l]))return n(void 0,t[l])}function o(l){if(E.isUndefined(t[l])){if(!E.isUndefined(r[l]))return n(void 0,r[l])}else return n(void 0,t[l])}function f(l){if(l in t)return n(r[l],t[l]);if(l in r)return n(void 0,r[l])}var h={url:s,method:s,data:s,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:f};return E.forEach(Object.keys(r).concat(Object.keys(t)),function(d){var u=h[d]||a,R=u(d);E.isUndefined(R)&&u!==f||(i[d]=R)}),i},ne,qe;function rr(){return qe||(qe=1,ne={version:"0.27.2"}),ne}var st=rr().version,w=D,ve={};["object","boolean","number","function","string","symbol"].forEach(function(e,r){ve[e]=function(i){return typeof i===e||"a"+(r<1?"n ":" ")+e}});var Be={};ve.transitional=function(r,t,i){function n(a,s){return"[Axios v"+st+"] Transitional option '"+a+"'"+s+(i?". "+i:"")}return function(a,s,o){if(r===!1)throw new w(n(s," has been removed"+(t?" in "+t:"")),w.ERR_DEPRECATED);return t&&!Be[s]&&(Be[s]=!0,console.warn(n(s," has been deprecated since v"+t+" and will be removed in the near future"))),r?r(a,s,o):!0}};function ot(e,r,t){if(typeof e!="object")throw new w("options must be an object",w.ERR_BAD_OPTION_VALUE);for(var i=Object.keys(e),n=i.length;n-- >0;){var a=i[n],s=r[a];if(s){var o=e[a],f=o===void 0||s(o,a,e);if(f!==!0)throw new w("option "+a+" must be "+f,w.ERR_BAD_OPTION_VALUE);continue}if(t!==!0)throw new w("Unknown option "+a,w.ERR_BAD_OPTION)}}var ut={assertOptions:ot,validators:ve},tr=v,ft=We,Le=qr,$e=at,H=er,lt=Ge,nr=ut,P=nr.validators;function N(e){this.defaults=e,this.interceptors={request:new Le,response:new Le}}N.prototype.request=function(r,t){typeof r=="string"?(t=t||{},t.url=r):t=r||{},t=H(this.defaults,t),t.method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var i=t.transitional;i!==void 0&&nr.assertOptions(i,{silentJSONParsing:P.transitional(P.boolean),forcedJSONParsing:P.transitional(P.boolean),clarifyTimeoutError:P.transitional(P.boolean)},!1);var n=[],a=!0;this.interceptors.request.forEach(function(R){typeof R.runWhen=="function"&&R.runWhen(t)===!1||(a=a&&R.synchronous,n.unshift(R.fulfilled,R.rejected))});var s=[];this.interceptors.response.forEach(function(R){s.push(R.fulfilled,R.rejected)});var o;if(!a){var f=[$e,void 0];for(Array.prototype.unshift.apply(f,n),f=f.concat(s),o=Promise.resolve(t);f.length;)o=o.then(f.shift(),f.shift());return o}for(var h=t;n.length;){var l=n.shift(),d=n.shift();try{h=l(h)}catch(u){d(u);break}}try{o=$e(h)}catch(u){return Promise.reject(u)}for(;s.length;)o=o.then(s.shift(),s.shift());return o};N.prototype.getUri=function(r){r=H(this.defaults,r);var t=lt(r.baseURL,r.url);return ft(t,r.params,r.paramsSerializer)};tr.forEach(["delete","get","head","options"],function(r){N.prototype[r]=function(t,i){return this.request(H(i||{},{method:r,url:t,data:(i||{}).data}))}});tr.forEach(["post","put","patch"],function(r){function t(i){return function(a,s,o){return this.request(H(o||{},{method:r,headers:i?{"Content-Type":"multipart/form-data"}:{},url:a,data:s}))}}N.prototype[r]=t(),N.prototype[r+"Form"]=t(!0)});var ct=N,ie,Fe;function dt(){if(Fe)return ie;Fe=1;var e=I();function r(t){if(typeof t!="function")throw new TypeError("executor must be a function.");var i;this.promise=new Promise(function(s){i=s});var n=this;this.promise.then(function(a){if(!!n._listeners){var s,o=n._listeners.length;for(s=0;s<o;s++)n._listeners[s](a);n._listeners=null}}),this.promise.then=function(a){var s,o=new Promise(function(f){n.subscribe(f),s=f}).then(a);return o.cancel=function(){n.unsubscribe(s)},o},t(function(s){n.reason||(n.reason=new e(s),i(n.reason))})}return r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.prototype.subscribe=function(i){if(this.reason){i(this.reason);return}this._listeners?this._listeners.push(i):this._listeners=[i]},r.prototype.unsubscribe=function(i){if(!!this._listeners){var n=this._listeners.indexOf(i);n!==-1&&this._listeners.splice(n,1)}},r.source=function(){var i,n=new r(function(s){i=s});return{token:n,cancel:i}},ie=r,ie}var ae,je;function ht(){return je||(je=1,ae=function(r){return function(i){return r.apply(null,i)}}),ae}var se,Ie;function pt(){if(Ie)return se;Ie=1;var e=v;return se=function(t){return e.isObject(t)&&t.isAxiosError===!0},se}var ke=v,vt=Me,$=ct,mt=er,Et=pe;function ir(e){var r=new $(e),t=vt($.prototype.request,r);return ke.extend(t,$.prototype,r),ke.extend(t,r),t.create=function(n){return ir(mt(e,n))},t}var m=ir(Et);m.Axios=$;m.CanceledError=I();m.CancelToken=dt();m.isCancel=Ze();m.VERSION=rr().version;m.toFormData=Ye;m.AxiosError=D;m.Cancel=m.CanceledError;m.all=function(r){return Promise.all(r)};m.spread=ht();m.isAxiosError=pt();ue.exports=m;ue.exports.default=m;(function(e){e.exports=ue.exports})(He);const Rt=cr(He.exports),bt=Rt.create({baseURL:fr}),wt=lr("StoryReaderStore",()=>{const e=B("en_US"),r=l=>{e.value=l},t=B(),i=l=>{t.value=l},n=B(),a=l=>{n.value=l},s=l=>{let d="";if(t.value){const u=t.value.story[l];if(u)return u!=null&&u.code?d=`${u.code}: ${u.name[e.value]||u.name.zh_CN}`:d=`${u.name[e.value]}`,d}},o=B();return{language:e,setLanguage:r,storySet:t,setStorySet:i,story:n,setStory:a,getStoryTitle:s,spreadsheet:o,setSpreadsheet:l=>{o.value=l},setSpreadsheetCurrentSheet:l=>{o.value&&(o.value.currentSheet=l)}}});export{bt as H,He as a,wt as u};