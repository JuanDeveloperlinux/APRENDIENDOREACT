import { searchMovies } from '../services/movies.js'
import { useCallback, useMemo, useRef, useState } from 'react'

export function useMovies({search,sort}) {
  const [movies,setMovies] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState(null)
  const previousSearch = useRef(search)

  const getMovies = useCallback (async  ({search}) => {

    if (previousSearch.current === search) return;

    try {
      setIsLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  },[])

  const sortedMovies = useMemo(()=>{

    if(search.length===0) return movies;

    return sort
      ? [...movies].sort((a,b)=>a.title.localeCompare(b.title))
      : movies
  },[movies,sort])

  return { movies:sortedMovies,getMovies,isLoading}
}