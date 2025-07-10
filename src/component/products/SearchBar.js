import React, { useEffect, useState, useCallback } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { BiSearch, BiX } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { searchProducts, clearFilters } from "../../features/products/productSlice";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  // Sync local state with URL param on mount
  useEffect(() => {
    const querySearch = searchParams.get("search") || "";
    setSearch(querySearch);
    dispatch(searchProducts(querySearch));
  }, [searchParams, dispatch]);

  const handleChanges = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleSearch = useCallback(() => {
    const currentQuery = searchParams.get("search") || "";

    // Avoid dispatching the same query again
    if (search.trim() === currentQuery.trim()) return;

    const newParams = new URLSearchParams(searchParams.toString());
    if (search.trim()) {
      newParams.set("search", search.trim());
    } else {
      newParams.delete("search");
    }

    setSearchParams(newParams);
    dispatch(searchProducts(search.trim()));
  }, [dispatch, search, searchParams, setSearchParams]);

  const clearSearch = useCallback(() => {
    setSearch("");
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("search");
    setSearchParams(newParams);
    dispatch(clearFilters());
  }, [dispatch, searchParams, setSearchParams]);

  return (
    <InputGroup className="mb-3 w-100">
      <Button
      aria-label="search button"
       onClick={handleSearch}>
        <BiSearch />
      </Button>

      <Form.Control
        className="bg-dark text-white"
        placeholder="Find the items you’re looking for"
        aria-label="Search"
        aria-describedby="search-icon"
        value={search}
        onChange={handleChanges}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      {search && (
        <Button 
        aria-label="clear search button"
        className="btn btn-success" onClick={clearSearch}>
          <BiX />
        </Button>
      )}
    </InputGroup>
  );
};

export default SearchBar;
