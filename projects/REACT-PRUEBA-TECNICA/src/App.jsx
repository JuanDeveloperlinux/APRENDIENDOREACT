import "./App.css"
import { useCatImage } from '../hooks/useCatImage.js'
import { useCatFact } from '../hooks/useCatFact.js'

//const CAT_ENDPOINT_IMAGE_URL =`https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`

export function App() {

  const {fact,refreshFact} = useCatFact()
  const {imageUrl} = useCatImage({fact})

  const handleClick = async () =>{
     await refreshFact()
  }

  return (
    <main >
      <h1>app de gatos </h1>
      <button onClick={handleClick}>GET NEW FACT</button>
      <p>{fact}</p>
      {
        imageUrl && <img src={imageUrl} alt="imagen de gato"/>
      }
    </main>
  )
}