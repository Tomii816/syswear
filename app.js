/* SYSWEAR — vanilla JS */
(() => {
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ---------- DATA ---------- */
const PRODUCTS = [
  { id:'p1', name:'Two-in-One Raw Tee', sku:'099-COTTON-WOOL', cat:'LAYERED', price:340, img:'assets/outer.png', badge:'NEW', bg:'#f4f2ed',
    desc:'Asymmetrical raw-edge grey merino permanently hand-stitched over an organic waffle thermal.',
    flaws:['HEM UNRAVEL: −3.2cm LEFT','STITCH DRIFT: 4°','DROPPED LOOP @ R-SLEEVE'] },
  { id:'p2', name:'Thermal Memory Base', sku:'104-WAFFLE-ORG', cat:'BASE', price:160, img:'assets/inner.png', badge:'', bg:'#f4f2ed',
    desc:'Heavy organic cotton waffle thermal with raw cuffs. Washed 12x for a lived-in hand.',
    flaws:['RAW CUFF / NO OVERLOCK','WASH FADE: IRREGULAR'] },
  { id:'p3', img:'assets/p3.jpg', name:'Moss Unravel Cardigan', sku:'211-MOSS-WOOL', cat:'KNIT', price:420, badge:'1/1', bg:'#e6eadb',
    g:{shape:'cardigan', base:'#6f7d4c', pat:'knit', pc:'#525e34', stitch:'#efe6cf', darn:2, hem:[262,250], seed:3},
    desc:'Plant-dyed moss wool, hand-knit loose. Each hem pulled apart until the knit decides to stop.',
    flaws:['PLANT DYE VARIANCE','HAND-PULLED HEM','2x VISIBLE DARNS'] },
  { id:'p4', img:'assets/p4.jpg', name:'Oat Layered Longsleeve', sku:'118-OAT-LAYER', cat:'LAYERED', price:310, badge:'', bg:'#efe9df',
    g:{shape:'tee', base:'#b8a88c', pat:'slub', pc:'#9c8c70', stitch:'#3b3127', inner:{color:'#f2ede2', pat:'waffle', pc:'#d8d1c2'}, hem:[205,232], seed:7},
    desc:'Oat slub-cotton tee cut asymmetric and bonded over an undyed waffle longsleeve.',
    flaws:['ASYM HEM: +2.7cm R','INSIDE-OUT SIDE SEAMS'] },
  { id:'p5', img:'assets/p5.jpg', name:'Charcoal Ruin Hoodie', sku:'305-CHAR-FLEECE', cat:'OUTER', price:460, badge:'LOW', bg:'#e4e4e6',
    g:{shape:'hoodie', base:'#3d3c40', pat:'rib', pc:'#2d2c30', stitch:'#d9cfbd', darn:1, hem:[268,262], seed:11},
    desc:'Heavyweight loopback fleece, garment-dyed charcoal. Hood edge left raw, pocket hand-felled.',
    flaws:['RAW HOOD EDGE','HAND-FELLED POCKET'] },
  { id:'p6', img:'assets/p6v2.jpg', variants:[{name:'PEAT',hex:'#5a4330',img:'assets/p6v2.jpg',title:'Peat Darned Sweater',desc:'Heavy peat-brown knit darned in mustard and cream. The repairs are the ornament.'},{name:'OAT',hex:'#a08a70',img:'assets/p6.jpg',title:'Oat Darned Sweater',desc:'Heavy undyed oat knit darned with moss-green and cream patches. The repairs are the ornament.'}], name:'Peat Darned Sweater', sku:'412-PEAT-KNIT', cat:'KNIT', price:560, badge:'', bg:'#ece2d6',
    g:{shape:'long', base:'#7c5b3b', pat:'cable', pc:'#5f442a', stitch:'#e8d7b0', darn:4, hem:[258,258], seed:13},
    desc:'Heavy cable knit with contrast darning. The repairs are the ornament.',
    flaws:['VISIBLE DARNING x4','KNIT TENSION DRIFT'] },
  { id:'p7', img:'assets/p7.jpg', name:'Rust Patch Vest', sku:'233-RUST-WOOL', cat:'LAYERED', price:290, badge:'', bg:'#f1e5dc',
    g:{shape:'vest', base:'#a8552f', pat:'knit', pc:'#87411f', stitch:'#f2e7d2', darn:2, inner:{color:'#efe9dd', pat:'waffle', pc:'#d6cfbf'}, hem:[222,236], seed:17},
    desc:'Rust lambswool vest layered over a cream thermal. Two patches darned in by hand.',
    flaws:['PATCH DARN x2','UNEVEN V-NECK'] },
  { id:'p8', img:'assets/p8.jpg', variants:[{name:'LICHEN',hex:'#6b7a3e',img:'assets/p8.jpg',title:'Lichen Stripe Crop',desc:'Boxy hand-knit crop in lichen green and cream stripes. Hem left to unravel on its own.'},{name:'RUST',hex:'#b0502a',img:'assets/p8v2.jpg',title:'Rust Stripe Crop',desc:'Boxy hand-knit crop in rust and cream stripes. Hem left to unravel on its own.'}], name:'Lichen Stripe Crop', sku:'140-LICHEN-STR', cat:'BASE', price:150, badge:'', bg:'#e9ecdf',
    g:{shape:'tee', base:'#c9cba6', pat:'stripe', pc:'#8a8e63', stitch:'#4a4c33', hem:[196,188], seed:19},
    desc:'Boxy cropped tee in a lichen jersey stripe. Stripes drift out of register on purpose.',
    flaws:['STRIPE MISREGISTER','RAW NECKBAND'] },
  { id:'p9', img:'assets/p9.jpg', variants:[{name:'INDIGO',hex:'#2c4466',img:'assets/p9.jpg',title:'Indigo Mended Trouser',desc:'Wide hand-dyed indigo denim with sashiko mending at both knees and a frayed hem.'},{name:'BLACK',hex:'#262626',img:'assets/p9v2.jpg',title:'Black Mended Trouser',desc:'Wide washed-black denim with grey sashiko patches at both knees and a frayed hem.'}], name:'Indigo Mended Trouser', sku:'507-INDIGO-MEND', cat:'BOTTOMS', price:380, badge:'NEW', bg:'#e2e5eb',
    g:{shape:'trousers', base:'#2f3d5c', pat:'twill', pc:'#24304a', stitch:'#f1ead8', darn:3, hem:[318,312], seed:23},
    desc:'Wide hand-dyed indigo twill with sashiko mending at both knees and a frayed hem.',
    flaws:['SASHIKO MEND x3','FRAYED HEM'] },
  { id:'p10', img:'assets/p10.jpg', name:'Heather Tier Skirt', sku:'612-HEATH-SKRT', cat:'BOTTOMS', price:270, badge:'', bg:'#ebe5ec',
    g:{shape:'skirt', base:'#8b7f8f', pat:'stripe', pc:'#776b7b', stitch:'#f0e8f0', hem:[300,285], seed:29},
    desc:'Bias-cut heathered wool skirt, uneven tiered hem left to fray in the wash.',
    flaws:['BIAS TWIST','TIERED RAW HEM'] },
  { id:'p11', img:'assets/p11.jpg', name:'Ash Waffle Longsleeve', sku:'121-ASH-WAFFLE', cat:'BASE', price:170, badge:'', bg:'#efede8',
    g:{shape:'long', base:'#d6d1c6', pat:'waffle', pc:'#b9b3a6', stitch:'#5a554c', hem:[250,256], seed:31},
    desc:'Ash-grey waffle thermal with thumb-hole cuffs and exposed flatlock seams.',
    flaws:['FLATLOCK EXPOSED','CUFF STRETCH VARIANCE'] },
  { id:'p12', img:'assets/p12.jpg', variants:[{name:'CLAY',hex:'#b5603e',img:'assets/p12.jpg',title:'Clay Double Tee',desc:'Two clay-dyed tees stitched into one, hems offset, overlocked seams worn on the outside.'},{name:'CHARCOAL',hex:'#3d3d3f',img:'assets/p12v2.jpg',title:'Charcoal Double Tee',desc:'Two washed-charcoal tees stitched into one with cream hand-basting, hems offset.'}], name:'Clay Double Tee', sku:'330-CLAY-LAYER', cat:'LAYERED', price:350, badge:'', bg:'#f2e6de',
    g:{shape:'tee', base:'#c28b6a', pat:'slub', pc:'#a87556', stitch:'#2e2a28', darn:1, inner:{color:'#3e3c3f', pat:'rib', pc:'#2e2c30'}, hem:[214,198], seed:37},
    desc:'Clay-dyed slub tee permanently layered over a charcoal ribbed longsleeve.',
    flaws:['CLAY DYE BLOOM','SINGLE DARN @ CHEST'] },
  { id:'p13', img:'assets/p13.jpg', name:'Bone Carpenter Pant', sku:'520-BONE-CANVAS', cat:'BOTTOMS', price:410, badge:'NEW', bg:'#eeebe4',
    desc:'Heavy bone canvas carpenter pant. One knee swapped for raw oatmeal linen, hand-felled.',
    flaws:['LINEN KNEE PANEL','WORK STAINS: FACTORY-FREE'] },
  { id:'p14', img:'assets/p14.jpg', name:'Moss Cord Patch Pant', sku:'534-MOSS-CORD', cat:'BOTTOMS', price:440, badge:'1/1', bg:'#e6e8dc',
    desc:'Wide trouser pieced from mismatched moss, olive and tobacco corduroy offcuts.',
    flaws:['PANEL WALE MISMATCH','ZIG-ZAG SEAMS EXPOSED'] },
  { id:'p15', img:'assets/p15.jpg', variants:[{name:'ECRU',hex:'#e4dccb',img:'assets/p15.jpg',title:'Ecru Gauze Layer Pant',desc:'Undyed crinkle-gauze drawstring pant with a sheer over-layer cut shorter. Two raw hems.'},{name:'BLACK',hex:'#2a2a2a',img:'assets/p15v2.jpg',title:'Black Gauze Layer Pant',desc:'Washed-black crinkle-gauze drawstring pant with a sheer over-layer cut shorter. Two raw hems.'}], name:'Ecru Gauze Layer Pant', sku:'548-GAUZE-LAYER', cat:'BOTTOMS', price:300, badge:'', bg:'#efece6',
    desc:'Undyed crinkle-gauze drawstring pant with a sheer over-layer cut shorter. Two raw hems.',
    flaws:['DOUBLE RAW HEM','DRAWSTRING KNOT VARIANCE'] },
  { id:'p16', img:'assets/p16.jpg', variants:[
      {name:'MOSS',hex:'#5f6e34',img:'assets/p16.jpg',title:'Moss Darned Beanie',desc:'Chunky moss-green rib beanie, darned twice in cream and finished with a hand-tacked canvas label.'},
      {name:'BEIGE',hex:'#c2b29a',img:'assets/p16v2.jpg',title:'Beige Darned Beanie',desc:'Chunky undyed beige rib beanie, darned twice in cream and finished with a hand-tacked canvas label.'},
      {name:'CHARCOAL',hex:'#2b2b2b',img:'assets/p16v3.jpg',title:'Charcoal Darned Beanie',desc:'Chunky charcoal rib beanie, darned in cream and finished with a hand-tacked canvas label.'}],
    name:'Moss Darned Beanie', sku:'701-RIB-BEANIE', cat:'ACCESSORY', price:90, badge:'NEW', bg:'#ebece4',
    desc:'Chunky moss-green rib beanie, darned twice in cream and finished with a hand-tacked canvas label.',
    flaws:['VISIBLE DARNING x2','LOOSE TAIL @ CUFF','RIB TENSION DRIFT'] },
  { id:'p17', img:'assets/p17.jpg', name:'Offcut Patchwork Tote', sku:'715-OFFCUT-TOTE', cat:'ACCESSORY', price:120, badge:'1/1', bg:'#efebe2',
    desc:'Undyed canvas tote patched with denim and flannel offcuts from the trouser and shirt runs.',
    flaws:['RAW PANEL EDGES','PATCH PLACEMENT: UNIQUE'] },
  { id:'p18', img:'assets/p18.jpg', name:'Unravel Block Scarf', sku:'722-BLOCK-SCARF', cat:'ACCESSORY', price:140, badge:'', bg:'#e9eadf',
    desc:'Extra-long hand-knit scarf in oat and moss blocks. One end left to unravel into a fringe.',
    flaws:['UNRAVELLED END','DROPPED STITCH x3'] },
];

/* ---------- SVG GARMENT RENDERER ---------- */
const rng = s => () => (s = (s * 16807) % 2147483647) / 2147483647;
const hemLine = (xR, xL, yR, yL, r, jag = 10) => {
  let s = '', pts = []; const n = 16;
  for (let i = 0; i <= n; i++) { const t = i / n, x = xR + (xL - xR) * t, y = yR + (yL - yR) * t + (r() * jag - jag * .3);
    pts.push([x, y]); s += ` L${x.toFixed(1)} ${y.toFixed(1)}`; }
  return { s, pts };
};
function shapePath(shape, yR, yL, r) {
  let h, d, extra = '', seams = '';
  switch (shape) {
    case 'tee': h = hemLine(212, 88, yR, yL, r);
      d = `M125 40 Q150 64 175 40 L215 55 L258 100 L232 128 L212 112 L212 ${yR}${h.s} L88 112 L68 128 L42 100 L85 55 Z`;
      seams = `M215 55 L212 112 M85 55 L88 112 M212 118 L212 ${yR - 8} M88 118 L88 ${yL - 8}`; break;
    case 'vest': h = hemLine(216, 84, yR, yL, r);
      d = `M122 40 L150 112 L178 40 L208 50 Q202 92 216 118 L216 ${yR}${h.s} L84 118 Q98 92 92 50 Z`;
      seams = `M122 44 L150 114 L178 44 M208 54 Q203 92 214 118`; break;
    case 'trousers': { const a = hemLine(224, 160, yR, yR + 4, r, 8), b = hemLine(140, 76, yL, yL - 3, r, 8);
      d = `M92 30 L208 30 L224 ${yR}${a.s} L150 120${' L140 ' + yL}${b.s} Z`;
      h = { pts: [...a.pts, ...b.pts] };
      extra = `<path d="M92 30 L208 30 L208 46 L92 46 Z" fill="rgba(0,0,0,.18)"/>`;
      seams = `M150 46 L150 118 M105 50 L84 300 M195 50 L216 300`; break; }
    case 'skirt': h = hemLine(240, 60, yR, yL, r, 14);
      d = `M108 40 L192 40 L240 ${yR}${h.s} Z`;
      extra = `<path d="M108 40 L192 40 L194 56 L106 56 Z" fill="rgba(0,0,0,.2)"/>`;
      seams = `M100 130 Q150 140 205 128 M86 215 Q150 228 222 212`; break;
    default: h = hemLine(212, 88, yR, yL, r); // long, cardigan, hoodie
      d = `M125 40 Q150 64 175 40 L215 55 L264 205 L238 214 L212 125 L212 ${yR}${h.s} L88 125 L62 214 L36 205 L85 55 Z`;
      seams = `M215 55 L212 125 M85 55 L88 125 M240 196 L262 188 M60 196 L38 188`;
  }
  return { d, h, extra, seams };
}
function patternDef(id, pat, pc) {
  const P = (w, h, body) => `<pattern id="${id}" width="${w}" height="${h}" patternUnits="userSpaceOnUse">${body}</pattern>`;
  switch (pat) {
    case 'knit': return P(10, 9, `<path d="M0 0 L5 6 L10 0" stroke="${pc}" stroke-width="1.6" fill="none"/>`);
    case 'waffle': return P(8, 8, `<rect x=".5" y=".5" width="7" height="7" fill="none" stroke="${pc}" stroke-width="1.2"/>`);
    case 'rib': return P(6, 6, `<rect width="2.4" height="6" fill="${pc}"/>`);
    case 'stripe': return P(20, 22, `<rect width="20" height="9" fill="${pc}"/>`);
    case 'twill': return P(8, 8, `<path d="M0 8 L8 0 M-2 2 L2 -2 M6 10 L10 6" stroke="${pc}" stroke-width="1.4"/>`);
    case 'cable': return P(28, 36, `<path d="M7 0 Q19 9 7 18 Q-5 27 7 36 M21 0 Q9 9 21 18 Q33 27 21 36" stroke="${pc}" stroke-width="3" fill="none"/>`);
    default: return P(14, 6, `<path d="M0 3 Q4 1 7 3 T14 3" stroke="${pc}" stroke-width=".9" fill="none" opacity=".7"/>`); // slub
  }
}
let svgUid = 0;
function garmentSVG(g) {
  const u = 'g' + (svgUid++), r = rng(g.seed * 9973);
  const [yR, yL] = g.hem; let defs = '', body = '';
  defs += `<filter id="w${u}" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="${g.seed}"/><feDisplacementMap in="SourceGraphic" scale="4"/></filter>`;
  defs += `<filter id="n${u}"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="1" seed="${g.seed}"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .35"/></feComponentTransfer><feComposite in2="SourceGraphic" operator="in"/></filter>`;
  const layer = (shape, base, pat, pc, hy, key) => {
    const sp = shapePath(shape, hy[0], hy[1], r);
    defs += patternDef('p' + key + u, pat, pc);
    let out = '';
    if (shape === 'hoodie') out += `<path d="M110 52 Q150 -12 190 52 Q150 82 110 52 Z" fill="${base}" stroke="rgba(0,0,0,.35)" stroke-width="1.5"/><path d="M110 52 Q150 -12 190 52 Q150 82 110 52 Z" fill="url(#p${key}${u})" opacity=".8"/>`;
    out += `<path d="${sp.d}" fill="${base}" stroke="rgba(0,0,0,.35)" stroke-width="1.5"/>`;
    out += `<path d="${sp.d}" fill="url(#p${key}${u})"/>`;
    out += `<path d="${sp.d}" fill="#000" filter="url(#n${u})" opacity=".5"/>`;
    out += sp.extra;
    // fringe threads from raw hem
    sp.h.pts.forEach(([x, y], i) => { if (i % 2 === 0 || r() > .6) { const L = 4 + r() * 14;
      out += `<path d="M${x.toFixed(1)} ${(y - 1).toFixed(1)} q${(r() * 6 - 3).toFixed(1)} ${(L / 2).toFixed(1)} ${(r() * 4 - 2).toFixed(1)} ${L.toFixed(1)}" stroke="${pc}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`; } });
    return { out, sp };
  };
  if (g.inner) body += layer('long', g.inner.color, g.inner.pat, g.inner.pc, [g.hem[0] + 46, g.hem[1] + 40], 'i').out;
  const top = layer(g.shape === 'cardigan' || g.shape === 'hoodie' ? 'long' : g.shape, g.base, g.pat, g.pc, g.hem, 'o');
  if (g.shape === 'hoodie') body = layer('hoodie', g.base, g.pat, g.pc, [0, 0], 'h').out.split('<path d="M125')[0] + body; // hood behind
  body += top.out;
  // exposed stitching
  body += `<path d="${top.sp.seams}" stroke="${g.stitch}" stroke-width="2" stroke-dasharray="5 4" fill="none" stroke-linecap="round"/>`;
  const hp = top.sp.h.pts;
  if (g.shape !== 'trousers') body += `<path d="M${hp.map(([x, y]) => `${x.toFixed(1)} ${(y - 12).toFixed(1)}`).join(' L')}" stroke="${g.stitch}" stroke-width="1.8" stroke-dasharray="3 5" fill="none"/>`;
  if (g.shape === 'cardigan') {
    body += `<path d="M150 60 L150 ${g.hem[0] - 4}" stroke="rgba(0,0,0,.55)" stroke-width="3"/>`;
    for (let y = 85; y < g.hem[0] - 20; y += 34) body += `<circle cx="160" cy="${y}" r="5" fill="#5a3f26" stroke="#2b1d10" stroke-width="1.5"/><path d="M157 ${y} h6 M160 ${y - 3} v6" stroke="${g.stitch}" stroke-width="1"/>`;
  }
  if (g.shape === 'hoodie') body += `<path d="M112 ${g.hem[0] - 72} L188 ${g.hem[0] - 72} L198 ${g.hem[0] - 28} L102 ${g.hem[0] - 28} Z" fill="rgba(0,0,0,.18)" stroke="${g.stitch}" stroke-width="1.8" stroke-dasharray="4 4"/><path d="M140 52 L136 100 M160 52 L164 104" stroke="${g.stitch}" stroke-width="2"/>`;
  // darning patches
  for (let i = 0; i < (g.darn || 0); i++) {
    const x = 100 + r() * 80, y = (g.shape === 'trousers' ? 170 : 110) + r() * 80, w = 18 + r() * 14, hh = 14 + r() * 12;
    let lines = ''; for (let k = 2; k < w; k += 4) lines += `M${(x + k).toFixed(1)} ${y.toFixed(1)} v${hh.toFixed(1)} `;
    for (let k = 2; k < hh; k += 4) lines += `M${x.toFixed(1)} ${(y + k).toFixed(1)} h${w.toFixed(1)} `;
    body += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${hh.toFixed(1)}" fill="rgba(0,0,0,.15)" transform="rotate(${(r() * 16 - 8).toFixed(1)} ${x} ${y})"/><path d="${lines}" stroke="${g.stitch}" stroke-width="1.4" opacity=".9"/>`;
  }
  return `<svg viewBox="20 -15 260 360" xmlns="http://www.w3.org/2000/svg" role="img"><defs>${defs}</defs><g filter="url(#w${u})">${body}</g></svg>`;
}
const media = (p) => p.img ? `<img src="${p.img}" alt="${p.name}" loading="lazy" data-vimg="${p.id}">` : garmentSVG(p.g);
/* colour variants: swatch buttons swap p.img everywhere it's shown */
const swatches = (p) => p.variants ? `<div class="swatches">${p.variants.map(v =>
  `<button class="swatch ${v.img===p.img?'on':''}" data-var="${p.id}|${v.img}" title="${v.name}" aria-label="${v.name} variant" style="--c:${v.hex}"></button>`).join('')}</div>` : '';
function setVariant(id, img) {
  const p = PRODUCTS.find(x => x.id === id), v = p.variants.find(x => x.img === img); p.img = img;
  if (v.title) p.name = v.title; if (v.desc) p.desc = v.desc;
  $$(`[data-vimg="${id}"]`).forEach(el => { el.src = img; el.alt = p.name; });
  $$(`[data-vname="${id}"]`).forEach(el => el.textContent = p.name);
  $$(`[data-vdesc="${id}"]`).forEach(el => el.textContent = p.desc);
  renderCart();
  $$(`[data-var^="${id}|"]`).forEach(b => b.classList.toggle('on', b.dataset.var === `${id}|${img}`));
}

/* ---------- AUDIO ---------- */
let AC, sound = true;
const blip = (f = 880, d = .05, type = 'square', v = .04) => {
  if (!sound) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const o = AC.createOscillator(), g = AC.createGain();
    o.type = type; o.frequency.setValueAtTime(f, AC.currentTime);
    g.gain.setValueAtTime(v, AC.currentTime);
    g.gain.exponentialRampToValueAtTime(.0001, AC.currentTime + d);
    o.connect(g).connect(AC.destination); o.start(); o.stop(AC.currentTime + d);
  } catch (e) {}
};
const sfx = {
  hover: () => blip(1400, .03, 'square', .015),
  click: () => blip(520, .07, 'square', .05),
  add:   () => { blip(660,.06); setTimeout(()=>blip(990,.08),60); },
  checkout: () => [523,659,784,1046].forEach((f,i)=>setTimeout(()=>blip(f,.12,'triangle',.06),i*90)),
  glitch: () => { for (let i=0;i<8;i++) setTimeout(()=>blip(100+Math.random()*1800,.03,'sawtooth',.03),i*25); },
  close: () => blip(300,.08,'square',.04),
};
document.addEventListener('mouseover', e => {
  const t = e.target.closest('.px-btn,.chip,.win-ctrls button,.qty button');
  if (t && !t.contains(e.relatedTarget)) sfx.hover();
});
document.addEventListener('mousedown', e => { if (e.target.closest('.px-btn,.chip,.win-ctrls button,.qty button')) sfx.click(); });
$('#btn-sound').onclick = e => { sound = !sound; e.currentTarget.textContent = 'SFX:' + (sound ? 'ON' : 'OFF'); };

/* ---------- CLOCK + STREAM ---------- */
const clock = $('#clock'), dateEl = $('#date');
const pad = n => String(n).padStart(2, '0');
(function tick() {
  const d = new Date();
  clock.innerHTML = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}<span class="ms">${String(d.getMilliseconds()).padStart(3,'0')}</span>`;
  dateEl.textContent = `${d.toDateString().toUpperCase()} // UNIX ${Math.floor(d/1000)} // TZ ${Intl.DateTimeFormat().resolvedOptions().timeZone.toUpperCase()}`;
  requestAnimationFrame(tick);
})();
const stream = $('#stream');
/* keep the split "&" on the same line as Ying / Yang */
function placeAmp() {
  const yy = $('.yy'), w = $('.yy-word'), amp = $('.yy-amp'); if (!yy || !w) return;
  const r = yy.getBoundingClientRect(), wr = w.getBoundingClientRect();
  amp.style.setProperty('--amp-b', (r.bottom - wr.bottom) + 'px');
}
document.fonts.ready.then(placeAmp); addEventListener('resize', placeAmp); addEventListener('load', placeAmp);
/* rotating Cyberpunk quotes, typed out like a terminal transmission */
const QUOTES = [
  ['I\u2019m sorry. I wish we could\u2019ve gone to the moon together.', 'David Martinez'],
  ['Because you were. You were perfect. Always have been.', 'Talia Yang'],
  ['See you in the major leagues, Jack...', 'V'],
];
stream.innerHTML = '<div class="q-label">&gt; incoming.transmission // NIGHT CITY</div><blockquote class="q-text"></blockquote><cite class="q-by"></cite>';
const qText = $('.q-text', stream), qBy = $('.q-by', stream);
(async function runQuotes() {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  for (let i = 0; ; i = (i + 1) % QUOTES.length) {
    const [q, by] = QUOTES[i];
    qBy.textContent = ''; qBy.classList.remove('in');
    for (let c = 0; c <= q.length; c++) { qText.innerHTML = `\u201C${q.slice(0, c)}<span class="caret"></span>`; await wait(38); }
    qText.innerHTML = `\u201C${q}\u201D<span class="caret"></span>`;
    qBy.textContent = `\u2014 ${by}`; qBy.classList.add('in');
    await wait(4200);
    for (let c = q.length; c >= 0; c -= 3) { qText.innerHTML = `\u201C${q.slice(0, c)}<span class="caret"></span>`; await wait(12); }
    qBy.classList.remove('in'); await wait(500);
  }
})();

