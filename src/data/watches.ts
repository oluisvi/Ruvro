export type WatchStatus = "available" | "reserved" | "sold" | "private" | "demo";
export type Watch = { slug:string; name:string; edition:string; status:WatchStatus; image:string; alt:string; tone:"graphite"|"steel"|"porcelain"; note:string; facts?:ReadonlyArray<{label:string;value:string}>; gallery?:ReadonlyArray<string>; spinFrames?:ReadonlyArray<string>; sourceLabel?:string };

const SOURCE = "Acervo da comunidade Ruvro";
const note = "Registro visual de curadoria fornecido pela Ruvro. Disponibilidade e informações comerciais devem ser confirmadas diretamente com a equipe.";
const gallery = (slug:string,count:number) => Array.from({length:count},(_,index)=>`/media/community/${slug}/gallery-${String(index+1).padStart(2,"0")}.webp`);
const spins = (slug:string) => Array.from({length:6},(_,index)=>`/media/community/${slug}/spin-${String(index+1).padStart(2,"0")}.webp`);
function watch(slug:string,name:string,edition:string,galleryCount:number,tone:Watch["tone"]="graphite"):Watch { const images=gallery(slug,galleryCount); return {slug,name,edition,status:"demo",image:images[0],alt:`${name} fotografado para a curadoria Ruvro`,tone,note,gallery:images,spinFrames:spins(slug),sourceLabel:SOURCE}; }

export const watches:ReadonlyArray<Watch> = [
  watch("vacheron-constantin-222","222","Vacheron Constantin · referência visual",5,"steel"),
  watch("breitling-navitimer","Navitimer","Breitling · referência visual",3,"steel"),
  watch("iwc-pilots-watch-chronograph","Pilot’s Watch Chronograph","IWC Schaffhausen · referência visual",3),
  watch("omega-aqua-terra-worldtimer","Seamaster Aqua Terra Worldtimer","Omega · referência visual",2),
  watch("rolex-cosmograph-daytona","Cosmograph Daytona","Rolex · referência visual",2,"porcelain"),
  watch("audemars-piguet-royal-oak-offshore","Royal Oak Offshore Chronograph","Audemars Piguet · referência visual",1),
  watch("iwc-portofino-moon-phase","Portofino Moon Phase","IWC Schaffhausen · referência visual",3),
  watch("iwc-pilots-watch-turquoise","Pilot’s Watch Chronograph Turquoise","IWC Schaffhausen · referência visual",3),
  watch("cartier-automatic","Automatic","Cartier · referência visual",3,"porcelain"),
  watch("rolex-sea-dweller","Sea-Dweller","Rolex · referência visual",1),
  watch("jaeger-lecoultre-geographic","Master Control Geographic","Jaeger-LeCoultre · referência visual",3,"porcelain"),
  watch("heuer-vintage-chronograph-a","Vintage Chronograph · leitura I","Heuer · referência visual",3),
  watch("jaeger-lecoultre-master-ultra-thin-moon","Master Ultra Thin Moon","Jaeger-LeCoultre · referência visual",2),
  watch("heuer-vintage-chronograph-b","Vintage Chronograph · leitura II","Heuer · referência visual",3),
  watch("h-moser-streamliner","Streamliner","H. Moser & Cie. · referência visual",3),
  watch("rolex-perpetual-1908","Perpetual 1908","Rolex · referência visual",1,"porcelain"),
  {slug:"estudo-nocturne",name:"Nocturne",edition:"Estudo editorial",status:"demo",image:"/media/hero-watch.png",alt:"Estudo visual de um relógio de aço com mostrador grafite",tone:"graphite",note:"Um estudo de luz, proporção e presença. Conteúdo visual demonstrativo; não representa uma peça em estoque."},
] as const;

const featuredSlugs = ["vacheron-constantin-222","breitling-navitimer","iwc-pilots-watch-chronograph","omega-aqua-terra-worldtimer","rolex-cosmograph-daytona","audemars-piguet-royal-oak-offshore"] as const;
export const featuredWatches:ReadonlyArray<Watch> = featuredSlugs.map((slug)=>{const selected=watches.find((candidate)=>candidate.slug===slug);if(!selected)throw new Error(`Featured watch not found: ${slug}`);return selected;});
