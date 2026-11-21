import type {Folio, Tile} from "./projects";

// The model's initial diagram is used as an art reference. Typeset the reader's
// copy from the actual labels so printed characters never depend on model lettering.
export async function printRecipe(folio:Folio, ingredientEnglish:string[], stepEnglish:string[]) {
  const page=document.createElement("canvas");
  page.width=2000;
  page.height=2800;
  const ctx=page.getContext("2d");
  if (!ctx) throw Error("此浏览器无法创建食谱印刷页。");
  const pen=ctx;
  await document.fonts.ready;
  pen.scale(2,2);
  pen.fillStyle="#faf7eb";
  pen.fillRect(0,0,1000,1400);
  function label(value:string,x:number,y:number,font:string,width:number,color="#302b23"){
    pen.font=font;
    pen.fillStyle=color;
    pen.fillText(value,x,y,width);
  }
  async function drawImage(src:string,x:number,y:number,w:number,h:number){
    const image=new Image();
    image.src=src;
    await image.decode();
    const scale=Math.min(w/image.width,h/image.height);
    pen.save();
    pen.globalCompositeOperation="multiply";
    pen.drawImage(image,x+(w-image.width*scale)/2,y+(h-image.height*scale)/2,image.width*scale,image.height*scale);
    pen.restore();
  }
  async function row(items:Tile[],english:string[],y:number){
    const width=900/Math.max(1,items.length);
    pen.textAlign="center";
    for(const [i,item] of items.entries()){
      const x=50+i*width;
      await drawImage(item.src,x+8,y,width-16,135);
      label(item.name,x+width/2,y+166,"bold 23px serif",width-8);
      if(typeof english[i]==="string")label(english[i],x+width/2,y+194,"16px Georgia",width-8);
    }
    pen.textAlign="left";
  }
  label(folio.title,50,115,"bold 72px serif",900);
  label(folio.en,53,168,"italic 34px Georgia",890,"#a43828");
  label("食材 / INGREDIENTS",50,265,"bold 25px serif",900);
  await row(folio.ingredients,ingredientEnglish,305);
  label("制作流程 / METHOD",50,615,"bold 25px serif",900);
  await row(folio.steps,stepEnglish,655);
  label("成品 / FINAL DISH",50,970,"bold 25px serif",900);
  await drawImage(folio.hero,75,1000,850,340);
  return page.toDataURL("image/png");
}