/* ---------- HERO: hotspots, lens, click-zoom ---------- */
const look = $('#hero-look'), ch = $('#crosshair'), heroImg = $('#hero-img'), lens = $('#lens');
const hsLines = $('#hs-lines'), hsLayer = $('#hs-layer');
const LENS_Z = 2.5;
// size "do ya" so it spans exactly "LI" + half of "K"
function fitDoya() {
  const like = $('#like'), doya = $('#doya'), probe = document.createElement('span');
  probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap';
  probe.style.font = getComputedStyle(like).font; probe.style.letterSpacing = getComputedStyle(like).letterSpacing;
  probe.textContent = 'LI'; document.body.appendChild(probe); const li = probe.offsetWidth;
  probe.textContent = 'LIK'; const lik = probe.offsetWidth; probe.remove();
  const target = li + (lik - li) / 2;
  doya.style.fontSize = '20px';
  doya.style.fontSize = (20 * target / doya.offsetWidth) + 'px';
}
document.fonts.ready.then(fitDoya); addEventListener('resize', fitDoya);
// x/y = point on the photo (0-1 of natural image); bx/by = callout box position (0-1 of frame)
const LOOKS = [
  { src:'assets/hero.png', tag:'LOOK_01 / RAW-EDGE LAYER SYSTEM', alt:'Model wearing raw-edge grey wool tee layered over white thermal', hs:[
    { x:.37, y:.39, bx:.13, by:.36, t:'EXPOSED SEAM', s:'Hand-whipped overlock, left raw on the outside.' },
    { x:.53, y:.31, bx:.22, by:.11, t:'THERMAL COLLAR', s:'Organic waffle base layer, 1x1 rib neck.' },
    { x:.71, y:.51, bx:.87, by:.48, t:'RAW SLEEVE EDGE', s:'Cut, never hemmed. Frays with wear.' },
    { x:.365, y:.79, bx:.12, by:.74, t:'INNER LAYER', s:'Thermal sleeve, cuff shredded by hand.' },
    { x:.45, y:.725, bx:.84, by:.88, t:'ASYMMETRIC HEM', s:'\u22123.2cm drop, hand-unraveled.' } ]},
  { src:'assets/look2.jpg', tag:'LOOK_02 / CHARCOAL NIGHT SHIFT', alt:'Model walking away in charcoal darned beanie, charcoal ruin hoodie and black mended jeans', hs:[
    { x:.50, y:.15, bx:.17, by:.14, t:'CHARCOAL BEANIE', s:'Cream darns + hand-tacked canvas label.' },
    { x:.575, y:.33, bx:.85, by:.46, t:'RUIN HOODIE', s:'Loopback fleece, holes left open.' },
    { x:.52, y:.52, bx:.15, by:.42, t:'RAW HEM', s:'Hood + hem cut raw, white basting.' },
    { x:.46, y:.72, bx:.15, by:.68, t:'SASHIKO PATCH', s:'Black mended trouser, hand-stitched grid.' },
    { x:.585, y:.925, bx:.86, by:.84, t:'FRAYED HEM', s:'Released hem, pools over the boot.' } ]},
  { src:'assets/look3.jpg', tag:'LOOK_03 / OAT + MOSS FIELD KIT', alt:'Model walking away in oat layered longsleeve, peat sweater over shoulder, block scarf and moss cord patch pants', hs:[
    { x:.645, y:.36, bx:.85, by:.42, t:'OAT LAYER', s:'Raw-edge tee bonded over waffle.' },
    { x:.48, y:.39, bx:.15, by:.28, t:'PEAT SWEATER', s:'Darned in mustard + cream, worn slung.' },
    { x:.51, y:.52, bx:.15, by:.54, t:'UNRAVEL SCARF', s:'Oat/moss blocks, fringe pulled by hand.' },
    { x:.69, y:.585, bx:.86, by:.63, t:'WAFFLE CUFF', s:'Thermal sleeve, frayed thumb-hole.' },
    { x:.60, y:.64, bx:.86, by:.85, t:'CORD PATCH PANT', s:'Moss/olive/tobacco offcuts, zig-zag seams.' } ]},
];
let curLook = 0, HOTSPOTS = LOOKS[0].hs;
function geo() {
  const cw = look.clientWidth, chh = look.clientHeight, iw = heroImg.naturalWidth || 1, ih = heroImg.naturalHeight || 1;
  const s = Math.max(cw / iw, chh / ih), W = iw * s, H = ih * s;
  return { cw, ch: chh, W, H, ox: (cw - W) / 2, oy: (chh - H) / 2 };
}
function buildHotspots() {
  const g = geo();
  hsLines.setAttribute('viewBox', `0 0 ${g.cw} ${g.ch}`);
  let svg = '', html = '';
  // keep callouts clear of the "do ya LIKE This?" composition
  const lr = look.getBoundingClientRect(), tr = $('.like-this').getBoundingClientRect();
  const no = { l: tr.left - lr.left - 90, r: tr.right - lr.left + 90, t: tr.top - lr.top - 90, b: tr.bottom - lr.top + 90 };
  HOTSPOTS.forEach((h, i) => {
    let px = g.ox + h.x * g.W, py = g.oy + h.y * g.H, bx = h.bx * g.cw, by = h.by * g.ch;
    if (bx > no.l && bx < no.r && by > no.t && by < no.b) by = no.b;
    const ex = bx + (px > bx ? 78 : -78); // leave box from its side, elbow toward point
    svg += `<path d="M${ex} ${by} L${(ex + px) / 2} ${by} L${px} ${py}" style="transition-delay:${i * 80}ms"/>
            <circle class="pulse" cx="${px}" cy="${py}" r="7"/><circle cx="${px}" cy="${py}" r="4.5"/>`;
    const tz = 2, bgW = g.W * tz, bgH = g.H * tz;
    html += `<div class="hs-box" style="left:${bx}px;top:${by}px;transition-delay:${i * 80}ms">
      <span class="n">0${i + 1}</span>
      <div class="thumb" style="background-image:url(${heroImg.src});background-size:${bgW}px ${bgH}px;background-position:${75 - h.x * bgW}px ${39 - h.y * bgH}px"></div>
      <div class="txt"><b>${h.t}</b>${h.s}</div></div>`;
  });
  hsLines.innerHTML = svg; hsLayer.innerHTML = html;
}
heroImg.complete ? buildHotspots() : heroImg.addEventListener('load', buildHotspots);
addEventListener('resize', buildHotspots);

