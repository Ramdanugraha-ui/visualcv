import { beep } from './audio.js'

// Efek teks diketik seperti dialog game (klik di jendela untuk melewati)
export function typeIn(w){const b=w.querySelector('.body'),tn=[],tw=document.createTreeWalker(b,NodeFilter.SHOW_TEXT);let n;
 while(n=tw.nextNode())if(n.nodeValue.trim()&&!n.parentNode.closest('[data-nt]'))tn.push([n,n.nodeValue]);
 tn.forEach(([n])=>{n.nodeValue='';if(/chip|btn/.test(n.parentNode.className))n.parentNode.style.visibility='hidden';const q=n.parentNode.closest('.th,.car');if(q)q.style.visibility='hidden'});const st=tn.reduce((a,[,s])=>a+s.length,0)>900?6:3;
 const cur=document.createElement('span');cur.textContent='\u258c';cur.style.cssText='color:var(--acc2);animation:blink .5s steps(2) infinite';
 let i=0,j=0;
 const fin=()=>{clearInterval(t);tn.forEach(([n,s])=>{n.nodeValue=s;n.parentNode.style.visibility='';const q=n.parentNode.closest('.th,.car');if(q)q.style.visibility=''});cur.remove()};
 const t=setInterval(()=>{if(!document.contains(w))return fin();const[n,s]=tn[i];n.parentNode.style.visibility='';const q=n.parentNode.closest('.th,.car');if(q&&q.style.visibility=='hidden'){q.style.visibility='';q.classList.add('in');beep(1200,.05,'square')}n.parentNode.insertBefore(cur,n.nextSibling);
  j+=st;n.nodeValue=s.slice(0,j);if((j/st|0)%2)beep(850+Math.random()*350,.03,'square');
  if(j>=s.length){n.nodeValue=s;i++;j=0;if(i>=tn.length)fin()}},30);
 b.addEventListener('pointerdown',fin,{once:true})}
