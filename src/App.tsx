import {useCallback,useEffect,useState} from 'react';
import {AnimatePresence,MotionConfig,motion,useScroll,useTransform,type Variants} from 'framer-motion';
import {ArrowRight,Check,ShoppingBag,X} from 'lucide-react';
import {Armory,BundleBuilder,Reviews,Tech} from './Sections';
import {BUNDLE_PRICE,CTA,fmt,type CartLine} from './data';

const WA='https://wa.me/201132507383';
const ease:[number,number,number,number]=[0.22,1,0.36,1];
const stack:Variants={hidden:{},show:{transition:{staggerChildren:.12,delayChildren:.1}}};
const rise:Variants={hidden:{opacity:0,y:24},show:{opacity:1,y:0,transition:{duration:.6,ease}}};
const mono='font-mono text-xs uppercase tracking-[.12em]';

function Nav({count,onCart}:{count:number;onCart:()=>void}){
  const links=[['The Armory','#armory'],['Bundle & Save','#bundle'],['Tech Specs','#tech'],['Reviews','#reviews']];
  return(<header className="sticky top-0 z-40 border-b border-plate bg-void/85 backdrop-blur-[20px]">
    <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 md:px-12">
      <a href="#top" className="flex items-center gap-3"><img src="/logo.png" alt="" width={40} height={38}/>
        <span className="font-display text-2xl uppercase tracking-[.04em] text-white">Viltrum <span className="text-crimson">Egypt</span></span></a>
      <nav aria-label="Primary" className="hidden gap-8 lg:flex">{links.map(([t,h])=>(
        <a key={h} href={h} className={`${mono} group relative py-2 text-slate-300 hover:text-white`}>{t}
          <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-crimson transition-transform group-hover:scale-x-100"/></a>))}</nav>
      <div className="flex items-center gap-3">
        <button onClick={onCart} aria-label={`Open cart, ${count} items`} className="relative grid h-11 w-11 place-items-center border border-line bg-armor text-white transition-colors hover:border-crimson">
          <ShoppingBag size={20}/>{count>0&&<motion.span key={count} initial={{scale:.4}} animate={{scale:1}} className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-crimson px-1 font-mono text-[11px] font-semibold text-white">{count}</motion.span>}</button>
        <a href="#bundle" className={`${CTA} hidden sm:inline-flex`}>Build bundle</a>
      </div></div></header>);
}

function Hero(){
  const {scrollY}=useScroll(); const y=useTransform(scrollY,[0,600],[0,120]);
  return(<section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden border-b border-line">
    <motion.img src="/hero.webp" alt="" aria-hidden width={1376} height={768} style={{y}} className="absolute inset-0 h-full w-full object-cover object-[62%_20%] opacity-50"/>
    <div className="grid-bg absolute inset-0"/><div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-void/30"/>
    <motion.div variants={stack} initial="hidden" animate="show" className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 py-20 text-center">
      <motion.p variants={rise} className={`${mono} mb-6 border border-line bg-armor/90 px-4 py-2 text-slate-300`}>Forged for the invincible. Est. 2024</motion.p>
      <motion.h1 variants={rise} className="font-display text-[44px] uppercase leading-[48px] tracking-[.03em] text-white md:text-[80px] md:leading-[84px]">Every hero<br/>needs a <span className="text-glow [text-shadow:0_0_35px_rgba(255,42,77,.6)]">suit.</span></motion.h1>
      <motion.p variants={rise} className="mt-6 max-w-2xl text-lg text-slate-300">Compression armor engineered for warriors who refuse to break. Four-way tensile weave, targeted muscle alignment, zero moisture compromise.</motion.p>
      <motion.div variants={rise} className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
        <a href="#armory" className={`${CTA} w-full sm:w-auto`}>Enter the archive <ArrowRight size={18}/></a>
        <a href="#bundle" className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 border border-[#3F4654] px-7 py-3 font-display text-[17px] uppercase tracking-[.06em] text-white transition-colors hover:border-white hover:bg-plate sm:w-auto">Build your bundle <span className="font-mono text-xs text-ember">{BUNDLE_PRICE} EGP</span></a></motion.div>
      <motion.ul variants={rise} className={`${mono} mt-14 grid w-full max-w-3xl gap-4 border-t border-line pt-6 text-slate-400 md:grid-cols-3`}>
        {['4-way high tensile stretch','Anti-chafe flatlock seams','Thermoregulating fabric'].map(t=><li key={t} className="flex items-center justify-center gap-2"><Check size={14} className="text-crimson"/>{t}</li>)}</motion.ul>
    </motion.div></section>);
}

function Cart({open,lines,onClose,onRemove}:{open:boolean;lines:CartLine[];onClose:()=>void;onRemove:(k:string)=>void}){
  useEffect(()=>{if(!open)return;const h=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose()};window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h)},[open,onClose]);
  const total=lines.reduce((a,l)=>a+l.price,0);
  const msg=encodeURIComponent(`Hi Viltrum, I want to order:\n${lines.map(l=>`- ${l.product.name} (${l.product.sleeve} sleeve), size ${l.size}${l.bundle?' [bundle]':''}`).join('\n')}\nTotal: ${fmt(total)}`);
  return(<AnimatePresence>{open&&[
    <motion.div key="bd" className="fixed inset-0 z-50 bg-black/70" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}/>,
    <motion.aside key="dr" role="dialog" aria-modal="true" aria-label="Cart" className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-line bg-armor" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{duration:.3,ease}}>
      <div className="flex items-center justify-between border-b border-line p-5"><h2 className="font-display text-2xl uppercase tracking-[.04em] text-white">Your cart</h2>
        <button autoFocus onClick={onClose} aria-label="Close cart" className="grid h-11 w-11 place-items-center border border-line text-white hover:border-crimson"><X size={20}/></button></div>
      <ul className="flex-1 space-y-3 overflow-y-auto p-5">{lines.length===0&&<li className="text-slate-400">Your cart is empty. Pick a suit from the armory.</li>}
        {lines.map(l=>(<li key={l.key} className="flex items-center justify-between gap-3 border border-line bg-void p-3">
          <div><p className="font-bold text-white">{l.product.name}</p><p className="font-mono text-xs text-slate-400">{l.product.sleeve} sleeve, size {l.size}{l.bundle?', bundle':''}</p></div>
          <div className="flex items-center gap-3"><span className="font-mono text-white">{fmt(l.price)}</span>
            <button onClick={()=>onRemove(l.key)} aria-label={`Remove ${l.product.name}`} className="grid h-11 w-11 place-items-center text-slate-400 hover:text-crimson"><X size={16}/></button></div></li>))}</ul>
      <div className="space-y-4 border-t border-line p-5"><p className="flex justify-between font-mono text-white"><span className={mono}>Total</span>{fmt(total)}</p>
        <a href={lines.length?`${WA}?text=${msg}`:undefined} aria-disabled={!lines.length} target="_blank" rel="noopener noreferrer" className={`${CTA} w-full ${lines.length?'':'pointer-events-none opacity-40'}`}>Order on WhatsApp</a></div>
    </motion.aside>]}</AnimatePresence>);
}

export default function App(){
  const [lines,setLines]=useState<CartLine[]>([]); const [open,setOpen]=useState(false);
  const add=useCallback((l:CartLine[])=>{setLines(c=>[...c,...l]);setOpen(true)},[]);
  const remove=useCallback((k:string)=>setLines(c=>c.filter(l=>l.key!==k)),[]);
  const close=useCallback(()=>setOpen(false),[]);
  return(<MotionConfig reducedMotion="user">
    <aside className="border-b border-crimson/20 bg-[#0a0507] px-4 py-2 text-center font-mono text-xs text-slate-300">Free shipping over <b className="text-white">1,000 EGP</b>. Any 2 suits for <b className="text-ember">{BUNDLE_PRICE} EGP</b>.</aside>
    <Nav count={lines.length} onCart={()=>setOpen(true)}/>
    <main id="top"><Hero/><BundleBuilder onAdd={add}/><Armory onAdd={add}/><Tech/><Reviews/></main>
    <footer className="border-t border-line bg-[#08090C]"><div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 md:grid-cols-3 md:px-12">
      <div><p className="font-display text-3xl uppercase text-white">Built for heroes.<br/><span className="text-crimson">Worn by legends.</span></p>
        <p className="mt-3 max-w-sm text-slate-400">Compression gear engineered in Cairo for the dedicated athlete.</p></div>
      <nav aria-label="Footer"><h3 className={`${mono} mb-4 text-white`}>Armory</h3><ul className="space-y-2 text-slate-400">{[['The Armory','#armory'],['2-piece bundle','#bundle'],['Tech specs','#tech']].map(([t,h])=><li key={h}><a className="hover:text-white" href={h}>{t}</a></li>)}</ul></nav>
      <div><h3 className={`${mono} mb-4 text-white`}>Contact</h3><ul className="space-y-2 text-slate-400"><li><a className="hover:text-white" href={WA}>+20 113 250 7383 (WhatsApp)</a></li><li><a className="hover:text-white" href="mailto:info@viltrumegypt.com">info@viltrumegypt.com</a></li><li>Cairo, Egypt</li></ul></div>
    </div><p className="border-t border-line py-6 text-center font-mono text-xs text-slate-400">© 2026 VILTRUM EGYPT. Engineered by Ammar Mokhtar.</p></footer>
    <Cart open={open} lines={lines} onClose={close} onRemove={remove}/>
  </MotionConfig>);
}