lens.style.backgroundImage = `url(${heroImg.src})`;
/* look carousel: swaps photo + hotspots + tag; pauses while hovering/zooming */
const lookNav = $('#look-nav');
lookNav.innerHTML = LOOKS.map((l, i) => `<button class="${i ? '' : 'on'}" data-look="${i}" aria-label="Look ${i + 1}">0${i + 1}</button>`).join('');
function setLook(i) {
  if (i === curLook) return;
  curLook = i; const L = LOOKS[i];
  look.classList.add('swapping');
  setTimeout(() => {
    const done = () => {
      HOTSPOTS = L.hs; buildHotspots();
      lens.style.backgroundImage = `url(${L.src})`;
      $('#look-tag-title').textContent = L.tag;
      look.classList.remove('swapping');
    };
    heroImg.onload = done; heroImg.alt = L.alt; heroImg.src = L.src;
    if (heroImg.complete) { heroImg.onload = null; done(); }
  }, 350);
  $$('button', lookNav).forEach((b, k) => b.classList.toggle('on', k === i));
}
lookNav.addEventListener('click', e => { e.stopPropagation(); const b = e.target.closest('[data-look]'); if (b) setLook(+b.dataset.look); });
setInterval(() => { if (!look.matches(':hover')) setLook((curLook + 1) % LOOKS.length); }, 7000);
LOOKS.forEach(l => { const im = new Image(); im.src = l.src; }); // preload
look.addEventListener('mousemove', e => {
  const r = look.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
  ch.style.left = mx + 'px'; ch.style.top = my + 'px';
  if (look.classList.contains('zoomed')) { heroImg.style.transformOrigin = `${mx}px ${my}px`; return; }
  const g = geo(), lr = lens.clientWidth / 2;
  lens.style.backgroundSize = `${g.W * LENS_Z}px ${g.H * LENS_Z}px`;
  lens.style.backgroundPosition = `${lr - (mx - g.ox) * LENS_Z}px ${lr - (my - g.oy) * LENS_Z}px`;
});
look.addEventListener('click', e => {
  const r = look.getBoundingClientRect();
  heroImg.style.transformOrigin = `${e.clientX - r.left}px ${e.clientY - r.top}px`;
  const on = look.classList.toggle('zoomed');
  $('#zoom-state').textContent = on ? '// ZOOM 2.4\u00d7 \u2014 CLICK TO EXIT' : '// CLICK TO ZOOM';
  $('#lens-z').textContent = on ? 'PAN' : LENS_Z + '\u00d7';
  blip(on ? 880 : 440, .08);
});
look.addEventListener('mouseleave', () => {
  look.classList.remove('zoomed'); $('#zoom-state').textContent = '// CLICK TO ZOOM'; $('#lens-z').textContent = LENS_Z + '\u00d7';
});

