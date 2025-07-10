import React, { useEffect, useState } from "react";
import SortPanel from "../components/SortPanel";
import FilterPanel from "../components/FilterPanel";
import ProductCard from "../components/ProductCard";
import "../product.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState('');
  const [filters, setFilters] = useState({
    category:'', min:0, max: 1000
  })
   const [displayed, setDisplayed] = useState([]);
   const[page, setPage] = useState(1);
   const ItemPerPage = 4;


  const fetchProducts = async () => {
    setLoading(true);
    setIsError("");
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      setIsError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(()=>{
    let filtered = [...products];

    if(filters.category){
        filtered = filtered.filter(p=> p.category === filters.category)
    }
    filtered = filtered.filter(p=> p.price >= filters.min && p.price <= filters.max );

    if (sort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      filtered.sort((a, b) => b.rating.rate - a.rating.rate);
    }


    setDisplayed(filtered)

  },[sort, filters, products])

//   const filterProductbySearch = products.filter((product) =>
//     product.title.toLowerCase().startsWith(searchTerm.toLowerCase())
//   );
// const filterProductbySearch = products.filter((product) =>
//     product.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
const filterProductbySearch = displayed.filter((product)=>{
    const title = product.title.toLowerCase();
    const searchWord = searchTerm.toLowerCase().trim().split(' ');
    return searchWord.every(word=> title.includes(word));
})

// Pagination

const handlePagination = (selectPage)=>{
    if(selectPage >= 1 && selectPage <= Math.ceil(products.length/ItemPerPage) && selectPage !==page){
        setPage(selectPage)
    }
}

  return (
    <>
      <div className="container">
        <h1>🛍 Product List</h1>
        <div className="controls">
          <SortPanel
            sort={sort}
            setSort={setSort}
           />
          <FilterPanel 
          filters={filters}
          setFilters={setFilters}
          products={products}
          />
          <div className="searchProduct">
            <input
              type="text"
              placeholder="Enter Search..."
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="grid">
          {loading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p style={{ color: "red" }}>{isError}</p>
          ) : filterProductbySearch.length > 0 ? (
            filterProductbySearch.slice(page * ItemPerPage -ItemPerPage, page * ItemPerPage).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
        {
            products.length > 0 && <div className="pagination">
                <span
                className={page > 1 ? '' : 'pagination__disable'}
                onClick={()=>handlePagination(page -1)}
                >◀</span>
                {
                    [...Array(Math.ceil(products.length / ItemPerPage))].map((__, i)=>(
                       <span
                       className={page === i+1 ? 'pagination__selected': ''}
                       key={i}
                       onClick={()=>handlePagination(i+1)}
                       >{i+1}</span> 
                    ))
                }
                
                <span
                className={page < Math.ceil(products.length/ItemPerPage) ? '' : 'pagination__disable'}
                onClick={()=>handlePagination(page + 1)}
                >▶</span>
            </div>
        }
      </div>
    </>
  );
};

export default ProductList;
