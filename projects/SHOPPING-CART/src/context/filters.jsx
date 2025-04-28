import { createContext, useState } from 'react'

//crear el contexto y este se consume
export const FiltersContext  = createContext()

//crear el provider y este se usa para poder acceder a los datos
export function FiltersProvider({children}){
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
  })

  return (
    <FiltersContext.Provider value={{
      filters,setFilters
    }}>
      {children}
    </FiltersContext.Provider>
  )
}