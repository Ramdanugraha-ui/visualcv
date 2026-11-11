import { sfx } from '../engine/audio.js'
import { arc } from './shell.js'

// SPACE INVADERS
const AP=[['..1..1..','.111111.','11.11.11','11111111','1.1111.1','1.1..1.1'],['..1..1..','.111111.','11.11.11','11111111','.1.11.1.','1.....1.']],AC=['#FF36C8','#31E8FF','#31E8FF','#FFE34D'];
export function invaders(w){
 const cv=w.querySelector('canvas'),c=cv.getContext('2d'),hd=w.querySelector('.hd'),ov=w.querySelector('.ov');
 let al,ox,oy,dr,ship,pb,eb,score,lives,lv,state='ready',fr,inv,an=0,acc=0,last=0,raf;
 const upd=()=>hd.textContent='SCORE '+score+'  WAVE '+lv+'  '+'\u2665'.repeat(lives);
 const msg=t=>{ov.innerHTML=t+'<br><small>TAP OR PRESS ANY KEY</small>';ov.style.display='flex'};
 function wave(){al=Array(32).fill(1);ox=24;oy=30;dr=1;pb=null;eb=[];fr=0}
 function reset(){score=0;lives=3;lv=1;ship=180;inv=0;wave();upd()}
 function go(){if(state=='end')reset();state='play';ov.style.display='none'}
 const I=arc(w,()=>{if(state!='play')go()});
 const pos=i=>[ox+(i%8)*38,oy+(i/8|0)*28];
 function hit(){lives--;sfx('close');inv=90;eb=[];upd();if(lives<=0){state='end';sfx('defeat');msg('GAME OVER')}}
 function step(){fr++;const d=I.down,n=al.reduce((a,v)=>a+v,0);
  if(d.has('l'))ship-=3;if(d.has('r'))ship+=3;ship=Math.max(16,Math.min(344,ship));
  if(d.has('a')&&!pb)pb={x:ship,y:290};
  const per=Math.max(3,6+n-lv*2);
  if(fr%per==0){an^=1;let mn=9,mx=-1;al.forEach((v,i)=>{if(v){mn=Math.min(mn,i%8);mx=Math.max(mx,i%8)}});
   const L=ox+mn*38,R=ox+mx*38+24;if((dr>0&&R+8>356)||(dr<0&&L-8<4)){oy+=14;dr=-dr}else ox+=dr*8}
  if(pb){pb.y-=7;if(pb.y<0)pb=null;else for(let i=0;i<32;i++){if(!al[i])continue;const[ax,ay]=pos(i);if(pb.x>ax&&pb.x<ax+24&&pb.y>ay&&pb.y<ay+18){al[i]=0;pb=null;score+=[30,20,20,10][i/8|0];sfx('open');upd();break}}}
  if(fr%Math.max(25,70-lv*8)==0&&n){const cols=[];for(let k=0;k<8;k++)for(let r=3;r>=0;r--)if(al[r*8+k]){cols.push(r*8+k);break}const i=cols[Math.random()*cols.length|0],[ax,ay]=pos(i);eb.push({x:ax+12,y:ay+18})}
  eb.forEach(e=>e.y+=3+lv*.3);eb=eb.filter(e=>e.y<320);
  if(inv>0)inv--;else for(const e of eb)if(Math.abs(e.x-ship)<12&&e.y>292&&e.y<312){hit();return}
  for(let i=0;i<32;i++)if(al[i]&&pos(i)[1]+18>=290){lives=0;hit();return}
  if(!n){lv++;sfx('ready');wave();upd()}}
 function render(){c.fillStyle='#050713';c.fillRect(0,0,360,320);c.fillStyle='#8D45FF';c.fillRect(0,316,360,2);
  al.forEach((v,i)=>{if(!v)return;const[ax,ay]=pos(i);c.fillStyle=AC[i/8|0];AP[an].forEach((r,j)=>[...r].forEach((q,k)=>{if(q=='1')c.fillRect(ax+k*3,ay+j*3,3,3)}))});
  if(!(inv>0&&inv%8<4)){c.fillStyle='#31E8FF';c.fillRect(ship-12,306,24,6);c.fillRect(ship-4,300,8,6);c.fillRect(ship-1,296,2,4)}
  c.fillStyle='#FFE34D';if(pb)c.fillRect(pb.x-1,pb.y,3,9);c.fillStyle='#FF36C8';eb.forEach(e=>c.fillRect(e.x-1,e.y,3,9))}
 function loop(t){if(state=='play'&&w.style.display!='none'){acc+=Math.min(50,t-last);while(acc>=16.7){acc-=16.7;if(state=='play')step()}}last=t;render();raf=requestAnimationFrame(loop)}
 ov.onclick=go;reset();msg('PRESS START');raf=requestAnimationFrame(loop);
 return()=>{cancelAnimationFrame(raf);I.off()}}
