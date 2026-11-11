// Pembantu bersama untuk jendela game: kerangka HTML + input keyboard/tombol layar
export const OVS='position:absolute;inset:0;display:none;flex-direction:column;align-items:center;justify-content:center;background:rgba(5,7,19,.82);color:var(--yel);font-size:12px;text-align:center;line-height:2.2;cursor:pointer';
export const shell=(t,cw,ch,bt)=>`<h2>${t}</h2><div class='hd px' style='font-size:10px;color:var(--yel);margin-bottom:8px'></div><div style='position:relative;max-width:${cw}px;margin:auto'><canvas width='${cw}' height='${ch}' style='width:100%;display:block;border:2px solid var(--mag);touch-action:none;background:#050713'></canvas><div class='ov px' style='${OVS}'></div></div><div style='display:flex;gap:6px;justify-content:center;margin-top:10px;flex-wrap:wrap'>${bt.map(([l,k])=>`<button class='btn' data-k='${k}'>${l}</button>`).join('')}</div>`;
export function arc(w,onPress){const down=new Set(),M={ArrowUp:'u',ArrowDown:'d',ArrowLeft:'l',ArrowRight:'r',w:'u',s:'d',a:'l',d:'r',' ':'a',Enter:'a'};
 const on=e=>{const k=M[e.key];if(k&&w.dataset.top&&w.style.display!='none'){e.preventDefault();down.add(k);onPress(k)}},off=e=>{const k=M[e.key];if(k)down.delete(k)};
 addEventListener('keydown',on);addEventListener('keyup',off);
 w.querySelectorAll('[data-k]').forEach(b=>{b.onpointerdown=e=>{e.preventDefault();down.add(b.dataset.k);onPress(b.dataset.k)};b.onpointerup=b.onpointerleave=b.onpointercancel=()=>down.delete(b.dataset.k)});
 return{down,off:()=>{removeEventListener('keydown',on);removeEventListener('keyup',off)}}}
