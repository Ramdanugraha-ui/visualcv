// Langit & skyline piksel (sore / malam)
export function drawBG(d,cv,night){if(!d||!d.clientWidth)return;const S=4,W=Math.ceil(d.clientWidth/S),H=Math.ceil(d.clientHeight/S);cv.width=W;cv.height=H;
 const c=cv.getContext('2d'),n=night;let s=7;const R=()=>(s=(s*16807)%2147483647)/2147483647;
 const bands=n?['#050713','#0a0a24','#150a33','#2a0b45','#4a0f5c']:['#2a1a4f','#6a2c70','#c24f5c','#f0894a','#ffc968'];
 bands.forEach((col,i)=>{c.fillStyle=col;c.fillRect(0,Math.floor(i*H/5),W,Math.ceil(H/5)+1)});
 const disc=(cx,cy,r,col)=>{c.fillStyle=col;for(let y=-r;y<=r;y++)for(let x=-r;x<=r;x++)if(x*x+y*y<=r*r)c.fillRect(cx+x|0,cy+y|0,1,1)};
 if(n){for(let i=0;i<80;i++){c.fillStyle=R()<.3?'#31E8FF':R()<.5?'#FF36C8':'#fff';c.globalAlpha=.4+R()*.6;c.fillRect(R()*W|0,R()*H*.65|0,1,1)}c.globalAlpha=1;disc(W*.6,H*.14,8,'#fff2c8');disc(W*.6+4,H*.14-2,7,bands[0])}
 else{c.globalAlpha=.28;disc(W*.6,H*.62,19,'#ffb347');c.globalAlpha=1;disc(W*.6,H*.62,11,'#fff1a8');disc(W*.6,H*.62,8,'#ffd84d');c.fillStyle='#ffb69a';c.globalAlpha=.55;[[.1,.1],[.3,.28],[.78,.12],[.9,.3]].forEach(([a,b])=>{const x=W*a|0,y=H*b|0;c.fillRect(x,y,14,3);c.fillRect(x+2,y-2,7,2);c.fillRect(x+8,y-3,4,3)});c.globalAlpha=1}
 let x=0;while(x<W){const bw=6+(R()*8|0),bh=8+(R()*Math.min(30,H*.3)|0);c.fillStyle=n?'#080a1c':'#2a1740';c.fillRect(x,H-bh,bw,bh);
  if(n){c.fillStyle=R()<.5?'#FF36C8':'#31E8FF';c.globalAlpha=.8;c.fillRect(x,H-bh,bw,1);c.globalAlpha=1}
  for(let wy=H-bh+3;wy<H-2;wy+=3)for(let wx=x+1;wx<x+bw-1;wx+=2)if(R()<.35){c.fillStyle=(n&&R()<.5)?'#31E8FF':'#FFE34D';c.globalAlpha=n?.9:.7;c.fillRect(wx,wy,1,1);c.globalAlpha=1}
  x+=bw+(R()*2|0)}}
