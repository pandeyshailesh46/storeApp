import React, { useEffect, useRef, useState } from 'react'

const ImageCard = ({src, alt}) => {
    const[isvisibale, setIsvisibal] = useState(false)
    const imageRef = useRef();
    useEffect(()=>{
        const observer = new IntersectionObserver(
            ([entry])=> {
                if(entry.isIntersecting){
                    setIsvisibal(true);
                    observer.disconnect();
                }
         },
         { threshold: 0.1 }
    );
    
    if(imageRef.current) {
        observer.observe(imageRef.current)
    }
    return ()=> observer.disconnect()
    },[])
  return (
    <div className='image-card' ref={imageRef}>
        {
            isvisibale && <img src={src} alt={alt} loading='lazy'/>
        }
    </div>
  )
}

export default ImageCard