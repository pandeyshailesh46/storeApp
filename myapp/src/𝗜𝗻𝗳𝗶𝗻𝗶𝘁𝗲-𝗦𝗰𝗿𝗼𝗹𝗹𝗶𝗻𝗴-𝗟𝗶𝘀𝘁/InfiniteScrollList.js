import React, { useEffect, useState } from 'react'

const InfiniteScrollList = () => {
    const[products, setProducts] = useState([])
    const[page, setPage] = useState(1)
    const ItemPerPage = 15;
    const totalPages  = Math.ceil(products.length/ ItemPerPage);
    const fetchProduct = async()=>{
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        setProducts(data)
    }
    useEffect(()=>{
        fetchProduct();
    },[])

    const handleLoadMore = ()=>{
        if(page < totalPages){
             setPage((prev)=> prev + 1) 
        }
    }
    
  return (
    <>
        <h1>InfiniteScrollList</h1>
        {
            products.length > 0 && <ul>
                {
                    products.slice(page * ItemPerPage - ItemPerPage, page * ItemPerPage ).map((pro)=>(
                        <li
                        style={{paddingBottom: '20px', fontSize: '20px'}}
                         key={pro.id}>{pro.title}</li>
                    ))
                }
            </ul>
        }
        {
            page >= totalPages ? '' :  (
                <button onClick={handleLoadMore}>
                Load More
            </button>
            )
        }
       
    </>
  )
}

export default InfiniteScrollList