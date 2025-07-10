import React from "react";
import { Card, Placeholder } from "react-bootstrap";

const ProductSkeleton = () => {
  return (
    <Card className="h-100">
      <div style={{ height: "180px", backgroundColor: "#dee2e6" }} />
      <Card.Body>
        <Placeholder as="h5" animation="glow">
          <Placeholder xs={8} />
        </Placeholder>
        <Placeholder animation="glow">
          <Placeholder xs={6} /> <Placeholder xs={4} />
        </Placeholder>
        <Placeholder.Button variant="secondary" xs={5} />
      </Card.Body>
    </Card>
  );
};

export default ProductSkeleton;
