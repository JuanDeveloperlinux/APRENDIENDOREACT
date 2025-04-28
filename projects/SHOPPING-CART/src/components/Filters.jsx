import "./Filters.css"
import { useId, useState } from 'react'
import { useFilters } from '../hooks/useFilters.js'


export function Filters({}) {
  const {filters,setFilters} = useFilters()
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const handleRangeChange = (event) => {

    setFilters(prevState => ({
      ...prevState,
      minPrice: event.target.value
    }))
  }

  const handleCategoryChange = (event) => {
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value
    }))
  }

  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterId}>Precio minimo</label>
        <input
          type="range"
          id={minPriceFilterId}
          min="0"
          max="1000"
          onChange={handleRangeChange}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Category</label>
        <select name="category" id={categoryFilterId} onChange={handleCategoryChange}>
          <option value="all">Todas</option>
          <option value="laptops">Portatiles</option>
          <option value="smartphones">Celulares</option>
        </select>
      </div>
    </section>
  )
}