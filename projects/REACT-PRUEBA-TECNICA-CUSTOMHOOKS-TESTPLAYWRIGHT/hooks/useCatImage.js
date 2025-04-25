import { useEffect, useState } from 'react'

//customhook se inicia con use
export function useCatImage({fact}){
  const [imageUrl, setImageUrl] = useState()

  //efecto para obtener la imagen del gato a partir del texto del gato
  useEffect(()=>{

    if(!fact) return;
    const threefirstWords = fact.split(' ',3).join(' ')
    fetch(`https://cataas.com/cat/says/${threefirstWords}?size=50&color=red&json=true`)
      .then(res=>res.json())
      .then(response=>{
        const {url} = response
        console.log(url)
        setImageUrl(url)
      })

  },[fact])

  return {imageUrl}
}