/* ---------- PRODUCTS ---------- */
const state = { cat: 'ALL', max: 600, sort: 'serial', cart: JSON.parse(localStorage.getItem('at_cart') || '{}') };
const grid = $('#product-grid');
function renderProducts() {
  let list = PRODUCTS.filter(p => (state.cat === 'ALL' || p.cat === state.cat) && p.price <= state.max);
  if (state.sort === 'asc') list.sort((a,b) => a.price - b.price);
  if (state.sort === 'desc') list.sort((a,b) => b.price - a.price);
  $('#result-count').textContent = pad(list.length);
  grid.innerHTML = list.length ? list.map((p, i) => `
    <article class="card" style="animation-delay:${i*60}ms" data-id="${p.id}">
      <div class="card-img" style="background:${p.bg}">
        <span class="card-serial">N°${pad(PRODUCTS.indexOf(p)+1)} // ${p.cat}</span>
        ${p.badge ? `<span class="card-badge">${p.badge}</span>` : ''}
        ${media(p)}${swatches(p)}
      </div>
      <div class="card-info">
        <span class="sku">SKU // ${p.sku}</span>
        <h3 data-vname="${p.id}">${p.name}</h3>
        <div class="card-row">
          <span class="price">€${p.price}</span>
          <div class="card-actions">
            <button class="px-btn small ghost" data-quick="${p.id}" id="qv-${p.id}">VIEW</button>
            <button class="px-btn small accent" data-add="${p.id}" id="add-${p.id}">+ ADD</button>
          </div>
        </div>
      </div>
    </article>`).join('') : `<div class="empty">// NO GARMENTS MATCH QUERY. ADJUST FILTER.SYS</div>`;
}

