export const SIZES=['S','M','L','XL','XXL'] as const;
export type Size=typeof SIZES[number];
export type Line='Spider-Man'|'Bat Family'|'Invincible'|'Core';
export interface Product{id:string;name:string;sleeve:'Long'|'Short';line:Line;price:number;was:number;accent:string}
export interface CartLine{key:string;product:Product;size:Size;price:number;bundle?:boolean}
export const BUNDLE_PRICE=850;
export const fmt=(n:number)=>`EGP ${n.toLocaleString('en-US')}`;
export const uid=()=>Math.random().toString(36).slice(2);
// Primary combat CTA: crimson, chamfered corner, white energy strip (DESIGN.md)
export const CTA='chamfer relative inline-flex min-h-[44px] items-center justify-center gap-2 bg-crimson px-7 py-3 font-display text-[17px] uppercase tracking-[.06em] text-white transition-colors hover:bg-glow before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-white/80';
const ACCENT:Record<Line,string>={'Spider-Man':'#E61938','Bat Family':'#38BDF8',Invincible:'#F59E0B',Core:'#E3E2E6'};
const P=(id:string,name:string,sleeve:Product['sleeve'],line:Line,price=480,was=600):Product=>({id,name,sleeve,line,price,was,accent:ACCENT[line]});
// Names and prices from viltrumegypt.vercel.app. Swap in real ids/images from your backend.
export const PRODUCTS:Product[]=[
P('1','Superior Spider-Man','Short','Spider-Man'),P('2','Superior Spider-Man','Long','Spider-Man'),
P('3','Night Wing','Long','Bat Family'),P('4','Red Hood','Short','Bat Family'),
P('5','Conquest','Long','Invincible'),P('6','Conquest','Short','Invincible'),
P('7','Viltrum T-Shirt','Short','Core',400,500),P('8','Thragg','Short','Invincible'),
P('9','Night Wing','Short','Bat Family'),P('10','Spider-Man','Short','Spider-Man'),P('11','Spider-Man','Long','Spider-Man')];
// SAMPLE reviews from the Stitch mock. Replace with real customer reviews before launch.
export const REVIEWS=[
{name:'Karim Taha',city:'Cairo',item:'Superior Spider-Man (L)',text:'The compression is insane. Feels like a second skin and keeps my chest supported during heavy bench presses.'},
{name:'Omar El-Sayed',city:'Alexandria',item:'2-shirt bundle',text:'العرض بتاع التيشرتين ب 850 صفقة ممتازة. خامة محترمة واستريتش حقيقي مش بيبهت في الغسيل.',ar:true},
{name:'Youssef Mansour',city:'Giza',item:'Nightwing (XL)',text:'The waistband stays locked in place through 90-minute wrestling drills without riding up.'}];
