import './App.css'
import { useCallback, useEffect, useRef, useState } from 'react'
import {Movies} from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies.js'
import debounce from 'just-debounce-it'

function useSearch() {
  const [search,setSearch] = useState('')
  const [error,setError] = useState(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if(isFirstRender.current){
      isFirstRender.current = search === '' //esto es una expresion que evalua si search esta vacio y devuelve un booleano
      return
    }

    if(search === ''){
      setError("NO SE PUEDE BUSCAR UNA PELICULA VACIA")
      return
    }
    setError(null)
  }, [search])

  return [search,setSearch,error]
}

function App() {
  const [sort,setSort] = useState(false)
  const [search,updateSearch,error] = useSearch()
  const {movies:sortedMovies,getMovies,isLoading} = useMovies({search,sort})

  //sirve para evitar que se llame a la api cada vez que se cambia el contenido del input
  const debouncedGetMovies = useCallback(debounce(search =>
    getMovies({search})
    , 300),[])


  const handleSubmit = async (event) => {
    event.preventDefault()
    await getMovies({search})
  }

  //cada que el usuario digita algo en el input se hace esto y busca en base al debounce
  const handleChange = async (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }



  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input style={{
            border:'1px solid transparent',
            borderColor: error ? 'red' : 'transparent',
          }}
            onChange={handleChange} value={search} name="query"  placeholder="Avengers,Star Wars, The matrix..."/>
          <button type="submit">Buscar</button>
        </form>


        {
          error ?  <p style={{color:'red'}}>{error}</p> :
            <div style={{margin:'20px'}}>
              <label style={{
                display:'flex',
                justifyContent:'center',
              }}>
                Ordenar por titulo
                <input style={{display:"flex"}} type="checkbox" onChange={handleSort} checked={sort}/>
              </label>
            </div>
        }
      </header>

      <main>
        {
          isLoading ? <p>Cargando...</p>:<Movies movies={sortedMovies}/>
        }

      </main>
    </div>
  )
}

export default App
