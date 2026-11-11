import { GAL, IMG } from '../data/gallery.js'
import { sfx } from './audio.js'

export const gal=g=>{const L=GAL.map((e,i)=>i).filter(i=>GAL[i].g==g);return `<div class='car${L.length<2?' one':''}' data-g='${g}' data-i='0'><div class='m'>SCREENSHOT \u00b7 ${L.length<2?'klik untuk memperbesar':'geser atau tekan panah'}</div><div class='stage' data-nt><button class='nav l' data-a='p'>\u25c0</button><img src='${IMG[GAL[L[0]].k]}' alt=''><button class='nav r' data-a='n'>\u25b6</button></div><div class='cap' data-nt></div></div>`};
export function carGo(c,d){const g=c.dataset.g,L=GAL.map((e,i)=>i).filter(i=>GAL[i].g==g),i=(+c.dataset.i+d+L.length)%L.length,e=GAL[L[i]];c.dataset.i=i;
 let r='';for(let j=i;j>=0;j--)if(GAL[L[j]].r){r=GAL[L[j]].r;break}
 const im=c.querySelector('img');im.src=IMG[e.k];im.alt=e.c;im.classList.remove('sn','sp');void im.offsetWidth;if(d)im.classList.add(d>0?'sn':'sp');
 c.querySelector('.cap').innerHTML=(r?'<b>'+r+'</b> \u00b7 ':'')+e.c+(L.length>1?' \u00b7 '+(i+1)+'/'+L.length:'')}

export function installGallery(){
document.addEventListener('click',e=>{const c=e.target.closest('.car');if(!c)return;const b=e.target.closest('[data-a]');
 if(b){carGo(c,b.dataset.a=='n'?1:-1);sfx('click')}else if(e.target.tagName=='IMG'){const g=c.dataset.g;lightbox(GAL.map((x,i)=>i).filter(i=>GAL[i].g==g)[+c.dataset.i])}});
let sx=0;document.addEventListener('touchstart',e=>{if(e.target.closest('.stage'))sx=e.touches[0].clientX},{passive:true});
document.addEventListener('touchend',e=>{const c=e.target.closest('.car');if(!c||!e.target.closest('.stage'))return;const dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>35){carGo(c,dx<0?1:-1);sfx('click')}},{passive:true});
}

function lightbox(i){const L=GAL.map((e,j)=>j).filter(j=>GAL[j].g==GAL[i].g);let p=L.indexOf(i);const d=document.createElement('div');d.id='lb';
 const r=()=>{const e=GAL[L[p]];d.innerHTML=`<img src='${IMG[e.k]}' alt='${e.c}'><div class='cap'>${e.c} (${p+1}/${L.length})</div><div><button class='btn' data-a='p'>\u25c0</button><button class='btn' data-a='x'>CLOSE</button><button class='btn' data-a='n'>\u25b6</button></div>`};
 const cl=()=>{d.remove();removeEventListener('keydown',kd)},mv=n=>{p=(p+n+L.length)%L.length;r();sfx('click')};
 const kd=e=>{if(e.key=='Escape')cl();else if(e.key=='ArrowLeft')mv(-1);else if(e.key=='ArrowRight')mv(1)};
 d.onclick=e=>{const a=e.target.closest('[data-a]');if(a)a.dataset.a=='x'?cl():mv(a.dataset.a=='n'?1:-1);else if(e.target==d)cl()};
 addEventListener('keydown',kd);r();document.body.appendChild(d);sfx('open')}

