import React from 'react'

const FilterPanel = ({filters, setFilters, products }) => {
    const category = [...new Set(products.map(p=>p.category))];
    const handleChange = (e)=>{
        setFilters((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

  return (
     <div className="filter-panel">
         <label>Category: </label>
        <select name="category" onChange={handleChange} value={filters.category}>
            <option value="">All</option>
            {
                category.map((cat,idx)=>(
                    <option key={idx} value={cat}>{cat}</option>
                ))
            }
         </select>
         <label>Min Price: </label>
      <input type="number" name="min" value={filters.min} onChange={handleChange} />

      <label>Max Price: </label>
      <input type="number" name="max" value={filters.max} onChange={handleChange} />
     </div>
  )
}

export default FilterPanel