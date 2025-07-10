import React, { useState, useEffect, useRef, useMemo } from "react";

const ScrollPagination = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const itemPerPage = 10;
  const containerRef = useRef();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setProducts(data);
    };
    fetchProduct();
  }, []);

//   const totalPages = useMemo(() => {
//     return Math.ceil(products.length / itemPerPage);
//   }, [products]);
const totalPages = Math.ceil(products.length / itemPerPage)

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 5) {
      setPage((prevPage) => {
        if (prevPage < totalPages) {
          return prevPage + 1;
        }
        return prevPage;
      });
      console.log(page)
    }
  };

  const visibleProducts = products.slice(0, page * itemPerPage);

  return (
    <>
      <h1>Infinite Scroll List</h1>
      <div
        className="scroll"
        ref={containerRef}
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
        onScroll={handleScroll}
      >
        <ul>
          {visibleProducts.map((pro) => (
            <li
              style={{ paddingBottom: "20px", fontSize: "18px" }}
              key={pro.id}
            >
              {pro.title}
            </li>
          ))}
        </ul>
        {page >= totalPages && (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            🔚 You reached the end.
          </p>
        )}
      </div>
    </>
  );
};

export default ScrollPagination;
