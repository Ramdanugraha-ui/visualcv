// Sprite karakter 24x32 piksel (digambar di kanvas 40x32, offset 8)
export const S = { st: 'idle', F: false } // st: idle | w1 | w2 | win | act

const SC={h:'#16161f',s:'#f0b98a',sd:'#d99a73',k:'#232333',kd:'#3a3a4a',w:'#f4f4ff',t:'#0a0a12',p:'#1b1b28',o:'#2b2b44',od:'#1c1c33',c:'#FF36C8',n:'#1c2a5a'};
function sprite(c,m){const d=m=='day',R=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(x+8,y,w,h)},win=S.st=='win',w1=S.st=='w1',w2=S.st=='w2',body=d?SC.k:SC.o;
 const ll=w1?6:w2?8:7,rl=w1?14:w2?12:13,pc=d?SC.p:SC.n,sh=d?'#000':'#FF36C8';
 R(ll,26,4,4,pc);R(rl,26,4,4,pc);R(ll-1,30,5,2,sh);R(rl,30,5,2,sh);if(!d){R(ll-1,31,5,1,'#f4f4ff');R(rl,31,5,1,'#f4f4ff')}
 R(5,18,14,8,body);
 if(!win){const a=(w1||w2)?(S.F?1:0):0,b=(w1||w2)?(S.F?0:1):0;R(2,18+a,3,8,body);R(19,18+b,3,8,body);R(2,26+a,3,2,SC.s);R(19,26+b,3,2,SC.s)}
 else{R(2,19,4,3,body);R(18,19,4,3,body);R(0,19,2,3,SC.s);R(22,19,2,3,SC.s)}
 if(d){R(10,18,4,6,SC.w);R(11,19,2,8,SC.t);R(11,18,2,2,SC.t);R(9,18,1,7,SC.kd);R(14,18,1,7,SC.kd)}
 else{R(8,21,8,4,SC.od);R(8,17,8,2,SC.od);R(10,17,1,5,SC.c);R(13,17,1,5,SC.c)}
 R(10,16,4,2,SC.sd);
 if(d){R(5,9,2,3,SC.s);R(17,9,2,3,SC.s)}
 else{R(4,1,16,15,SC.o);R(8,1,8,1,'#3a3a55');R(6,4,12,12,SC.od)}
 R(7,6,10,10,SC.s);
 if(d){R(9,0,6,1,SC.h);R(7,1,10,1,SC.h);R(6,2,12,3,SC.h);R(6,5,8,1,SC.h);R(14,5,3,1,SC.s);R(6,6,1,3,SC.h);R(17,6,1,3,SC.h)}
 else{R(8,5,8,1,SC.h);R(2,8,3,6,SC.c);R(19,8,3,6,SC.c);R(3,9,1,4,'#ff9be0');R(20,9,1,4,'#ff9be0')}
 R(8,8,3,1,SC.h);R(13,8,3,1,SC.h);R(8,9,2,2,'#111');R(14,9,2,2,'#111');R(8,9,1,1,'#fff');R(14,9,1,1,'#fff');R(11,11,2,2,SC.sd);
 if(win){R(9,13,6,2,'#7a2a2a');R(10,13,4,1,'#fff')}else{R(10,13,4,1,'#b5604d');R(9,12,1,1,'#b5604d');R(14,12,1,1,'#b5604d')}}
function props(m,c){const P=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(x,y,w,h)};
 if(m=='day'){P(8,26,26,2,'#e08a45');P(8,28,26,4,'#7a4520');P(15,18,10,7,'#9aa3c0');P(16,19,8,5,'#1a2142');P(17,20,S.F?5:3,1,'#31E8FF');P(17,22,S.F?3:5,1,'#FFE34D');P(14,25,12,1,'#6b7390');
  P(S.F?15:16,24,3,2,SC.s);P(S.F?22:21,24,3,2,SC.s);P(30,22,4,4,'#f4f4ff');P(34,23,1,2,'#f4f4ff');P(S.F?31:32,17,1,4,'#cfd8ff');
  P(0,6,S.F?10:7,1,'#31E8FF');P(0,10,S.F?5:11,1,'#FF36C8');P(0,14,8,1,'#FFE34D')}
 else{P(15,22,10,5,'#0a0a18');P(15,22,10,1,'#8D45FF');P(17,23,1,3,'#31E8FF');P(16,24,3,1,'#31E8FF');P(22,23,2,2,S.F?'#FFE34D':'#FF36C8');P(23,25,1,1,'#31E8FF');
  P(S.F?13:14,23,3,3,SC.s);P(S.F?25:24,23,3,3,SC.s);c.globalAlpha=S.F?.3:.12;P(15,6,10,10,'#31E8FF');c.globalAlpha=1;
  const k=S.F?'#FF36C8':'#31E8FF';[[1,2],[3,2],[0,3],[1,3],[2,3],[3,3],[4,3],[0,4],[2,4],[4,4]].forEach(([x,y])=>P(x*2,y*2,2,2,k));P(S.F?0:8,10,2,2,k);P(S.F?8:0,10,2,2,k);P(36,6,3,3,'#FFE34D');P(37,7,1,1,'#fff7b0')}}

export function draw(canvas, mode) {
  const c = canvas.getContext('2d')
  c.clearRect(0, 0, 40, 32)
  sprite(c, mode)
  if (S.st === 'act') props(mode, c)
}
