import React from "react";
import Card from "react-bootstrap/Card";
const ProductCard = ({ product}) => {
  return (
      <Card className="bg-transparent text-white" style={{ width: "100%" }}>
        <Card.Img
          variant="top"
          src={product.imagePath}
          className="equal-img"
          loading="lazy"
          alt={product.title}
        />
        <Card.Body  className="d-flex gap-3 justify-content-between align-items-center" >
          <Card.Title>
            <div className="titles">
              {product.title}
            </div>
            <span className="category">
                {product.creator}
            </span>
          </Card.Title>
            <span className="price">
                {
                    product.pricingOption === 0 ?
                    `$${product.price}`:
                    product.pricingOption === 1 ? 
                    'FREE' : 'View Only'
                }
            </span>
        </Card.Body>
      </Card>
  );
};

export default ProductCard;
