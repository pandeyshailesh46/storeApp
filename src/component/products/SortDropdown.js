// components/SortDropdown.js
import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sortProducts } from "../../features/products/productSlice";

const SortDropdown = () => {
  const dispatch = useDispatch();

  const handleSortChange = (e) => {
    dispatch(sortProducts(e.target.value));
  };

  return (
   <div className="d-flex justify-content-end align-items-center gap-2 flex-wrap mb-3">
      <span className="text-white">Sort by:</span>
      <Form.Select
        onChange={handleSortChange}
        className="w-auto bg-dark text-white border-0 border-secondary"
        aria-label="Sort By"
      >
        <option value="ItemName">Item Name</option>
        <option value="HigherPrice">Higher Price</option>
        <option value="LowerPrice">Lower Price</option>
      </Form.Select>
    </div>
  );
};

export default SortDropdown;