/* ---------- FILTERS ---------- */
const cats = ['ALL', ...new Set(PRODUCTS.map(p => p.cat))];
$('#chips-cat').innerHTML = cats.map(c => `<button class="chip ${c==='ALL'?'on':''}" data-cat="${c}">${c}</button>`).join('');
$('#chips-cat').onclick = e => { const b = e.target.closest('[data-cat]'); if (!b) return;
  $$('#chips-cat .chip').forEach(c => c.classList.toggle('on', c === b)); state.cat = b.dataset.cat; renderProducts(); };
$('#chips-sort').onclick = e => { const b = e.target.closest('[data-sort]'); if (!b) return;
  $$('#chips-sort .chip').forEach(c => c.classList.toggle('on', c === b)); state.sort = b.dataset.sort; renderProducts(); };
$('#price-range').oninput = e => { state.max = +e.target.value; $('#price-val').textContent = '€' + state.max; renderProducts(); };

/* ---------- CART ---------- */
const save = () => localStorage.setItem('at_cart', JSON.stringify(state.cart));
function renderCart() {
  const ids = Object.keys(state.cart);
  let total = 0, count = 0;
  $('#cart-list').innerHTML = ids.length ? ids.map(id => {
    const p = PRODUCTS.find(x => x.id === id), q = state.cart[id];
    total += p.price * q; count += q;
    return `<li class="cart-item">${media(p)}
      <div><h4>${p.name}</h4><span class="mono">${p.sku} — €${p.price}</span></div>
      <div class="qty"><button data-dec="${id}">−</button>${q}<button data-inc="${id}">+</button></div></li>`;
  }).join('') : `<li class="cart-empty">// BUFFER EMPTY<br>NO ANALOG OBJECTS QUEUED</li>`;
  $('#cart-total').textContent = '€' + total;
  $('#cart-count').textContent = count;
  save();
}
function addToCart(id) {
  state.cart[id] = (state.cart[id] || 0) + 1;
  renderCart(); sfx.add();
  toast(`+1 ${PRODUCTS.find(p => p.id === id).sku} → CART.EXE`);
  const c = $('#btn-cart'); c.classList.add('pressed'); setTimeout(() => c.classList.remove('pressed'), 120);
}
$('#cart-list').onclick = e => {
  const inc = e.target.dataset.inc, dec = e.target.dataset.dec;
  if (inc) state.cart[inc]++;
  if (dec && --state.cart[dec] <= 0) delete state.cart[dec];
  renderCart();
};
$('#btn-checkout').onclick = () => {
  if (!Object.keys(state.cart).length) { toast('ERR // CART EMPTY'); blip(150,.2,'sawtooth',.05); return; }
  sfx.checkout();
  const btn = $('#btn-checkout'); let i = 0;
  const steps = ['ENCRYPTING ▒▒░░░','VERIFYING ▒▒▒▒░','TRANSMITTING ▒▒▒▒▒','ORDER CONFIRMED ✓'];
  const iv = setInterval(() => { btn.textContent = steps[i++]; if (i === steps.length) { clearInterval(iv);
    toast(`ORDER #AT-${Math.random()*99999|0} LOGGED. YOUR IMPERFECTIONS SHIP SOON.`);
    state.cart = {}; renderCart(); setTimeout(() => btn.textContent = 'EXECUTE CHECKOUT ▸', 1800); } }, 450);
};

