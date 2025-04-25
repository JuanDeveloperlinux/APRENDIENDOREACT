import { useEffect, useState } from 'react'
import { getRandomFact } from '../services/facts.js'

export const useCatFact = ()=>{
  const [fact,setFact] = useState()

  const refreshFact = async ()=>{
    getRandomFact().then(newFact=>setFact(newFact))
  }

  //efecto para obtener el texto del gato
  useEffect(refreshFact, [])

  return {fact,refreshFact}
}