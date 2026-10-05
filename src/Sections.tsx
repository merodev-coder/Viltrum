import {useState} from 'react';
import {AnimatePresence,motion} from 'framer-motion';
import {Activity,ArrowRight,Check,Shield,Waves} from 'lucide-react';
import Shirt from './Shirt';
import {BUNDLE_PRICE,CTA,PRODUCTS,REVIEWS,SIZES,fmt,uid,type CartLine,type Product,type Size} from './data';

type Add={onAdd:(l:CartLine[])=>void};
const label='font-mono text-[11px] uppercase tracking-[.12em] text-slate-400';
const wrap='mx-auto max-w-[1440px] px-4 md:px-12';
type Slot={id:string;size:Size};

export function BundleBuilder({onAdd}:Add){
  const [slots,setSlots]=useState<Slot[]>([{id:'2',size:'L'},{id:'3',size:'XL'}]);
  const items=slots.map(s=>({...s,p:PRODUCTS.find(x=>x.id===s.id)!}));
  const regular=items.reduce((a,i)=>a+i.p.price,0);
  const save=Math.max(0,regular-BUNDLE_PRICE);
  const set=(i:number,patch:Partial<Slot>)=>setSlots(s=>s.map((x,j)=>j===i?{...x,...patch}:x));
  return(<section id="bundle" className="border-b border-line bg-[#08090C] py-20"><div className={wrap}>
    <div className="mb-8 flex flex-col justify-between gap-6 border border-crimson/40 bg-armor p-6 shadow-[0_0_24px_rgba(230,25,56,.2)] md:flex-row md:items-center">
      <div><h2 lang="ar" dir="rtl" className="text-left font-ar text-3xl text-white">اختار أي 2 تيشرت ووفر 110 جنيه</h2>
        <p className="mt-2 text-slate-400">Pick any 2 suits for {fmt(BUNDLE_PRICE)} instead of {fmt(960)}.</p></div>
      <p className="font-mono text-ember">Bundle price <span className="text-3xl text-white">{BUNDLE_PRICE}</span> EGP</p>
    </div>
    <div className="grid gap-6 lg:grid-cols-2">
      {items.map((it,i)=>(<div key={i} className="border border-line bg-armor p-5">
        <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
          <h3 className="font-display text-xl uppercase tracking-[.04em] text-white">Suit {i+1}</h3>
          <span className="inline-flex items-center gap-1 font-mono text-xs text-emerald-400"><Check size={14}/>Locked in</span></div>
        <div className="flex items-center gap-4">
          <div className="grid h-24 w-24 shrink-0 place-items-center border border-line bg-void">
            <motion.div key={it.p.id} initial={{opacity:0,scale:.85}} animate={{opacity:1,scale:1}}><Shirt p={it.p} className="h-20 w-[72px]"/></motion.div></div>
          <div className="min-w-0 flex-1"><label htmlFor={`slot${i}`} className={`${label} mb-1 block`}>Armor</label>
            <select id={`slot${i}`} value={it.id} onChange={e=>set(i,{id:e.target.value})} className="min-h-[44px] w-full border border-line bg-[#0E1015] px-3 text-white focus:border-crimson">
              {PRODUCTS.map(p=><option key={p.id} value={p.id}>{p.name} ({p.sleeve})</option>)}</select></div></div>
        <fieldset className="mt-4"><legend className={`${label} mb-2`}>Fit size</legend>
          <div className="grid grid-cols-5 gap-2">{SIZES.map(s=>(<button key={s} type="button" aria-pressed={it.size===s} onClick={()=>set(i,{size:s})}
            className={`min-h-[44px] border font-mono text-sm transition-colors ${it.size===s?'border-crimson bg-crimson text-white shadow-[0_0_24px_rgba(230,25,56,.45)]':'border-line bg-[#0E1015] text-slate-300 hover:border-slate-400'}`}>{s}</button>))}</div></fieldset>
      </div>))}
    </div>
    <div className="sticky bottom-4 z-30 mt-8 flex flex-col items-center justify-between gap-4 border border-line bg-[#0C0E13]/90 p-4 backdrop-blur-[16px] md:flex-row">
      <p className="flex flex-wrap items-baseline gap-x-4 font-mono"><span className={label}>Bundle total</span>
        <span className="text-2xl text-white">{fmt(BUNDLE_PRICE)}</span><s className="text-sm text-slate-400">{fmt(regular)}</s>
        <motion.span key={save} initial={{y:-8,opacity:0}} animate={{y:0,opacity:1}} className="text-ember">Save {fmt(save)}</motion.span></p>
      <button className={`${CTA} w-full md:w-auto`} onClick={()=>onAdd(items.map(i=>({key:uid(),product:i.p,size:i.size,price:BUNDLE_PRICE/2,bundle:true})))}>
        Claim bundle <ArrowRight size={18}/></button>
    </div></div></section>);
}

const FILTERS=['All gear','Spider-Man','Invincible','Bat Family','Long sleeve','Short sleeve'];
const match=(p:Product,f:string)=>f==='All gear'||p.line===f||`${p.sleeve} sleeve`.toLowerCase()===f.toLowerCase();

