/*!
 * @rexxjs-meta=PYODIDE_ADDRESS_META
 */
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("url"), require("path"), require("child_process"), require("ws"), require("crypto"), require("vm"), require("fs"));
	else if(typeof define === 'function' && define.amd)
		define(["url", "path", "child_process", "ws", "crypto", "vm", "fs"], factory);
	else if(typeof exports === 'object')
		exports["pyodide-address"] = factory(require("url"), require("path"), require("child_process"), require("ws"), require("crypto"), require("vm"), require("fs"));
	else
		root["pyodide-address"] = factory(root["url"], root["path"], root["child_process"], root["ws"], root["crypto"], root["vm"], root["fs"]);
})(this, (__WEBPACK_EXTERNAL_MODULE_node_url__, __WEBPACK_EXTERNAL_MODULE_node_path__, __WEBPACK_EXTERNAL_MODULE_node_child_process__, __WEBPACK_EXTERNAL_MODULE_ws__, __WEBPACK_EXTERNAL_MODULE_node_crypto__, __WEBPACK_EXTERNAL_MODULE_node_vm__, __WEBPACK_EXTERNAL_MODULE_node_fs_promises__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/node_modules/pyodide lazy recursive":
/*!*********************************************************!*\
  !*** ./src/node_modules/pyodide/ lazy namespace object ***!
  \*********************************************************/
/***/ ((module) => {

eval("{function webpackEmptyAsyncContext(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(() => {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t});\n}\nwebpackEmptyAsyncContext.keys = () => ([]);\nwebpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;\nwebpackEmptyAsyncContext.id = \"./src/node_modules/pyodide lazy recursive\";\nmodule.exports = webpackEmptyAsyncContext;\n\n//# sourceURL=webpack://pyodide-address/./src/node_modules/pyodide/_lazy_namespace_object?\n}");

/***/ }),

/***/ "./src/node_modules/pyodide sync recursive":
/*!****************************************!*\
  !*** ./src/node_modules/pyodide/ sync ***!
  \****************************************/
/***/ ((module) => {

eval("{function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = () => ([]);\nwebpackEmptyContext.resolve = webpackEmptyContext;\nwebpackEmptyContext.id = \"./src/node_modules/pyodide sync recursive\";\nmodule.exports = webpackEmptyContext;\n\n//# sourceURL=webpack://pyodide-address/./src/node_modules/pyodide/_sync?\n}");

/***/ }),

/***/ "./src/node_modules/pyodide/pyodide.js":
/*!*********************************************!*\
  !*** ./src/node_modules/pyodide/pyodide.js ***!
  \*********************************************/
/***/ ((module, exports, __webpack_require__) => {

"use strict";
eval("{var __dirname = \"/\";\nvar loadPyodide=(()=>{var ne=Object.create;var O=Object.defineProperty;var re=Object.getOwnPropertyDescriptor;var oe=Object.getOwnPropertyNames;var ie=Object.getPrototypeOf,ae=Object.prototype.hasOwnProperty;var c=(e,t)=>O(e,\"name\",{value:t,configurable:!0}),p=(e=> true?__webpack_require__(\"./src/node_modules/pyodide sync recursive\"):0)(function(e){if(true)return __webpack_require__(\"./src/node_modules/pyodide sync recursive\").apply(this,arguments);// removed by dead control flow\n});var se=(e,t)=>{for(var o in t)O(e,o,{get:t[o],enumerable:!0})},$=(e,t,o,r)=>{if(t&&typeof t==\"object\"||typeof t==\"function\")for(let a of oe(t))!ae.call(e,a)&&a!==o&&O(e,a,{get:()=>t[a],enumerable:!(r=re(t,a))||r.enumerable});return e};var b=(e,t,o)=>(o=e!=null?ne(ie(e)):{},$(t||!e||!e.__esModule?O(o,\"default\",{value:e,enumerable:!0}):o,e)),ce=e=>$(O({},\"__esModule\",{value:!0}),e);var Oe={};se(Oe,{loadPyodide:()=>B,version:()=>k});function le(e){return!isNaN(parseFloat(e))&&isFinite(e)}c(le,\"_isNumber\");function w(e){return e.charAt(0).toUpperCase()+e.substring(1)}c(w,\"_capitalize\");function L(e){return function(){return this[e]}}c(L,\"_getter\");var _=[\"isConstructor\",\"isEval\",\"isNative\",\"isToplevel\"],F=[\"columnNumber\",\"lineNumber\"],R=[\"fileName\",\"functionName\",\"source\"],de=[\"args\"],ue=[\"evalOrigin\"],x=_.concat(F,R,de,ue);function g(e){if(e)for(var t=0;t<x.length;t++)e[x[t]]!==void 0&&this[\"set\"+w(x[t])](e[x[t]])}c(g,\"StackFrame\");g.prototype={getArgs:function(){return this.args},setArgs:function(e){if(Object.prototype.toString.call(e)!==\"[object Array]\")throw new TypeError(\"Args must be an Array\");this.args=e},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(e){if(e instanceof g)this.evalOrigin=e;else if(e instanceof Object)this.evalOrigin=new g(e);else throw new TypeError(\"Eval Origin must be an Object or StackFrame\")},toString:function(){var e=this.getFileName()||\"\",t=this.getLineNumber()||\"\",o=this.getColumnNumber()||\"\",r=this.getFunctionName()||\"\";return this.getIsEval()?e?\"[eval] (\"+e+\":\"+t+\":\"+o+\")\":\"[eval]:\"+t+\":\"+o:r?r+\" (\"+e+\":\"+t+\":\"+o+\")\":e+\":\"+t+\":\"+o}};g.fromString=c(function(t){var o=t.indexOf(\"(\"),r=t.lastIndexOf(\")\"),a=t.substring(0,o),n=t.substring(o+1,r).split(\",\"),i=t.substring(r+1);if(i.indexOf(\"@\")===0)var s=/@(.+?)(?::(\\d+))?(?::(\\d+))?$/.exec(i,\"\"),l=s[1],d=s[2],u=s[3];return new g({functionName:a,args:n||void 0,fileName:l,lineNumber:d||void 0,columnNumber:u||void 0})},\"StackFrame$$fromString\");for(h=0;h<_.length;h++)g.prototype[\"get\"+w(_[h])]=L(_[h]),g.prototype[\"set\"+w(_[h])]=function(e){return function(t){this[e]=!!t}}(_[h]);var h;for(E=0;E<F.length;E++)g.prototype[\"get\"+w(F[E])]=L(F[E]),g.prototype[\"set\"+w(F[E])]=function(e){return function(t){if(!le(t))throw new TypeError(e+\" must be a Number\");this[e]=Number(t)}}(F[E]);var E;for(S=0;S<R.length;S++)g.prototype[\"get\"+w(R[S])]=L(R[S]),g.prototype[\"set\"+w(R[S])]=function(e){return function(t){this[e]=String(t)}}(R[S]);var S,A=g;function fe(){var e=/^\\s*at .*(\\S+:\\d+|\\(native\\))/m,t=/^(eval@)?(\\[native code])?$/;return{parse:c(function(r){if(r.stack&&r.stack.match(e))return this.parseV8OrIE(r);if(r.stack)return this.parseFFOrSafari(r);throw new Error(\"Cannot parse given Error object\")},\"ErrorStackParser$$parse\"),extractLocation:c(function(r){if(r.indexOf(\":\")===-1)return[r];var a=/(.+?)(?::(\\d+))?(?::(\\d+))?$/,n=a.exec(r.replace(/[()]/g,\"\"));return[n[1],n[2]||void 0,n[3]||void 0]},\"ErrorStackParser$$extractLocation\"),parseV8OrIE:c(function(r){var a=r.stack.split(`\n`).filter(function(n){return!!n.match(e)},this);return a.map(function(n){n.indexOf(\"(eval \")>-1&&(n=n.replace(/eval code/g,\"eval\").replace(/(\\(eval at [^()]*)|(,.*$)/g,\"\"));var i=n.replace(/^\\s+/,\"\").replace(/\\(eval code/g,\"(\").replace(/^.*?\\s+/,\"\"),s=i.match(/ (\\(.+\\)$)/);i=s?i.replace(s[0],\"\"):i;var l=this.extractLocation(s?s[1]:i),d=s&&i||void 0,u=[\"eval\",\"<anonymous>\"].indexOf(l[0])>-1?void 0:l[0];return new A({functionName:d,fileName:u,lineNumber:l[1],columnNumber:l[2],source:n})},this)},\"ErrorStackParser$$parseV8OrIE\"),parseFFOrSafari:c(function(r){var a=r.stack.split(`\n`).filter(function(n){return!n.match(t)},this);return a.map(function(n){if(n.indexOf(\" > eval\")>-1&&(n=n.replace(/ line (\\d+)(?: > eval line \\d+)* > eval:\\d+:\\d+/g,\":$1\")),n.indexOf(\"@\")===-1&&n.indexOf(\":\")===-1)return new A({functionName:n});var i=/((.*\".+\"[^@]*)?[^@]*)(?:@)/,s=n.match(i),l=s&&s[1]?s[1]:void 0,d=this.extractLocation(n.replace(i,\"\"));return new A({functionName:l,fileName:d[0],lineNumber:d[1],columnNumber:d[2],source:n})},this)},\"ErrorStackParser$$parseFFOrSafari\")}}c(fe,\"ErrorStackParser\");var me=new fe;var j=me;var y=typeof process==\"object\"&&typeof process.versions==\"object\"&&typeof process.versions.node==\"string\"&&!process.browser,T=y&&\"object\"<\"u\"&&typeof module.exports<\"u\"&&typeof p<\"u\"&&typeof __dirname<\"u\",H=y&&!T,Le=typeof globalThis.Bun<\"u\",pe=typeof Deno<\"u\",V=!y&&!pe,z=V&&typeof window==\"object\"&&typeof document==\"object\"&&typeof document.createElement==\"function\"&&\"sessionStorage\"in window&&typeof importScripts!=\"function\",q=V&&typeof importScripts==\"function\"&&typeof self==\"object\",Te=typeof navigator==\"object\"&&typeof navigator.userAgent==\"string\"&&navigator.userAgent.indexOf(\"Chrome\")==-1&&navigator.userAgent.indexOf(\"Safari\")>-1;var K,U,Y,J,C;async function M(){if(!y||(K=(await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! node:url */ \"node:url\", 23))).default,J=await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! node:fs */ \"node:fs/promises\", 23)),C=await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! node:fs/promises */ \"node:fs/promises\", 23)),Y=(await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! node:vm */ \"node:vm\", 23))).default,U=await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! node:path */ \"node:path\", 23)),W=U.sep,typeof p<\"u\"))return;let e=J,t=await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! node:crypto */ \"node:crypto\", 23)),o=await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! ws */ \"ws\", 23)),r=await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! node:child_process */ \"node:child_process\", 23)),a={fs:e,crypto:t,ws:o,child_process:r};globalThis.require=function(n){return a[n]}}c(M,\"initNodeModules\");function ge(e,t){return U.resolve(t||\".\",e)}c(ge,\"node_resolvePath\");function ye(e,t){return t===void 0&&(t=location),new URL(e,t).toString()}c(ye,\"browser_resolvePath\");var D;y?D=ge:D=ye;var W;y||(W=\"/\");function be(e,t){return e.startsWith(\"file://\")&&(e=e.slice(7)),e.includes(\"://\")?{response:fetch(e)}:{binary:C.readFile(e).then(o=>new Uint8Array(o.buffer,o.byteOffset,o.byteLength))}}c(be,\"node_getBinaryResponse\");function ve(e,t){let o=new URL(e,location);return{response:fetch(o,t?{integrity:t}:{})}}c(ve,\"browser_getBinaryResponse\");var P;y?P=be:P=ve;async function G(e,t){let{response:o,binary:r}=P(e,t);if(r)return r;let a=await o;if(!a.ok)throw new Error(`Failed to load '${e}': request failed.`);return new Uint8Array(await a.arrayBuffer())}c(G,\"loadBinaryFile\");var I;if(z)I=c(async e=>await __webpack_require__(\"./src/node_modules/pyodide lazy recursive\")(e),\"loadScript\");else if(q)I=c(async e=>{try{globalThis.importScripts(e)}catch(t){if(t instanceof TypeError)await __webpack_require__(\"./src/node_modules/pyodide lazy recursive\")(e);else throw t}},\"loadScript\");else if(y)I=he;else throw new Error(\"Cannot determine runtime environment\");async function he(e){e.startsWith(\"file://\")&&(e=e.slice(7)),e.includes(\"://\")?Y.runInThisContext(await(await fetch(e)).text()):await __webpack_require__(\"./src/node_modules/pyodide lazy recursive\")(K.pathToFileURL(e).href)}c(he,\"nodeLoadScript\");async function X(e){if(y){await M();let t=await C.readFile(e,{encoding:\"utf8\"});return JSON.parse(t)}else return await(await fetch(e)).json()}c(X,\"loadLockFile\");async function Q(){if(T)return __dirname;let e;try{throw new Error}catch(r){e=r}let t=j.parse(e)[0].fileName;if(y&&!t.startsWith(\"file://\")&&(t=`file://${t}`),H){let r=await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! node:path */ \"node:path\", 23));return(await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! node:url */ \"node:url\", 23))).fileURLToPath(r.dirname(t))}let o=t.lastIndexOf(W);if(o===-1)throw new Error(\"Could not extract indexURL path from pyodide module location\");return t.slice(0,o)}c(Q,\"calculateDirname\");function Z(e){let t=e.FS,o=e.FS.filesystems.MEMFS,r=e.PATH,a={DIR_MODE:16895,FILE_MODE:33279,mount:function(n){if(!n.opts.fileSystemHandle)throw new Error(\"opts.fileSystemHandle is required\");return o.mount.apply(null,arguments)},syncfs:async(n,i,s)=>{try{let l=a.getLocalSet(n),d=await a.getRemoteSet(n),u=i?d:l,m=i?l:d;await a.reconcile(n,u,m),s(null)}catch(l){s(l)}},getLocalSet:n=>{let i=Object.create(null);function s(u){return u!==\".\"&&u!==\"..\"}c(s,\"isRealDir\");function l(u){return m=>r.join2(u,m)}c(l,\"toAbsolute\");let d=t.readdir(n.mountpoint).filter(s).map(l(n.mountpoint));for(;d.length;){let u=d.pop(),m=t.stat(u);t.isDir(m.mode)&&d.push.apply(d,t.readdir(u).filter(s).map(l(u))),i[u]={timestamp:m.mtime,mode:m.mode}}return{type:\"local\",entries:i}},getRemoteSet:async n=>{let i=Object.create(null),s=await Ee(n.opts.fileSystemHandle);for(let[l,d]of s)l!==\".\"&&(i[r.join2(n.mountpoint,l)]={timestamp:d.kind===\"file\"?(await d.getFile()).lastModifiedDate:new Date,mode:d.kind===\"file\"?a.FILE_MODE:a.DIR_MODE});return{type:\"remote\",entries:i,handles:s}},loadLocalEntry:n=>{let s=t.lookupPath(n).node,l=t.stat(n);if(t.isDir(l.mode))return{timestamp:l.mtime,mode:l.mode};if(t.isFile(l.mode))return s.contents=o.getFileDataAsTypedArray(s),{timestamp:l.mtime,mode:l.mode,contents:s.contents};throw new Error(\"node type not supported\")},storeLocalEntry:(n,i)=>{if(t.isDir(i.mode))t.mkdirTree(n,i.mode);else if(t.isFile(i.mode))t.writeFile(n,i.contents,{canOwn:!0});else throw new Error(\"node type not supported\");t.chmod(n,i.mode),t.utime(n,i.timestamp,i.timestamp)},removeLocalEntry:n=>{var i=t.stat(n);t.isDir(i.mode)?t.rmdir(n):t.isFile(i.mode)&&t.unlink(n)},loadRemoteEntry:async n=>{if(n.kind===\"file\"){let i=await n.getFile();return{contents:new Uint8Array(await i.arrayBuffer()),mode:a.FILE_MODE,timestamp:i.lastModifiedDate}}else{if(n.kind===\"directory\")return{mode:a.DIR_MODE,timestamp:new Date};throw new Error(\"unknown kind: \"+n.kind)}},storeRemoteEntry:async(n,i,s)=>{let l=n.get(r.dirname(i)),d=t.isFile(s.mode)?await l.getFileHandle(r.basename(i),{create:!0}):await l.getDirectoryHandle(r.basename(i),{create:!0});if(d.kind===\"file\"){let u=await d.createWritable();await u.write(s.contents),await u.close()}n.set(i,d)},removeRemoteEntry:async(n,i)=>{await n.get(r.dirname(i)).removeEntry(r.basename(i)),n.delete(i)},reconcile:async(n,i,s)=>{let l=0,d=[];Object.keys(i.entries).forEach(function(f){let v=i.entries[f],N=s.entries[f];(!N||t.isFile(v.mode)&&v.timestamp.getTime()>N.timestamp.getTime())&&(d.push(f),l++)}),d.sort();let u=[];if(Object.keys(s.entries).forEach(function(f){i.entries[f]||(u.push(f),l++)}),u.sort().reverse(),!l)return;let m=i.type===\"remote\"?i.handles:s.handles;for(let f of d){let v=r.normalize(f.replace(n.mountpoint,\"/\")).substring(1);if(s.type===\"local\"){let N=m.get(v),te=await a.loadRemoteEntry(N);a.storeLocalEntry(f,te)}else{let N=a.loadLocalEntry(f);await a.storeRemoteEntry(m,v,N)}}for(let f of u)if(s.type===\"local\")a.removeLocalEntry(f);else{let v=r.normalize(f.replace(n.mountpoint,\"/\")).substring(1);await a.removeRemoteEntry(m,v)}}};e.FS.filesystems.NATIVEFS_ASYNC=a}c(Z,\"initializeNativeFS\");var Ee=c(async e=>{let t=[];async function o(a){for await(let n of a.values())t.push(n),n.kind===\"directory\"&&await o(n)}c(o,\"collect\"),await o(e);let r=new Map;r.set(\".\",e);for(let a of t){let n=(await e.resolve(a)).join(\"/\");r.set(n,a)}return r},\"getFsHandles\");function ee(e){let t={noImageDecoding:!0,noAudioDecoding:!0,noWasmDecoding:!1,preRun:Fe(e),quit(o,r){throw t.exited={status:o,toThrow:r},r},print:e.stdout,printErr:e.stderr,arguments:e.args,API:{config:e},locateFile:o=>e.indexURL+o,instantiateWasm:Re(e.indexURL)};return t}c(ee,\"createSettings\");function Se(e){return function(t){let o=\"/\";try{t.FS.mkdirTree(e)}catch(r){console.error(`Error occurred while making a home directory '${e}':`),console.error(r),console.error(`Using '${o}' for a home directory instead`),e=o}t.FS.chdir(e)}}c(Se,\"createHomeDirectory\");function we(e){return function(t){Object.assign(t.ENV,e)}}c(we,\"setEnvironment\");function Ne(e){return t=>{for(let o of e)t.FS.mkdirTree(o),t.FS.mount(t.FS.filesystems.NODEFS,{root:o},o)}}c(Ne,\"mountLocalDirectories\");function _e(e){let t=G(e);return o=>{let r=o._py_version_major(),a=o._py_version_minor();o.FS.mkdirTree(\"/lib\"),o.FS.mkdirTree(`/lib/python${r}.${a}/site-packages`),o.addRunDependency(\"install-stdlib\"),t.then(n=>{o.FS.writeFile(`/lib/python${r}${a}.zip`,n)}).catch(n=>{console.error(\"Error occurred while installing the standard library:\"),console.error(n)}).finally(()=>{o.removeRunDependency(\"install-stdlib\")})}}c(_e,\"installStdlib\");function Fe(e){let t;return e.stdLibURL!=null?t=e.stdLibURL:t=e.indexURL+\"python_stdlib.zip\",[_e(t),Se(e.env.HOME),we(e.env),Ne(e._node_mounts),Z]}c(Fe,\"getFileSystemInitializationFuncs\");function Re(e){let{binary:t,response:o}=P(e+\"pyodide.asm.wasm\");return function(r,a){return async function(){try{let n;o?n=await WebAssembly.instantiateStreaming(o,r):n=await WebAssembly.instantiate(await t,r);let{instance:i,module:s}=n;typeof WasmOffsetConverter<\"u\"&&(wasmOffsetConverter=new WasmOffsetConverter(wasmBinary,s)),a(i,s)}catch(n){console.warn(\"wasm instantiation failed!\"),console.warn(n)}}(),{}}}c(Re,\"getInstantiateWasmFunc\");var k=\"0.26.4\";async function B(e={}){var u,m;await M();let t=e.indexURL||await Q();t=D(t),t.endsWith(\"/\")||(t+=\"/\"),e.indexURL=t;let o={fullStdLib:!1,jsglobals:globalThis,stdin:globalThis.prompt?globalThis.prompt:void 0,lockFileURL:t+\"pyodide-lock.json\",args:[],_node_mounts:[],env:{},packageCacheDir:t,packages:[],enableRunUntilComplete:!1,checkAPIVersion:!0},r=Object.assign(o,e);(u=r.env).HOME??(u.HOME=\"/home/pyodide\"),(m=r.env).PYTHONINSPECT??(m.PYTHONINSPECT=\"1\");let a=ee(r),n=a.API;if(n.lockFilePromise=X(r.lockFileURL),typeof _createPyodideModule!=\"function\"){let f=`${r.indexURL}pyodide.asm.js`;await I(f)}let i;if(e._loadSnapshot){let f=await e._loadSnapshot;ArrayBuffer.isView(f)?i=f:i=new Uint8Array(f),a.noInitialRun=!0,a.INITIAL_MEMORY=i.length}let s=await _createPyodideModule(a);if(a.exited)throw a.exited.toThrow;if(e.pyproxyToStringRepr&&n.setPyProxyToStringMethod(!0),n.version!==k&&r.checkAPIVersion)throw new Error(`Pyodide version does not match: '${k}' <==> '${n.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);s.locateFile=f=>{throw new Error(\"Didn't expect to load any more file_packager files!\")};let l;i&&(l=n.restoreSnapshot(i));let d=n.finalizeBootstrap(l);return n.sys.path.insert(0,n.config.env.HOME),d.version.includes(\"dev\")||n.setCdnUrl(`https://cdn.jsdelivr.net/pyodide/v${d.version}/full/`),n._pyodide.set_excepthook(),await n.packageIndexReady,n.initializeStreams(r.stdin,r.stdout,r.stderr),d}c(B,\"loadPyodide\");globalThis.loadPyodide=B;return ce(Oe);})();\ntry{Object.assign(exports,loadPyodide)}catch(_){}\nglobalThis.loadPyodide=loadPyodide.loadPyodide;\n//# sourceMappingURL=pyodide.js.map\n\n\n//# sourceURL=webpack://pyodide-address/./src/node_modules/pyodide/pyodide.js?\n}");

/***/ }),

/***/ "./src/pyodide-address.js":
/*!********************************!*\
  !*** ./src/pyodide-address.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("{/*!\n * rexxjs/pyodide-address v1.2.0 | (c) 2025 RexxJS Project | MIT License\n * @rexxjs-meta=PYODIDE_ADDRESS_META\n */\n/**\n * Pyodide ADDRESS Library - Provides Python execution via ADDRESS interface\n * This is an ADDRESS target library, not a functions library\n *\n * Usage:\n *   REQUIRE \"pyodide-address\"\n *   ADDRESS PYODIDE\n *   LET result = run code=\"print('Hello, World!')\"\n *\n * Copyright (c) 2025 RexxJS Project\n * Licensed under the MIT License\n */\n\n// Import pyodide if available\nlet pyodide = null;\nlet pyodideVersion = null;\ntry {\n  if (true) {\n    pyodide = __webpack_require__(/*! pyodide */ \"./src/node_modules/pyodide/pyodide.js\");\n    if (pyodide && pyodide.version) {\n      pyodideVersion = pyodide.version;\n    }\n  } else // removed by dead control flow\n{}\n} catch (e) {\n  // Pyodide is expected to be loaded externally\n}\n\nlet pyodideInstance = null;\nlet pyodideLoadingPromise = null;\nconst pyodideContext = new Map();\n\n// Function to initialize Pyodide\nasync function getPyodide() {\n    if (pyodideInstance) {\n        return pyodideInstance;\n    }\n\n    if (pyodideLoadingPromise) {\n        return pyodideLoadingPromise;\n    }\n\n    // New API (v0.20+)\n    console.log(\"Loading Pyodide...\");\n    pyodideLoadingPromise = pyodide.loadPyodide();\n\n    pyodideInstance = await pyodideLoadingPromise;\n    console.log(\"Pyodide loaded successfully.\");\n    pyodideLoadingPromise = null;\n    return pyodideInstance;\n}\n\n\n// Pyodide ADDRESS metadata function\nfunction PYODIDE_ADDRESS_META() {\n  // Pyodide works in both Node.js and browser environments\n  return {\n    canonical: \"org.rexxjs/pyodide-address\",\n    type: 'address-handler',\n    name: 'Pyodide Execution Service',\n    version: '1.2.0',\n    description: 'Python execution via ADDRESS interface using Pyodide',\n    provides: {\n      addressTarget: 'pyodide',\n      handlerFunction: 'ADDRESS_PYODIDE_HANDLER',\n      commandSupport: true,\n      methodSupport: true\n    },\n    dependencies: {},\n    envVars: [],\n    loaded: true,\n    requirements: {\n      environment: 'both',  // Works in both Node.js and browser\n      modules: ['pyodide']\n    },\n    pyodideAvailable: typeof pyodide !== 'undefined',\n    pyodideVersion: typeof pyodideVersion !== 'undefined' ? pyodideVersion : null\n  };\n}\n\n// Registry-style detection function for \"org.rexxjs/pyodide-address\"\nfunction ORG_REXXJS_PYODIDE_ADDRESS_META() {\n  return PYODIDE_ADDRESS_META();\n}\n\n// ADDRESS target handler function\nasync function ADDRESS_PYODIDE_HANDLER(method, params) {\n  const pyodide = await getPyodide();\n\n  try {\n    let result;\n    // Handle command-string style\n    if (typeof method === 'string' && !params) {\n        if (method.trim().startsWith('load_package')) {\n            const packages = method.trim().substring('load_package'.length).trim();\n            if (!packages) {\n                throw new Error('No packages specified for load_package.');\n            }\n            await pyodide.loadPackage(packages.split(',').map(p => p.trim()));\n            return { success: true, output: `Package(s) '${packages}' loaded.` };\n        }\n\n        result = await pyodide.runPythonAsync(method);\n        return {\n            success: true,\n            result: result,\n            output: result,\n            errorCode: 0\n        };\n    }\n\n    switch (method.toLowerCase()) {\n      case 'run':\n      case 'exec':\n        const code = params.code || params.script;\n        if (typeof code !== 'string') {\n          throw new Error('The \"code\" parameter must be a string.');\n        }\n        // Set context variables\n        for (const [key, value] of pyodideContext.entries()) {\n          pyodide.globals.set(key, value);\n        }\n        \n        // Capture stdout from print statements\n        const captureCode = `\nimport sys\nfrom io import StringIO\n\n# Capture stdout\nold_stdout = sys.stdout\nsys.stdout = captured_output = StringIO()\n\n# Execute the user code\n${code}\n\n# Get the captured output and restore stdout\ncaptured_text = captured_output.getvalue()\nsys.stdout = old_stdout\n\n# Return the captured output\ncaptured_text\n`;\n        \n        result = await pyodide.runPythonAsync(captureCode);\n        return {\n            success: true,\n            result: result,\n            output: result || '',\n            errorCode: 0\n        };\n      case 'execute':\n        const command = params.command;\n        if (typeof command !== 'string') {\n          throw new Error('The \"command\" parameter must be a string.');\n        }\n        \n        // Check if command contains load_package - handle specially for package loading\n        if (command.includes('load_package')) {\n            // Split into lines and handle load_package lines first\n            const lines = command.split('\\n').map(line => line.trim()).filter(line => line.length > 0);\n            const loadPackageLines = lines.filter(line => line.startsWith('load_package'));\n            const pythonLines = lines.filter(line => !line.startsWith('load_package'));\n            \n            // Load packages first\n            for (const line of loadPackageLines) {\n                const packages = line.substring('load_package'.length).trim();\n                if (packages) {\n                    await pyodide.loadPackage(packages.split(',').map(p => p.trim()));\n                }\n            }\n            \n            // Execute remaining Python code as a single script if any\n            if (pythonLines.length > 0) {\n                const pythonScript = pythonLines.join('\\n');\n                // Set context variables\n                for (const [key, value] of pyodideContext.entries()) {\n                  pyodide.globals.set(key, value);\n                }\n                result = await pyodide.runPythonAsync(pythonScript);\n            } else {\n                result = 'Package(s) loaded successfully.';\n            }\n        } else {\n            // No package loading - execute the entire command as multi-line Python script\n            // Set context variables\n            for (const [key, value] of pyodideContext.entries()) {\n              pyodide.globals.set(key, value);\n            }\n            result = await pyodide.runPythonAsync(command);\n        }\n        \n        return {\n            success: true,\n            result: result,\n            output: result,\n            errorCode: 0\n        };\n      case 'run_file':\n        const file = params.file;\n        if (typeof file !== 'string') {\n          throw new Error('The \"file\" parameter must be a string.');\n        }\n        const response = await fetch(file);\n        const pythonCode = await response.text();\n        result = await pyodide.runPythonAsync(pythonCode);\n        return {\n            success: true,\n            result: result,\n            output: result,\n            errorCode: 0\n        };\n      case 'status':\n        const loadedPackages = pyodide.loadedPackages;\n        const contextKeys = Array.from(pyodideContext.keys());\n        return {\n            success: true,\n            result: {\n                pyodideVersion: pyodide.version,\n                status: 'loaded',\n                loadedPackages: loadedPackages,\n                contextKeys: contextKeys\n            },\n            output: 'loaded',\n            errorCode: 0\n        };\n      case 'set_context':\n        const key = params.key;\n        const value = params.value;\n        if (typeof key !== 'string') {\n          throw new Error('The \"key\" parameter must be a string.');\n        }\n        pyodideContext.set(key, value);\n        return { success: true, output: `Context variable '${key}' set.` };\n      case 'get_context':\n        const getKey = params.key;\n        if (typeof getKey !== 'string') {\n          throw new Error('The \"key\" parameter must be a string.');\n        }\n        return { success: true, result: pyodideContext.get(getKey) };\n      case 'clear_context':\n        pyodideContext.clear();\n        return { success: true, output: 'Context cleared.' };\n      case 'new_session':\n      case 'reset_session':\n        // Clear Python globals (reset the Python namespace)\n        await pyodide.runPythonAsync(`\nimport sys\n# Get all variable names in globals\nvars_to_delete = [name for name in globals() if not name.startswith('__')]\n# Delete each user-defined variable\nfor name in vars_to_delete:\n    del globals()[name]\n`);\n        // Clear our context map\n        pyodideContext.clear();\n        return { success: true, output: 'New Python session started. All variables cleared.' };\n      case 'close_session':\n        // Clear Python globals\n        await pyodide.runPythonAsync(`\nimport sys\n# Get all variable names in globals\nvars_to_delete = [name for name in globals() if not name.startswith('__')]\n# Delete each user-defined variable  \nfor name in vars_to_delete:\n    del globals()[name]\n`);\n        // Clear our context map\n        pyodideContext.clear();\n        return { success: true, output: 'Python session closed. All variables cleared.' };\n      case 'list_variables':\n      case 'session_info':\n        // Get current Python variables\n        const pythonVars = await pyodide.runPythonAsync(`\n[name for name in globals() if not name.startswith('__')]\n`);\n        const contextVars = Array.from(pyodideContext.keys());\n        return { \n          success: true, \n          result: {\n            pythonVariables: pythonVars,\n            contextVariables: contextVars,\n            totalVariables: pythonVars.length + contextVars.length\n          }\n        };\n      default:\n        throw new Error(`Unsupported method: ${method}`);\n    }\n  } catch (error) {\n    return {\n        success: false,\n        result: null,\n        error: error.message,\n        output: '',\n        errorMessage: error.message,\n        errorCode: 1,\n    };\n  }\n}\n\n// ADDRESS target methods metadata\nconst ADDRESS_PYODIDE_METHODS = {\n  run: {\n    description: \"Execute a Python script.\",\n    params: [\"code\"],\n    returns: \"The result of the Python script.\"\n  },\n  exec: {\n    description: \"Alias for 'run'.\",\n    params: [\"code\"],\n    returns: \"The result of the Python script.\"\n  },\n  run_file: {\n    description: \"Execute a Python script from a file.\",\n    params: [\"file\"],\n    returns: \"The result of the Python script.\"\n  },\n  status: {\n    description: \"Get the status of the Pyodide service.\",\n    params: [],\n    returns: \"An object with status information.\"\n  },\n  set_context: {\n    description: \"Set a variable in the Python context.\",\n    params: [\"key\", \"value\"],\n    returns: \"Status message.\"\n  },\n  get_context: {\n    description: \"Get a variable from the Python context.\",\n    params: [\"key\"],\n    returns: \"The value of the variable.\"\n  },\n  clear_context: {\n    description: \"Clear all variables from the Python context.\",\n    params: [],\n    returns: \"Status message.\"\n  },\n  new_session: {\n    description: \"Start a new Python session, clearing all variables.\",\n    params: [],\n    returns: \"Status message.\"\n  },\n  reset_session: {\n    description: \"Alias for 'new_session'.\",\n    params: [],\n    returns: \"Status message.\"\n  },\n  close_session: {\n    description: \"Close the current Python session, clearing all variables.\",\n    params: [],\n    returns: \"Status message.\"\n  },\n  list_variables: {\n    description: \"List all variables in the current Python session.\",\n    params: [],\n    returns: \"Object with variable information.\"\n  },\n  session_info: {\n    description: \"Alias for 'list_variables'.\",\n    params: [],\n    returns: \"Object with variable information.\"\n  },\n  execute: {\n    description: \"Execute a Python command (used by quoted strings in Rexx).\",\n    params: [\"command\"],\n    returns: \"The result of the Python command.\"\n  }\n};\n\n// Export to global scope\nif (typeof window !== 'undefined') {\n  window.PYODIDE_ADDRESS_META = PYODIDE_ADDRESS_META;\n  window.ORG_REXXJS_PYODIDE_ADDRESS_META = ORG_REXXJS_PYODIDE_ADDRESS_META;\n  window.ADDRESS_PYODIDE_HANDLER = ADDRESS_PYODIDE_HANDLER;\n  window.ADDRESS_PYODIDE_METHODS = ADDRESS_PYODIDE_METHODS;\n} else if (typeof __webpack_require__.g !== 'undefined') {\n  __webpack_require__.g.PYODIDE_ADDRESS_META = PYODIDE_ADDRESS_META;\n  __webpack_require__.g.ORG_REXXJS_PYODIDE_ADDRESS_META = ORG_REXXJS_PYODIDE_ADDRESS_META;\n  __webpack_require__.g.ADDRESS_PYODIDE_HANDLER = ADDRESS_PYODIDE_HANDLER;\n  __webpack_require__.g.ADDRESS_PYODIDE_METHODS = ADDRESS_PYODIDE_METHODS;\n}\n\n\n//# sourceURL=webpack://pyodide-address/./src/pyodide-address.js?\n}");

/***/ }),

/***/ "node:child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_node_child_process__;

/***/ }),

/***/ "node:crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_node_crypto__;

/***/ }),

/***/ "node:fs/promises":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_node_fs_promises__;

/***/ }),

/***/ "node:path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_node_path__;

/***/ }),

/***/ "node:url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_node_url__;

/***/ }),

/***/ "node:vm":
/*!*********************!*\
  !*** external "vm" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_node_vm__;

/***/ }),

/***/ "ws":
/*!*********************!*\
  !*** external "ws" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_ws__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; (typeof current == 'object' || typeof current == 'function') && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/pyodide-address.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});