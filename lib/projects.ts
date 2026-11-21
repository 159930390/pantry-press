export const root=process.env.NEXT_PUBLIC_BASE_PATH||"";
export const art=(id:string)=>root+"/art/"+id+".webp";
export type Tile={name:string;src:string};
export type Folio={title:string;en:string;category:string;photos:string[];hero:string;stamp:string;ingredients:Tile[];steps:Tile[];chart?:string;positions:Record<string,[number,number]>;spread:[number,number]};
function tiles(names:string[],files:string[]):Tile[]{return names.map((name,i)=>({name,src:art(files[i])}))}
export const projects=[
{slug:"chilli-noodles",title:"肉末辣汤面",en:"Chilli Noodle Soup",category:"面食",photos:[art("noodle-photo")],hero:art("hero"),stamp:art("seal"),ingredients:tiles(["面条","青菜","肉末","辣油","葱","豆子"],["noodles","greens","pork","oil","onion","beans"]),steps:tiles(["煮面","炒肉","调汤","装碗"],["boil","brown","season","serve"]),chart:art("noodle-chart")},
{slug:"mango-rice",title:"芒果糯米饭",en:"Mango Sticky Rice",category:"甜品",photos:[art("mango-photo")],hero:art("mango"),stamp:art("mango-seal"),ingredients:tiles(["芒果","糯米","椰浆"],["m0","m1","m2"]),steps:[]},
{slug:"chilli-wontons",title:"红油抄手",en:"Chilli Wontons",category:"面食",photos:[art("wonton-photo")],hero:art("wontons"),stamp:art("wontons-seal"),ingredients:tiles(["馄饨","辣油"],["w0","oil"]),steps:[]}
].map(p=>({...p,positions:{},spread:[1,1] as [number,number]}));
export function draft(photos:string[]):Folio{return {title:"我的餐桌",en:"From my kitchen",category:"个人作品",photos,hero:"",stamp:"",ingredients:[],steps:[],positions:{},spread:[1,1]}}