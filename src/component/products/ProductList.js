import React, { useEffect, useState, useCallback, useMemo, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import {
  fetchProduct,
  searchProducts,
  filterByPrice
} from '../../features/products/productSlice';

const SortDropdown = React.lazy(() => import('./SortDropdown'));
const SearchBar = React.lazy(() => import('./SearchBar'));
const FilterProduct = React.lazy(() => import('./FilterProduct'));

const ProductList = () => {
  const dispatch = useDispatch();
  const {isLoading, error, filtered  } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();
 const [page, setPage] = useState(1);
  const itemPerPage = 4;

  
// URL-driven filters/search
useEffect(() => {
    dispatch(fetchProduct()).then(()=>{
         const searchTerm = searchParams.get('search') || '';
        const priceParam = searchParams.get('price') || '';
        const selectedPriceOptions = priceParam ? priceParam.split(',') : [];

        dispatch(searchProducts(searchTerm));
        dispatch(filterByPrice(selectedPriceOptions));
        setPage(1);
    })
 
}, [dispatch, searchParams]);

  const totalPages = useMemo(()=>{
    return Math.ceil(filtered.length / itemPerPage)
  },[filtered.length]);

const visibleProducts = useMemo(()=>{
    return filtered.slice(0, page * itemPerPage)
  },[filtered, page, itemPerPage]);

  // console.log(filtered)
  // console.log(visibleProducts)
  
  const handleWindowScroll = useCallback(() => {
    if(isLoading || page >= totalPages) return
    requestAnimationFrame(()=>{
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 100) {
      setPage((prevPage) => {
        if (prevPage < totalPages) {
          return prevPage + 1;
        }
        return prevPage;
      });
    }
    })
  }, [page, totalPages, isLoading]); 

useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll);
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, [handleWindowScroll]);



  return (
    <>
      <Row>
        <Col xs={12}>
              <Suspense fallback={<p>Loading...</p>}>
                <SearchBar />
            </Suspense>
        </Col>
        <Col xs={12}>
         <Suspense fallback={<p>Loading...</p>}>
           <FilterProduct />
        </Suspense>
        </Col>
        <Col xs={12}>
            <Suspense fallback={<p>Loading sorting options...</p>}>
                <SortDropdown />
            </Suspense>
        </Col>
      </Row>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

   <Row style={{ marginTop: '1rem' }}>
        {isLoading && visibleProducts.length === 0 ? (
          Array.from({ length: itemPerPage }).map((_, idx) => (
            <Col className="mb-4" xl={3} md={6} xs={12} key={idx}>
              <ProductSkeleton />
            </Col>
          ))
        ) : visibleProducts.length > 0 ? (
          visibleProducts.map((prod, idx) => (
            <Col className="mb-4" xl={3} md={6} xs={12} key={prod.id ?? `prod-${idx}`}>
              <ProductCard product={prod}/>
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center">
            <h4>Not found product...</h4>
          </Col>
        )}
      </Row>
    </>
  );
};

export default ProductList;
