import { sfx } from '../engine/audio.js'
import { arc } from './shell.js'

// DONKEY KONG
export function kong(w){
 const cv=w.querySelector('canvas'),c=cv.getContext('2d'),hd=w.querySelector('.hd'),ov=w.querySelector('.ov');
 const Y=L=>292-58*L,LAD=[280,90,280,200];
 let p,bs,score,lives,state='ready',acc=0,last=0,raf,sp,fr=0;
 const upd=()=>hd.textContent='SCORE '+score+'  '+'\u2665'.repeat(lives);
 const msg=t=>{ov.innerHTML=t+'<br><small>TAP OR PRESS ANY KEY</small>';ov.style.display='flex'};
 const newP=()=>{p={x:30,f:0,py:Y(0),cl:0,k:0,jy:0,jv:0}};
 function reset(){score=0;lives=3;bs=[];sp=60;newP();upd()}
 function go(){if(state=='end')reset();state='play';ov.style.display='none'}
 const I=arc(w,k=>{if(state!='play'){go();return}if(k=='a'&&!p.cl&&p.jy==0&&!p.jv)p.jv=-5.6});
 function die(){lives--;sfx('close');bs=[];if(lives<=0){state='end';sfx('defeat');msg('GAME OVER')}else{newP();state='ready';msg('OUCH! '+lives+' LEFT')}upd()}
 function step(){fr++;const d=I.down;
  if(p.cl){if(d.has('u'))p.py-=1.7;if(d.has('d'))p.py+=1.7;
   if(p.py<=Y(p.k+1)){p.f=p.k+1;p.py=Y(p.f);p.cl=0}else if(p.py>=Y(p.k)){p.f=p.k;p.py=Y(p.f);p.cl=0}}
  else{if(d.has('l'))p.x-=2;if(d.has('r'))p.x+=2;p.x=Math.max(20,Math.min(340,p.x));
   if(p.jy==0&&!p.jv){
    if(d.has('u')&&p.f<4&&Math.abs(p.x-LAD[p.f])<9){p.cl=1;p.k=p.f;p.x=LAD[p.f];p.py-=2}
    else if(d.has('d')&&p.f>0&&Math.abs(p.x-LAD[p.f-1])<9){p.cl=1;p.k=p.f-1;p.x=LAD[p.k];p.py=Y(p.f)+2}}
   if(p.jv||p.jy<0){p.jv+=.38;p.jy+=p.jv;if(p.jy>=0){p.jy=0;p.jv=0}}}
  if(--sp<=0){bs.push({x:272,L:4,y:Y(4)-8,dx:-1,fall:0,j:0});sp=Math.max(55,120-(score/20|0))}
  bs.forEach(b=>{if(b.fall){b.y+=3;if(b.y>=Y(b.L-1)-8){b.L--;b.y=Y(b.L)-8;b.fall=0;b.dx=b.L%2?1:-1}}else{b.x+=b.dx*1.5;if(b.L>0&&((b.dx<0&&b.x<=14)||(b.dx>0&&b.x>=346)))b.fall=1}});
  bs=bs.filter(b=>b.x>-10);
  const cy=p.py+p.jy-9;
  for(const b of bs){const dx=Math.abs(b.x-p.x);
   if(dx<10&&Math.abs(b.y-cy)<11){die();return}
   if(!b.j&&!p.cl&&b.L==p.f&&p.jy<-14&&dx<9){b.j=1;score+=100;sfx('open');upd()}}
  if(p.f==4&&p.x<64){state='end';score+=1000;sfx('ready');upd();msg('YOU SAVED HER!')}}
 function render(){c.fillStyle='#050713';c.fillRect(0,0,360,320);
  for(let L=0;L<5;L++){const y=Y(L),x0=(L>0&&L%2==0)?18:0,x1=(L%2==1)?342:360;c.fillStyle='#FF36C8';c.fillRect(x0,y,x1-x0,5);c.fillStyle='#8D45FF';c.fillRect(x0,y+5,x1-x0,2)}
  LAD.forEach((x,k)=>{c.fillStyle='#31E8FF';c.fillRect(x-6,Y(k+1),2,Y(k)-Y(k+1));c.fillRect(x+4,Y(k+1),2,Y(k)-Y(k+1));for(let yy=Y(k+1)+4;yy<Y(k);yy+=8)c.fillRect(x-6,yy,12,2)});
  const ky=Y(4),up=fr%40<20;c.fillStyle='#8a4b1f';c.fillRect(286,ky-34,36,34);c.fillRect(278,ky-(up?44:26),10,14);c.fillRect(320,ky-(up?26:44),10,14);c.fillStyle='#e0a070';c.fillRect(294,ky-30,20,12);c.fillStyle='#fff';c.fillRect(297,ky-27,4,4);c.fillRect(307,ky-27,4,4);
  c.fillStyle='#FFE34D';c.fillRect(36,ky-26,10,5);c.fillStyle='#FF36C8';c.fillRect(36,ky-20,10,16);c.fillStyle='#f0b98a';c.fillRect(38,ky-24,6,4);
  bs.forEach(b=>{c.fillStyle='#c9783a';c.beginPath();c.arc(b.x,b.y,8,0,7);c.fill();c.strokeStyle='#050713';c.lineWidth=2;const a=b.x/5;c.beginPath();c.moveTo(b.x-Math.cos(a)*7,b.y-Math.sin(a)*7);c.lineTo(b.x+Math.cos(a)*7,b.y+Math.sin(a)*7);c.stroke()});
  const x=p.x,y=p.py+p.jy;c.fillStyle='#16161f';c.fillRect(x-4,y-22,8,3);c.fillStyle='#f0b98a';c.fillRect(x-4,y-19,8,6);c.fillStyle='#2b2b44';c.fillRect(x-5,y-13,10,8);c.fillStyle='#FF36C8';c.fillRect(x-5,y-9,10,2);c.fillStyle='#1c2a5a';c.fillRect(x-4,y-5,3,5);c.fillRect(x+1,y-5,3,5);
  if(p.jy<-2||p.cl){c.fillStyle='#2b2b44';c.fillRect(x-8,y-17,3,6);c.fillRect(x+5,y-17,3,6)}}
 function loop(t){if(state=='play'&&w.style.display!='none'){acc+=Math.min(50,t-last);while(acc>=16.7){acc-=16.7;if(state=='play')step()}}last=t;render();raf=requestAnimationFrame(loop)}
 ov.onclick=go;reset();msg('PRESS START');raf=requestAnimationFrame(loop);
 return()=>{cancelAnimationFrame(raf);I.off()}}
