(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const pt=$('.portrait');
if(pt&&!calm&&matchMedia('(hover:hover)').matches){
  pt.addEventListener('pointermove',e=>{const r=pt.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;pt.style.transform='perspective(900px) rotateY('+x*9+'deg) rotateX('+(-y*9)+'deg)'});
  pt.addEventListener('pointerleave',()=>{pt.style.transform=''});
}
const rg=$('#age'),out=$('#agev'),jobs=$$('.jobs li');
rg.addEventListener('input',()=>{const v=+rg.value;out.textContent=v<10?'все возрасты':v+' лет';jobs.forEach(li=>li.classList.toggle('dim',v>=10&&!(+li.dataset.a<=v&&v<=+li.dataset.b)))});
let ac;
const ctx=()=>{ac=ac||new(window.AudioContext||window.webkitAudioContext)();if(ac.resume)ac.resume();return ac};
const tone=(f,type,d,g,f2)=>{const c=ctx(),t=c.currentTime,o=c.createOscillator(),v=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);v.gain.setValueAtTime(g,t);v.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(v);v.connect(c.destination);o.start(t);o.stop(t+d)};
$$('.ins').forEach(b=>b.addEventListener('click',()=>{
  const D=b.dataset,f=+D.f,d=+D.d,g=+D.g;
  try{if(D.s){tone(f,D.t,d,g,+D.s)}else{tone(f,D.t,d,g);if(D.f2)tone(+D.f2,D.t,d,g)}}catch(e){}
  b.classList.add('hit');setTimeout(()=>b.classList.remove('hit'),260);
}));
const dlg=$('#lb'),im=dlg.querySelector('img'),cp=dlg.querySelector('p');
$$('[data-lb]').forEach(b=>b.addEventListener('click',()=>{im.src=b.querySelector('img').src;im.alt=cp.textContent=b.dataset.lb;dlg.showModal()}));
dlg.addEventListener('click',()=>dlg.close());
const links=$$('.nav a[href^="#"]'),secs=links.map(a=>$(a.getAttribute('href'))).filter(Boolean);
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('cur',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-30% 0px -60% 0px'});secs.forEach(s=>io.observe(s))}

const S=(d,x)=>'<path d="'+d+'"'+(x||'')+'/>',T=(d,w)=>'<path class="s" stroke-width="'+w+'" d="'+d+'"/>',E=' fill-rule="evenodd"';
const I={
electric:'<g transform="rotate(35 32 32)">'+S('M21 30l-3-8 8 3h12l8-3-3 8 4 14q0 14-15 14T17 44z')+S('M29.5 4h5v22h-5zM27 1h10v8H27z')+'</g>',
camera:S('M8 20h10l4-6h20l4 6h10a4 4 0 0 1 4 4v26a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V24a4 4 0 0 1 4-4zM21 37a11 11 0 1 0 22 0a11 11 0 1 0-22 0z',E),
solder:'<g transform="rotate(-35 32 32)"><rect x="4" y="27" width="28" height="10" rx="5"/>'+S('M32 30h16v4H32zM48 29l12 3-12 3z')+'</g>',
chip:S('M16 16h32v32H16zM10 20h6v4h-6zM10 28h6v4h-6zM10 36h6v4h-6zM10 44h6v4h-6zM48 20h6v4h-6zM48 28h6v4h-6zM48 36h6v4h-6zM48 44h6v4h-6zM20 10h4v6h-4zM30 10h4v6h-4zM40 10h4v6h-4zM20 48h4v6h-4zM30 48h4v6h-4zM40 48h4v6h-4z'),
code:'<text x="32" y="42" text-anchor="middle" font-family="monospace" font-weight="700" font-size="28">&lt;/&gt;</text>',
phones:T('M10 40V32a22 22 0 0 1 44 0v8',5)+'<rect x="6" y="36" width="12" height="20" rx="5"/><rect x="46" y="36" width="12" height="20" rx="5"/>',
compass:S('M32 6a26 26 0 1 0 0 52a26 26 0 1 0 0-52zM32 11a21 21 0 1 1 0 42a21 21 0 1 1 0-42z',E)+S('M32 16l6 16-6 16-6-16z'),
mic:'<rect x="24" y="6" width="16" height="28" rx="8"/>'+T('M16 28a16 16 0 0 0 32 0M32 44v12M22 58h20',4),
};
const rnd=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const sil=()=>{
  $$('.side').forEach(e=>e.remove());
  const g=Math.floor($('.box').getBoundingClientRect().left-14);
  if(g<70)return;
  const H=document.documentElement.scrollHeight,R=rnd(11),keys=Object.keys(I),P=140;
  [0,1].forEach(side=>{
    const el=document.createElement('div');el.className='side';el.setAttribute('aria-hidden','true');
    el.style.cssText='width:'+g+'px;height:'+H+'px;'+(side?'right:0':'left:0');
    const cols=Math.max(1,Math.round(g/150)),cw=g/cols;let h='';
    for(let r=0,y=100;y<H-60;r++,y+=P)for(let c=0;c<cols;c++){
      const s=56+R()*24,off=(r%2?1:-1)*cw*.25;
      let x=(c+.5)*cw-s/2+off+(R()-.5)*14;x=Math.max(2,Math.min(g-s-2,x));
      h+='<svg viewBox="0 0 64 64" style="width:'+s+'px;height:'+s+'px;left:'+x+'px;top:'+(y+(R()-.5)*16)+'px;transform:rotate('+((R()-.5)*70)+'deg)">'+I[keys[(r*3+c*2+side*5)%keys.length]]+'</svg>';
    }
    el.innerHTML=h;document.body.appendChild(el);
  });
};
let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(sil,200)});
addEventListener('load',sil);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(sil);
})();
