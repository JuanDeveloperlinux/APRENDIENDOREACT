function ListOfMovies ({movies})  {
  return (
    <ul className="movies">
    {
      movies.map((movie) => (
        <li className="movie" key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={`Poster de ${movie.title}`} />
        </li>
      ))
    }
  </ul>
  )
}

function NoMoviesResults  ()  {
  return (
    <p>No se encontraron peliculas en esta busqueda</p>
  )
}

export function Movies ({movies})  {
  const hasMovies = movies?.length > 0

  return (
      hasMovies
        ? <ListOfMovies movies={movies}/>
        : <NoMoviesResults/>
    )
}