/* ---------- TOAST ---------- */
let tt;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2200); }

/* ---------- WINDOWS (drag OS) ---------- */
let zTop = 600;
function focusWin(w) { $$('.win').forEach(x => x.classList.remove('active')); w.classList.add('active'); w.style.zIndex = ++zTop; }
function openWin(id, pos) {
  const w = $('#' + id);
  if (!w.hidden) { focusWin(w); w.classList.remove('min'); return w; }
  w.hidden = false; w.classList.remove('min', 'closing');
  if (!w.dataset.placed) {
    const p = pos || { x: innerWidth/2 - w.offsetWidth/2, y: 110 };
    w.style.left = Math.max(10, Math.min(p.x, innerWidth - w.offsetWidth - 10)) + 'px';
    w.style.top = Math.max(80, p.y) + 'px'; w.dataset.placed = 1;
  }
  focusWin(w); return w;
}
function closeWin(w) { sfx.close(); w.classList.add('closing'); setTimeout(() => { w.hidden = true; w.classList.remove('closing'); }, 180); }
$$('[data-win]').forEach(w => {
  const bar = $('[data-drag]', w);
  w.addEventListener('pointerdown', () => focusWin(w));
  $('[data-close]', w).onclick = () => closeWin(w);
  $('[data-min]', w).onclick = () => w.classList.toggle('min');
  bar.addEventListener('pointerdown', e => {
    if (e.target.closest('button')) return;
    const r = w.getBoundingClientRect(), ox = e.clientX - r.left, oy = e.clientY - r.top;
    bar.setPointerCapture(e.pointerId); w.style.transition = 'none';
    const move = ev => {
      w.style.left = Math.max(-r.width + 80, Math.min(innerWidth - 80, ev.clientX - ox)) + 'px';
      w.style.top = Math.max(0, Math.min(innerHeight - 40, ev.clientY - oy)) + 'px';
    };
    const up = () => { bar.removeEventListener('pointermove', move); bar.removeEventListener('pointerup', up); blip(240,.04); };
    bar.addEventListener('pointermove', move); bar.addEventListener('pointerup', up);
  });
});
$('#btn-cart').onclick = () => openWin('win-cart', { x: innerWidth - 400, y: 90 });
$('#btn-filter').onclick = () => openWin('win-filter', { x: 30, y: 110 });

