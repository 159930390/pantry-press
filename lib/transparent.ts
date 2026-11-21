// Check decoded pixels, since PNG files can also contain fully opaque artwork.
export async function requireSticker(src:string,label:string):Promise<string>{
  if(typeof src!=="string" || !src.startsWith("data:image/png;base64,")) throw Error(label+"没有返回 PNG。");
  const image=new Image();
  image.src=src;
  await image.decode();
  const probe=document.createElement("canvas");
  probe.width=128;
  probe.height=128;
  const ctx=probe.getContext("2d");
  if(!ctx) throw Error("无法检查贴图透明度。");
  ctx.drawImage(image,0,0,128,128);
  const pixels=ctx.getImageData(0,0,128,128).data;
  let clear=0,solid=0,border=0;
  for(let y=0;y<128;y++){
    for(let x=0;x<128;x++){
      const alpha=pixels[(y*128+x)*4+3];
      if(alpha<8){
        clear++;
        if(x===0||y===0||x===127||y===127) border++;
      }else if(alpha>64) solid++;
    }
  }
  if(clear<164 || solid<16 || border<64) throw Error(label+"未通过透明底检查，请重新生成。");
  return src;
}
