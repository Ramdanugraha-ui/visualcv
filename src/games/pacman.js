import { sfx } from '../engine/audio.js'

// pac-man (night mode)
const PM=['###############','#o.....#.....o#','#.###.#.#.###.#','#.............#','#.##.##.##.##.#','#....#   #....#','#.##.#####.##.#','#.............#','#.###.#.#.###.#','#o.....#.....o#','###############'];
export function pacGame(w){
 const S=24,cv=w.querySelector('canvas'),c=cv.getContext('2d'),hd=w.querySelector('.hd'),ov=w.querySelector('.ov');
 let map,score,lives,dots,pac,gh,power=0,state='ready',tk=0,last=0,raf;
 const free=(x,y,g)=>{const h=map[y]&&map[y][x];return !!h&&h!='#'&&(g||h!='h')};
 function upd(){hd.textContent='SCORE '+score+'  '+'♥'.repeat(lives)}
 function msg(t){ov.innerHTML=t+'<br><small>TAP OR PRESS ARROW</small>';ov.style.display='flex'}
 function reset(full){if(full){map=PM.map(r=>[...r].map(ch=>ch==' '?'h':ch));score=0;lives=3;dots=0;map.forEach(r=>r.forEach(ch=>{if(ch=='.'||ch=='o')dots++}))}
  pac={x:7,y:7,px:7,py:7,dx:0,dy:0,nx:-1,ny:0,a:Math.PI};
  gh=[[6,5,'#FF36C8'],[8,5,'#31E8FF'],[7,5,'#FFE34D']].map(([x,y,col],i)=>({x,y,px:x,py:y,dx:0,dy:-1,col,out:i*10+4}));power=0;upd()}
 function go(){if(state=='end')reset(true);state='play';ov.style.display='none'}
 function dir(dx,dy){pac.nx=dx;pac.ny=dy;if(state!='play')go()}
 function tick(){tk++;pac.px=pac.x;pac.py=pac.y;
  if((pac.nx||pac.ny)&&free(pac.x+pac.nx,pac.y+pac.ny)){pac.dx=pac.nx;pac.dy=pac.ny}
  if((pac.dx||pac.dy)&&free(pac.x+pac.dx,pac.y+pac.dy)){pac.x+=pac.dx;pac.y+=pac.dy;pac.a=Math.atan2(pac.dy,pac.dx)}
  const ch=map[pac.y][pac.x];if(ch=='.'||ch=='o'){score+=ch=='o'?50:10;dots--;map[pac.y][pac.x]='-';if(ch=='o'){power=45;sfx('alt')}}
  gh.forEach(q=>{q.px=q.x;q.py=q.y;if(q.out>0){q.out--;return}if(tk%5==0||(power>0&&tk%2))return;
   let o=[[1,0],[-1,0],[0,1],[0,-1]].filter(d=>free(q.x+d[0],q.y+d[1],1));const f=o.filter(d=>!(d[0]==-q.dx&&d[1]==-q.dy));if(f.length)o=f;
   let d;if(power>0||Math.random()<.3)d=o[Math.random()*o.length|0];else d=o.reduce((b,e)=>Math.hypot(q.x+e[0]-pac.x,q.y+e[1]-pac.y)<Math.hypot(q.x+b[0]-pac.x,q.y+b[1]-pac.y)?e:b);
   q.dx=d[0];q.dy=d[1];q.x+=d[0];q.y+=d[1]});
  if(power>0)power--;
  for(const q of gh){if((q.x==pac.x&&q.y==pac.y)||(q.x==pac.px&&q.y==pac.py&&q.px==pac.x&&q.py==pac.y)){
   if(power>0){score+=200;Object.assign(q,{x:7,y:5,px:7,py:5,dx:0,dy:-1,out:8});sfx('open')}
   else{lives--;sfx('close');if(lives<=0){state='end';sfx('defeat');msg('GAME OVER')}else{reset(false);state='ready';msg('OUCH! '+lives+' LEFT')}upd();return}}}
  if(dots<=0){state='end';sfx('ready');msg('YOU WIN!')}upd()}
 function render(t){const f=state=='play'?Math.min(1,(t-last)/150):1;c.fillStyle='#050713';c.fillRect(0,0,360,264);
  map.forEach((r,y)=>r.forEach((ch,x)=>{if(ch=='#'){c.fillStyle='#11152A';c.fillRect(x*S,y*S,S,S);c.strokeStyle='#8D45FF';c.lineWidth=2;c.strokeRect(x*S+3,y*S+3,S-6,S-6)}
   else if(ch=='.'){c.fillStyle='#9fefff';c.fillRect(x*S+10,y*S+10,4,4)}
   else if(ch=='o'&&((t/250|0)%2)){c.fillStyle='#FFE34D';c.beginPath();c.arc(x*S+12,y*S+12,6,0,7);c.fill()}}));
  const P=e=>[(e.px+(e.x-e.px)*f)*S+12,(e.py+(e.y-e.py)*f)*S+12];
  const [cx,cy]=P(pac),m=(tk&1)?.08:.3;c.fillStyle='#FFE34D';c.beginPath();c.moveTo(cx,cy);c.arc(cx,cy,10,pac.a+m*Math.PI,pac.a+(2-m)*Math.PI);c.fill();
  gh.forEach(q=>{const [x,y]=P(q),r=10;c.fillStyle=power>0?(power<12&&tk%2?'#fff':'#3a4cff'):q.col;c.beginPath();c.arc(x,y,r,Math.PI,0);c.lineTo(x+r,y+r);c.lineTo(x+r*.66,y+r-4);c.lineTo(x+r*.33,y+r);c.lineTo(x,y+r-4);c.lineTo(x-r*.33,y+r);c.lineTo(x-r*.66,y+r-4);c.lineTo(x-r,y+r);c.fill();
   c.fillStyle='#fff';c.fillRect(x-6,y-4,4,5);c.fillRect(x+2,y-4,4,5);c.fillStyle='#050713';c.fillRect(x-5+q.dx,y-2+q.dy,2,2);c.fillRect(x+3+q.dx,y-2+q.dy,2,2)})}
 function loop(t){if(state=='play'&&w.style.display!='none'&&t-last>=150){last=t;tick()}render(t);raf=requestAnimationFrame(loop)}
 const kd=e=>{const d={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],w:[0,-1],s:[0,1],a:[-1,0],d:[1,0]}[e.key];if(d&&w.dataset.top&&w.style.display!='none'){e.preventDefault();dir(...d)}};
 addEventListener('keydown',kd);ov.onclick=go;
 w.querySelectorAll('[data-d]').forEach(b=>b.onpointerdown=()=>dir(...b.dataset.d.split(',').map(Number)));
 let t0;cv.ontouchstart=e=>{t0=e.touches[0]};cv.ontouchend=e=>{const t=e.changedTouches[0],dx=t.clientX-t0.clientX,dy=t.clientY-t0.clientY;if(Math.max(Math.abs(dx),Math.abs(dy))<20)return go();Math.abs(dx)>Math.abs(dy)?dir(Math.sign(dx),0):dir(0,Math.sign(dy))};
 reset(true);msg('PRESS START');raf=requestAnimationFrame(loop);
 return()=>{cancelAnimationFrame(raf);removeEventListener('keydown',kd)}}
