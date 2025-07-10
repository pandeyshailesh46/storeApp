import React, { useEffect, useState } from "react";
import { Card, Form, Button, Col, Row } from "react-bootstrap";
import {
  filterByPrice,
  clearFilters, 
} from "../../features/products/productSlice";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";


const FilterProduct = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState([]);


  // Checkbox handler
  const handleChanges = (e) => {
    const { value, checked } = e.target;
    const updated = checked
      ? [...selected, value]
      : selected.filter((val) => val !== value);
    setSelected(updated);

    // Update URL
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (updated.length > 0) {
        newParams.set("price", updated.join(","));
      } else {
        newParams.delete("price");
      }
      return newParams;
    });

    dispatch(filterByPrice(updated));
  };

  // Clear filters
  const handleClearFilters = () => {
    setSelected([]);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete("price");
      return newParams;
    });
    dispatch(clearFilters());
  };

  // On page load / URL param change
  useEffect(() => {
    const priceQuery = searchParams.get("price");
    const priceArr = priceQuery ? priceQuery.split(",") : [];
    setSelected(priceArr);
    dispatch(filterByPrice(priceArr));
  }, [searchParams, dispatch]);



  return (
     <Card className="p-3 mb-4 bg-dark text-white">
      <Row className="align-items-center gy-3">
        {/* Pricing options */}
        <Col xs={12} md={4}>
          <Form className="d-flex flex-wrap gap-3 align-items-center">
             <Form.Label  className="text-title fs-6">
                Pricing Option:
            </Form.Label>
            {["Paid", "Free", "View Only"].map((label,idx) => (
              <Form.Check
               id={idx + 1}
                key={label}
                type="checkbox"
                label={label}
                value={label}
                checked={selected.includes(label)}
                onChange={handleChanges}
                className="cursor-pointer"
              />
            ))}
          </Form>
        </Col>
        {/* Reset button */}
        <Col xs={12} md={8} className="text-md-end">
          <Button
            className="text-white px-0"
            variant="link"
            onClick={handleClearFilters}
          >
            Reset
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default FilterProduct;
