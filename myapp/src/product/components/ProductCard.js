import React from 'react'

const ProductCard = ({product}) => {
  return (
    <div className="card">
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <h3>{(product.category).toUpperCase()}</h3>
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating.rate}</p>
  </div>
  )
}

export default ProductCard