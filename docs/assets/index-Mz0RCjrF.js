var J=Object.defineProperty;var Q=(t,e,i)=>e in t?J(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var c=(t,e,i)=>(Q(t,typeof e!="symbol"?e+"":e,i),i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(s){if(s.ep)return;s.ep=!0;const l=i(s);fetch(s.href,l)}})();const S=180,w=32;class V{constructor(e,i){c(this,"x",0);c(this,"y",0);c(this,"angle",0);this.x=e,this.y=i}dir(){return[Math.cos(this.angle),-Math.sin(this.angle)]}}const $=`
######################################
#   #       #       #     #    ##    #
#   #   #   #       ###   #   #      #
#   #   #   #   ##  #     #   #  #   #
#       #   #    #  ####  ###  ##    #
#########   #    ##                  #
#           # ##  #   ###########    #
###  ########  #  #  #           #   #
#    #         #### #  ##    ##  #   #
###  #  ####     ## #  ##    ##  #   #
#    #  #  ##     #              #   #
#  ###  #   ##    # #  #      #  #   #
#  #    ##   #    # #   ######   #   #
#  #      #  #  ###  #          #    #
#  # # #  #      #    ##########     #
#         #                          #
######################################
`,ee=$.trim().split(`
`).map(t=>t.split("").map(e=>e=="#"?1:0));class te{constructor(){c(this,"tiles");c(this,"width");c(this,"height");this.tiles=ee,this.width=this.tiles[0].length,this.height=this.tiles.length}}class ie{constructor(e){c(this,"tela");c(this,"pixels");let i=document.getElementById(e);if(i==null)throw"elemento não encontrado";this.tela=i,this.pixels=Array.from({length:w},n=>Array.from({length:S},()=>"#"))}cls(){for(let e of this.pixels)for(let i=0;i<S;i++)e[i]=" "}flip(){this.tela.innerText=this.pixels.map(e=>e.join("")).join(`
`)}render(e,i){let n=0;const s="isso é só um div cheio de texto! ",l=s.length;function a(){return n++,n==l&&(n=0),s[n]}this.cls();let A=e.tiles.length,T=e.tiles[0].length;const[d,f]=i.dir(),[X,D]=[i.x,i.y],R=1.1,[U,Z]=[-f*R,d*R];e:for(let M=0;M<S;M++){const W=-1+M/S*2,u=d+U*W,p=f+Z*W;let g=X|0,y=D|0,P=0,Y=0;const _=Math.sqrt(1+p*p/(u*u)),B=Math.sqrt(1+u*u/(p*p));let m=0,I=0,L=0,C=!1,F=0;for(u<0?(I=-1,P=(X-g)*_):(I=1,P=(g+1-X)*_),p<0?(L=-1,Y=(D-y)*B):(L=1,Y=(y+1-D)*B);!C;){if(P<Y?(P+=_,g+=I,F=0):(Y+=B,y+=L,F=1),y<0||g<0||y>=A||g>=T)continue e;e.tiles[y][g]>0&&(C=!0)}m=Math.abs(F?(y-D+(1-L)/2)/p:(g-X+(1-I)/2)/u);let K=w/m/2,b=-K+w/2|0,O=K+w/2|0,E;F==0?E=D+m*p:E=X+m*u,E-=Math.floor(E),b>0&&b<w&&(this.pixels[b][M]="▄");const z=E<.025||E>.975;for(let N=Math.max(1,b+1);N<Math.min(w-1,O);N++)this.pixels[N][M]=z?"▀":m>4?m>8?m>16?"█":"░":a():" ";O>0&&O<w&&(this.pixels[O][M]="▀")}this.flip()}}const v=.05,j=.025;let k=new ie("app"),x=new te,r=new V(35,8);const h={};document.addEventListener("keydown",t=>{h[t.key]=!0});document.addEventListener("keyup",t=>{h[t.key]=!1});const H=document.getElementById("minimap"),o=5;H.width=x.width*o;H.height=x.height*o;function se(t,e,i){t.clearRect(0,0,o*e.width,o*e.height);let n=e.height,s=e.width;t.fillStyle="#FFBF00",t.strokeStyle="#FFBF00";for(let d=0;d<s;d++)for(let f=0;f<n;f++)e.tiles[f][d]&&t.fillRect(d*o,f*o,o,o);let[l,a]=[i.x*o,i.y*o],[A,T]=i.dir();t.lineWidth=1,t.beginPath(),t.arc(l,a,o/2,0,2*Math.PI),t.stroke(),t.beginPath(),t.moveTo(l,a),t.lineTo(l+A*20,a+T*20),t.stroke()}const q=H.getContext("2d");if(!q)throw"cade o contexto?";function G(){let t=0,e=0,[i,n]=r.dir();h.w&&(t+=i*v,e+=n*v),h.s&&(t-=i*v,e-=n*v),x.tiles[r.y|0][r.x+t|0]&&(t=0),x.tiles[r.y+e|0][r.x|0]&&(e=0),r.x+=t,r.y+=e,h.a&&(r.angle+=j),h.d&&(r.angle-=j),(h.w||h.s||h.a||h.d)&&k.render(x,r),q&&se(q,x,r),requestAnimationFrame(G)}k.render(x,r);G();
