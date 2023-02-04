import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import FavButton, { FavButton2 } from "../FavButton";

function HomePageSlideshow(){
    const products = useSelector(state => state.product.allProducts)
    const productsArr = Object?.values(products)
    const len = productsArr.length
    const delay = 2500
    const [index, setIndex] = useState(0)
    let timeOut;
    useEffect(() => {
        console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjj this is the index', index)
        const rand = Math.floor(Math.random() * 10)
        timeOut = setTimeout(() => {
            // setIndex(rand % len)
        setIndex(prevIndex => prevIndex === productsArr.length - 1 ? 0 : prevIndex + 1)
     }, 5000)

     return () => clearTimeout(timeOut)
    }, [index])
    return (
        <div className="home-slideshow">
          <div className="home-slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
            {
                productsArr.map(product => (
                    // <div>
                    //     {product.name}
                    // </div>
                    <SlideIndex index={index} product={product} />
                ))
            }
          </div>
          {/* <div className="home-slideshowDots">
            {productsArr.map((_, idx) => (
                <div key={idx} className="home-slideshowDot"></div>
            ))}
          </div> */}
        </div>
      );
}
export function HomePageSlideshow2(){
    const products = useSelector(state => state.product.allProducts)
    const productsArr = Object?.values(products)
    const len = productsArr.length
    const delay = 2500
    const [index, setIndex] = useState(len-1)
    let timeOut;
    useEffect(() => {
        console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjj this is the index', index)
        const rand = Math.floor(Math.random() * 10)
        timeOut = setTimeout(() => {
            // setIndex(rand % len)
        setIndex(prevIndex => prevIndex === 0 ? len - 1 : prevIndex - 1)
     }, 5000)

     return () => clearTimeout(timeOut)
    }, [index])
    return (
        <div className="home-slideshow">
          <div className="home-slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
            {
                productsArr.map(product => (
                    // <div>
                    //     {product.name}
                    // </div>
                    <SlideIndex index={index} product={product} />
                ))
            }
          </div>
          {/* <div className="home-slideshowDots">
            {productsArr.map((_, idx) => (
                <div key={idx} className="home-slideshowDot"></div>
            ))}
          </div> */}
        </div>
      );
}
export default HomePageSlideshow


export function SlideIndex({product, index}){

    return(
        <div key={index} className="home-slide" >
            <NavLink to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img className="home-slide-img" src={product.previewImg}></img>
                <div className='home-page-product-itemA-price'>{`$${product?.price}.00`}</div>
            </NavLink>
            <FavButton2 className='slideshow-fav' productId={product?.id} />
        </div>
    )
}
