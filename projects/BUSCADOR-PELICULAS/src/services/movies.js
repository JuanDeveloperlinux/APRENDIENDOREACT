
const API_KEY = '4287ad07'

export const searchMovies = async ({search}) => {
  if(!search) return null

  try{
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    const moviesJson = await response.json()

    const movies = moviesJson.Search

    const mappedMovies = movies?.map((movie) => ({
      id:movie.imdbID,
      title:movie.Title,
      year:movie.Year,
      poster:movie.Poster
    }))

    return mappedMovies
  }catch(error){
    throw new Error("Error searching movies")
  }
}