export function Armory({onAdd}:Add){
  const [f,setF]=useState(FILTERS[0]);
  const list=PRODUCTS.filter(p=>match(p,f));
  return(<section id="armory" className="py-24"><div className={wrap}>
    <div className="mb-10 flex flex-col justify-between gap-6 border-b border-line pb-6 md:flex-row md:items-end">
      <div><h2 className="font-display text-5xl uppercase tracking-[.04em] text-white">The Armory</h2>
        <p className="mt-2 text-slate-400">Heroes collection. Choose your mantle.</p></div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter products">{FILTERS.map(x=>(
        <button key={x} aria-pressed={f===x} onClick={()=>setF(x)} className={`min-h-[44px] rounded-full border px-4 font-mono text-xs uppercase tracking-wider transition-colors ${f===x?'border-crimson bg-crimson text-white':'border-line bg-armor text-slate-300 hover:border-slate-400'}`}>{x}</button>))}</div>
    </div>
    <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"><AnimatePresence mode="popLayout">
      {list.map(p=>(<motion.article layout key={p.id} initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.96}} transition={{duration:.25}}
        className="group flex flex-col overflow-hidden rounded border border-line bg-armor transition-colors focus-within:border-crimson hover:border-crimson">
        <div className="relative grid min-h-[270px] place-items-center bg-gradient-to-b from-[#161A22] to-[#0B0C0F]">
          <span className="absolute left-3 top-3 border border-line bg-void px-2 py-0.5 font-mono text-[11px] uppercase tracking-[.12em] text-slate-300">Hero edition</span>
          <span className="absolute right-3 top-3 bg-crimson px-2 py-0.5 font-mono text-[11px] font-semibold text-white">-{Math.round((1-p.price/p.was)*100)}%</span>
          <Shirt p={p} className="h-44 w-40 transition-transform duration-500 ease-out group-hover:scale-[1.04]"/>
          <div role="group" aria-label={`Add ${p.name} to cart by size`} className="absolute inset-x-3 bottom-3 flex gap-1 transition md:translate-y-2 md:opacity-0 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            {SIZES.map(s=><button key={s} onClick={()=>onAdd([{key:uid(),product:p,size:s,price:p.price}])} className="min-h-[44px] flex-1 border border-line bg-void/90 font-mono text-xs text-white transition-colors hover:border-crimson hover:bg-crimson">{s}</button>)}</div>
        </div>
        <div className="flex flex-1 flex-col gap-2 border-t border-line p-4">
          <p className={label}>{p.sleeve} sleeve compression</p>
          <h3 className="font-display text-2xl uppercase leading-tight tracking-[.02em] text-white">{p.name}</h3>
          <p className="mt-auto flex items-baseline gap-2 pt-2 font-mono"><span className="text-white">{fmt(p.price)}</span><s className="text-xs text-slate-400">{fmt(p.was)}</s></p>
        </div></motion.article>))}
    </AnimatePresence></motion.div>
  </div></section>);
}

const TECH=[[Shield,'Invincible tensile weave','High-tenacity microfiber with reinforced elastane. Four-way stretch that holds its shape wash after wash.'],
[Activity,'Targeted muscle lock','Graduated compression panels support chest, shoulders and core through heavy lifts.'],
[Waves,'Zero-ride waistband','A micro-textured inner grip keeps the suit down through squats, grappling and sprints.']] as const;
export function Tech(){return(<section id="tech" className="border-y border-line bg-[#08090C] py-24"><div className={wrap}>
  <h2 className="mb-10 text-center font-display text-4xl uppercase tracking-[.04em] text-white">Mil-spec compression armor tech</h2>
  <div className="grid gap-6 md:grid-cols-3">{TECH.map(([Icon,t,d])=>(<div key={t} className="border border-line bg-armor p-6">
    <Icon className="mb-4 text-volt" size={28}/><h3 className="mb-2 font-display text-2xl uppercase tracking-[.02em] text-white">{t}</h3><p className="text-slate-400">{d}</p></div>))}</div>
</div></section>);}

export function Reviews(){return(<section id="reviews" className="py-24"><div className={wrap}>
  <h2 className="mb-10 text-center font-display text-4xl uppercase tracking-[.04em] text-white">Customer reviews</h2>
  <div className="grid gap-6 md:grid-cols-3">{REVIEWS.map(r=>(<figure key={r.name} className="flex flex-col justify-between border border-line bg-armor p-6">
    <div><div className="mb-4 flex items-center justify-between"><span className="text-ember" aria-label="5 out of 5 stars">★★★★★</span>
      <span className="border border-emerald-800/50 bg-emerald-950/40 px-2 py-0.5 font-mono text-[11px] text-emerald-400">Verified buyer, {r.city}</span></div>
      <blockquote lang={r.ar?'ar':undefined} dir={r.ar?'rtl':undefined} className={`text-slate-300 ${r.ar?'text-left font-ar':''}`}>{r.text}</blockquote></div>
    <figcaption className="mt-4 border-t border-line pt-4"><p className="font-bold text-white">{r.name}</p><p className="font-mono text-xs text-crimson">Ordered: {r.item}</p></figcaption>
  </figure>))}</div>
</div></section>);}
