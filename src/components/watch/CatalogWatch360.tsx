"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export function CatalogWatch360({frames,name,alt}:{frames:ReadonlyArray<string>;name:string;alt:string}) {
  const [frame,setFrame]=useState(0); const [reducedMotion,setReducedMotion]=useState(false); const [paused,setPaused]=useState(false); const lastPointer=useRef<number|null>(null);
  const move=useCallback((direction:number)=>setFrame((current)=>(current+direction+frames.length)%frames.length),[frames.length]);
  useEffect(()=>{const media=window.matchMedia("(prefers-reduced-motion: reduce)");const update=()=>setReducedMotion(media.matches);update();media.addEventListener?.("change",update);return()=>media.removeEventListener?.("change",update)},[]);
  useEffect(()=>{if(reducedMotion||paused||frames.length<2)return;const timer=window.setInterval(()=>move(1),2800);return()=>window.clearInterval(timer)},[frames.length,move,paused,reducedMotion]);
  return <section className="catalog-360" aria-label={`Visualização 360 de ${name}`} role="region" tabIndex={0}
    onKeyDown={(event)=>{if(event.key==="ArrowRight"){event.preventDefault();move(1)}if(event.key==="ArrowLeft"){event.preventDefault();move(-1)}}}
    onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocus={()=>setPaused(true)} onBlur={()=>setPaused(false)}
    onPointerDown={(event)=>{lastPointer.current=event.clientX;setPaused(true);event.currentTarget.setPointerCapture?.(event.pointerId)}}
    onPointerMove={(event)=>{if(lastPointer.current===null)return;const delta=event.clientX-lastPointer.current;if(Math.abs(delta)>=24){move(delta<0?1:-1);lastPointer.current=event.clientX}}}
    onPointerUp={()=>{lastPointer.current=null;setPaused(false)}} onPointerCancel={()=>{lastPointer.current=null;setPaused(false)}}>
    <header className="catalog-360__head"><span>360°</span><span>Arraste para explorar</span></header>
    <div className="catalog-360__stage"><Image key={frames[frame]} src={frames[frame]} alt={`${alt} — ângulo ${frame+1} de ${frames.length}`} fill preload={frame===0} sizes="(max-width: 700px) 92vw, 480px" draggable={false}/></div>
    <footer className="catalog-360__controls"><button type="button" aria-label="Ângulo anterior" onClick={()=>move(-1)}>←</button><span aria-live="polite">{String(frame+1).padStart(2,"0")} / {String(frames.length).padStart(2,"0")}</span><button type="button" aria-label="Próximo ângulo" onClick={()=>move(1)}>→</button></footer>
  </section>;
}
