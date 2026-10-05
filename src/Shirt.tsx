import type {Product} from './data';
// Original abstract compression-shirt art, used until real product photos are wired in.
const BODY={Long:'M30 8 L10 22 L2 80 L14 82 L22 40 V104 H78 V40 L86 82 L98 80 L90 22 L70 8 Q50 20 30 8Z',Short:'M30 8 L8 22 L16 44 L24 38 V104 H76 V38 L84 44 L92 22 L70 8 Q50 20 30 8Z'};
const MARK:Record<Product['line'],string>={'Spider-Man':'M50 36V62M39 42L61 56M61 42L39 56M43 38L57 60M57 38L43 60','Bat Family':'M32 44Q41 38 50 46Q59 38 68 44Q64 56 50 64Q36 56 32 44Z',Invincible:'M36 40L50 64L64 40H57L50 52L43 40Z',Core:'M36 40L50 64L64 40H57L50 52L43 40Z'};
export default function Shirt({p,className=''}:{p:Product;className?:string}){
  const id=`g${p.id}`;
  return(<svg viewBox="0 0 100 110" className={className} role="img" aria-label={`${p.name}, ${p.sleeve} sleeve compression shirt`}>
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a2d36"/><stop offset="1" stopColor="#0b0c0f"/></linearGradient></defs>
    <path d={BODY[p.sleeve]} fill={`url(#${id})`} stroke={p.accent} strokeOpacity=".55"/>
    <path d={MARK[p.line]} fill="none" stroke={p.accent} strokeWidth="2.2" strokeLinejoin="round" style={{filter:`drop-shadow(0 0 3px ${p.accent})`}}/>
  </svg>);
}
