import React, { useEffect, useState } from 'react'
import ImageCard from './ImageCard';
import '../Gallery/Gallery.css'

const getImage =(count = 20)=>{
   return new Array(count).fill(0).map((_, index)=>({
        id: index + Math.random(),
        src: `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`,
        alt: `Image ${index}`
    }))
}
// getImage()

const Gallery = () => {
    const[images, setImages] = useState(getImage());
    console.log(images);
    const loadMoreImages  = ()=>{
        setImages((prev)=>[...prev, ...getImage()])
    }

    useEffect(()=>{
       const handleScroll = ()=>{
            if(window.innerHeight + window.scrollY >=  document.body.offsetHeight - 300){
                loadMoreImages();
            }
       }
       window.addEventListener('scroll', handleScroll);
       return ()=>window.removeEventListener('scroll', handleScroll)
    },[])
  return (
   <>
         <h1>Lazy Load Image Gallery</h1>
    <div className="gallery">
        {
                images.map((img, idx)=>(
                    <ImageCard src={img.src} alt={img.alt}/>
                ))
            }
        </div>
   </>
  )
}

export default Gallery