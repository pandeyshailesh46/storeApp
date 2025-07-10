import React from 'react'

const SortPanel = ({sort, setSort}) => {
  return (
    <div className="sort-panel">
        <label>Sort By: </label>
        <select 
        name='sort'
        value={sort}
        onChange={(e)=>setSort(e.target.value)}
        >
            <option value="">None</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
        </select>
    </div>
  )
}

export default SortPanel