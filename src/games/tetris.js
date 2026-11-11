import { sfx } from '../engine/audio.js'
import { arc } from './shell.js'

// TETRIS
const TP=[[[1,1,1,1]],[[1,1],[1,1]],[[0,1,0],[1,1,1]],[[0,1,1],[1,1,0]],[[1,1,0],[0,1,1]],[[1,0,0],[1,1,1]],[[0,0,1],[1,1,1]]],TC=['#31E8FF','#FFE34D','#8D45FF','#FF36C8','#ff5a5a','#4d7bff','#ff9f36'];
export function tetris(w){
 const cv=w.querySelector('canvas'),c=cv.getContext('2d'),hd=w.querySelector('.hd'),ov=w.querySelector('.ov'),B=18;
 let g,cur,nxt,score,lines,state='ready',last=0,spd,raf;
 const rnd=()=>{const i=Math.random()*7|0;return{m:TP[i],i,x:3,y:0}};
 const rot=m=>m[0].map((_,i)=>m.map(r=>r[i]).reverse());
 const fit=(m,x,y)=>m.every((r,j)=>r.every((v,i)=>!v||(x+i>=0&&x+i<10&&y+j<20&&(y+j<0||!g[y+j][x+i]))));
 const upd=()=>hd.textContent='SCORE '+score+'  LINES '+lines;
 const msg=t=>{ov.innerHTML=t+'<br><small>TAP OR PRESS ANY KEY</small>';ov.style.display='flex'};
 function spawn(){cur=nxt||rnd();cur.x=3;cur.y=0;nxt=rnd();if(!fit(cur.m,cur.x,cur.y)){state='end';sfx('defeat');msg('GAME OVER')}}
 function reset(){g=Array.from({length:20},()=>Array(10).fill(0));score=lines=0;spd=600;nxt=null;spawn();upd()}
 function lock(){cur.m.forEach((r,j)=>r.forEach((v,i)=>{if(v&&cur.y+j>=0)g[cur.y+j][cur.x+i]=cur.i+1}));let n=0;for(let y=19;y>=0;y--)if(g[y].every(v=>v)){g.splice(y,1);g.unshift(Array(10).fill(0));n++;y++}
  if(n){score+=[0,100,300,500,800][n];lines+=n;spd=Math.max(120,600-lines*25);sfx('open')}spawn();upd()}
 function press(k){if(state!='play'){if(state=='end')reset();state='play';ov.style.display='none';last=performance.now();return}
  if(k=='l'&&fit(cur.m,cur.x-1,cur.y))cur.x--;
  else if(k=='r'&&fit(cur.m,cur.x+1,cur.y))cur.x++;
  else if(k=='d'){if(fit(cur.m,cur.x,cur.y+1)){cur.y++;score++}else lock();upd()}
  else if(k=='u'){const m=rot(cur.m);for(const dx of[0,-1,1,-2,2])if(fit(m,cur.x+dx,cur.y)){cur.m=m;cur.x+=dx;break}}
  else if(k=='a'){while(fit(cur.m,cur.x,cur.y+1)){cur.y++;score+=2}lock()}}
 function render(){c.fillStyle='#050713';c.fillRect(0,0,240,360);c.strokeStyle='#8D45FF';c.lineWidth=2;c.strokeRect(1,1,180,358);
  const cell=(x,y,i)=>{c.fillStyle=TC[i];c.fillRect(x*B+1,y*B+1,B-2,B-2);c.fillStyle='rgba(255,255,255,.3)';c.fillRect(x*B+1,y*B+1,B-2,3)};
  g.forEach((r,y)=>r.forEach((v,x)=>{if(v)cell(x,y,v-1);else{c.fillStyle='rgba(49,232,255,.1)';c.fillRect(x*B+B/2-1,y*B+B/2-1,2,2)}}));
  if(state!='end')cur.m.forEach((r,j)=>r.forEach((v,i)=>v&&cell(cur.x+i,cur.y+j,cur.i)));
  c.fillStyle='#FFE34D';c.font='9px monospace';c.fillText('NEXT',192,20);nxt.m.forEach((r,j)=>r.forEach((v,i)=>{if(v){c.fillStyle=TC[nxt.i];c.fillRect(190+i*12,30+j*12,11,11)}}))}
 function loop(t){if(state=='play'&&w.style.display!='none'&&t-last>spd){last=t;if(fit(cur.m,cur.x,cur.y+1))cur.y++;else lock()}render();raf=requestAnimationFrame(loop)}
 const I=arc(w,press);ov.onclick=()=>press('');
 reset();msg('PRESS START');raf=requestAnimationFrame(loop);
 return()=>{cancelAnimationFrame(raf);I.off()}}