/* ---------- QUICK VIEW ---------- */
function quickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  $('#qv-title').textContent = `${p.sku}.IMG`;
  $('#qv-body').innerHTML = `
    <div class="qv-img" style="background:${p.bg}"><span class="card-serial">N°${pad(PRODUCTS.indexOf(p)+1)}</span>${media(p)}${swatches(p)}</div>
    <div>
      <span class="mono">SKU // ${p.sku} — CAT // ${p.cat}</span>
      <h3 data-vname="${p.id}">${p.name}</h3>
      <p class="mono" style="margin:.6rem 0" data-vdesc="${p.id}">${p.desc}</p>
      <div class="mono label">CATALOGUED IMPERFECTIONS</div>
      <ul class="qv-flaws">${p.flaws.map(f => `<li>▸ ${f}</li>`).join('')}</ul>
      <div class="sizes">${['S','M','L','XL'].map((s,i) => `<button class="chip ${i===1?'on':''}" data-size>${s}</button>`).join('')}</div>
      <div class="card-row"><span class="price">€${p.price}</span><button class="px-btn accent" data-add="${p.id}">+ ADD TO CART</button></div>
    </div>`;
  $$('[data-size]', $('#qv-body')).forEach(b => b.onclick = () => { $$('[data-size]').forEach(x => x.classList.toggle('on', x === b)); });
  openWin('win-quick');
}

