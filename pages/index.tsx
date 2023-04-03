import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import ComicViewer from "react-comic-viewer";
import { useEffect, useState } from 'react';
import { HeaderSearch } from '@/Components/Header';


export default function Home() {

  const [pages,setPages]=useState<any>()
  const [loading,setLoading]=useState(true)

  const getNarutoManga = async()=>{
    const mangaInfo= await (await fetch("https://api.consumet.org/manga/mangadex/info/6b1eb93e-473a-4ab3-9922-1a66d2a29a4a")).json();
    if(!mangaInfo){
      return(
        <div>
          <h1>F, nothing found</h1>
        </div>
      )
    }
    const mangaChapters = mangaInfo.chapters; //returns all chapters for that manga as an array
    const mangaChapter1 = mangaChapters[0];
    const mangaChapterId= mangaChapter1.id;
    
    const getMangadexPages = await(await fetch(`https://api.consumet.org/manga/mangadex/read/d89e4e67-7f68-419c-b1aa-17f1cd3ac30f`)).json()
    //returns an array 
    const mangaPageImages= [];
    for(let i=0; i<getMangadexPages.length;i++){
      mangaPageImages.push(getMangadexPages[i].img)
    }
    setPages(mangaPageImages)
    setLoading(false)
  }

  useEffect(()=>{
    getNarutoManga()
  })


if(loading){
  return (
    <div>
      Loading...
    </div>
  )
}
if(!loading){
  return(
    <>
    <HeaderSearch/> 
    <ComicViewer pages={pages}/>
    </>
  )
}
}


