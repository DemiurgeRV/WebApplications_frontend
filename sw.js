if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const d=e=>i(e,t),l={module:{uri:t},exports:o,require:d};s[t]=Promise.all(n.map((e=>l[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-Ptaxnb_c.css",revision:null},{url:"assets/index-rJvvjeVM.js",revision:null},{url:"index.html",revision:"f7c2b756a35833755e50dddd34f72361"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"assets/icon/android-chrome-512x512.png",revision:"015294fea9707641a4ebcd29777d6fb6"},{url:"manifest.webmanifest",revision:"406ec211b952d8ff6f5efc2de4050461"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