/* ---------- GLOBAL DELEGATION ---------- */
document.addEventListener('click', e => {
  const sw = e.target.closest('[data-var]'); if (sw) { const [id, img] = sw.dataset.var.split('|'); return setVariant(id, img); }
  const st = e.target.closest('[data-style]'); if (st) { const [id, img] = st.dataset.style.split('|'); if (img) setVariant(id, img); return quickView(id); }
  const add = e.target.closest('[data-add]'); if (add) return addToCart(add.dataset.add);
  const q = e.target.closest('[data-quick]'); if (q) return quickView(q.dataset.quick);
  const card = e.target.closest('.card'); if (card && !e.target.closest('button')) quickView(card.dataset.id);
});

/* ---------- EXPLODED VIEW (manual slider) ---------- */
const stage = $('#ex-stage'), exSlider = $('#ex-slider');
exSlider.addEventListener('input', () => {
  const v = +exSlider.value;
  stage.style.setProperty('--s', (v / 100).toFixed(3));
  exSlider.style.setProperty('--v', v + '%');
  $('#ex-pct').textContent = v + '%';
  if (v % 10 === 0) blip(300 + v * 8, .03, 'square', .02);
});


/* ---------- TRAILING PIXEL CURSOR ---------- */
const cur = $('#cursor');
addEventListener('pointermove', e => { cur.style.transform = `translate(${e.clientX + 14}px,${e.clientY + 14}px)`; });

/* ---------- TEXT ANIMATIONS ---------- */
let typeRun = 0; // bumps on replay to cancel in-flight typing
function typewrite(el, done, speed = 16, keepCaret = true) {
  const text = el.dataset.text ||= el.textContent.trim(), run = typeRun;
  el.innerHTML = `<span class="ghost">${text}</span><span class="typed"><span class="t"></span><span class="caret"></span></span>`;
  const t = $('.t', el); let i = 0;
  (function step() {
    if (run !== typeRun) return;
    t.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(step, text[i - 1] === '.' ? speed * 9 : speed + Math.random() * speed * 1.3);
    else { done && done(); if (!keepCaret) setTimeout(() => $('.caret', el)?.remove(), 900); }
  })();
}
function countUp(b) {
  const n = +b.dataset.count, suf = b.dataset.suffix || '', t0 = performance.now(), dur = 1600, run = typeRun;
  (function f(now) {
    if (run !== typeRun) return;
    const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
    b.textContent = Math.round(n * e) + suf;
    if (p < 1) requestAnimationFrame(f);
  })(t0);
}
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  const el = en.target; io.unobserve(el);
  if (el.hasAttribute('data-type')) return typewrite(el, null, 9, false);
  el.classList.add('in');
  if (el.classList.contains('stats')) $$('[data-count]', el).forEach((b, i) => setTimeout(() => countUp(b), i * 150));
}), { threshold: .3 });
const observeAll = () => $$('[data-anim],[data-type]').forEach(el => io.observe(el));
const startHero = () => setTimeout(() => typewrite($('#type-p'), () => $('#hero-cta').classList.add('in')), 900);
observeAll(); startHero();

/* ---------- REPLAY ---------- */
$('#btn-replay').addEventListener('click', () => {
  typeRun++; sfx.checkout();
  document.body.classList.add('no-anim');
  $$('[data-anim],#hero-cta').forEach(el => el.classList.remove('in'));
  $$('[data-count]').forEach(b => b.textContent = '0' + (b.dataset.suffix || ''));
  $$('[data-type]').forEach(el => { if (el.dataset.text) el.textContent = el.dataset.text; });
  const tp = $('#type-p'); tp.innerHTML = `<span class="ghost">${tp.dataset.text}</span>`;
  void document.body.offsetWidth;
  document.body.classList.remove('no-anim');
  scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => { renderProducts(); observeAll(); startHero(); }, 750);
});

renderProducts(); renderCart();
})();
