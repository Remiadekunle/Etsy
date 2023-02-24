import { useState } from "react";
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import FavButton, { FavButton2 } from "../FavButton";
import { Footer2 } from "../FooterItems";
import './index.css';


function CategoryPage(){
    const products = useSelector(state => state.category.category)
    const info = useSelector(state => state.category.info)
    if (! products || !Object?.values(products)) return null
    


    const productsArr = Object?.values(products)
    return(
        <div>
            <div style={{width: '100%', backgroundColor: '#F8EBE6'}}>
                <div className="category-welcome-container">
                    <div style={{margin: '0 auto', fontSize: '42px', textDecoration: 'underline'}}>
                        {info?.title}
                    </div>
                    <div className="category-info-description">
                        {info?.description}
                    </div>
                </div>
            </div>
            <div>
                <div className="category-page-welcome-header">
                    Find something you love <i class="fa-solid fa-heart categories-heart"></i>
                </div>
                <div className="category-products-container">
                    {
                        productsArr && productsArr.map(product => (
                            <CategoryIndex product={product} />
                        ))
                    }
                </div>
            </div>
            <Footer2 />
        </div>
    )
}
export default CategoryPage

export function CategoryIndex({product}){
    const [hover, setHover] = useState(false)

    const toggleHover = () => {
        setHover(!hover)
    }
    const findStars = (avg) => {
        console.log('testing the type', typeof avg)
        if (avg === 0) return null
        if (avg >  0 && avg <= 1) return <i class="fa-solid fa-star fa-xs"></i>
        else if (avg >=  1 && avg < 2) {
            return (
            <div>
                <i class="fa-solid fa-star fa-xs"></i>
            </div>
        )}
        else if (avg >=  2 && avg < 3) {
            return (
            <div>
                <i class="fa-solid fa-star fa-xs"></i>
                <i class="fa-solid fa-star fa-xs"></i>
            </div>
        )}
        else if (avg >=  3 && avg < 4) {
            return (
            <div>
                <i class="fa-solid fa-star fa-xs"></i>
                <i class="fa-solid fa-star fa-xs"></i>
                <i class="fa-solid fa-star fa-xs"></i>
            </div>
        )}
        else if (avg >=  4 && avg < 5) {
            return (
            <div>
                <i class="fa-solid fa-star fa-xs"></i>
                <i class="fa-solid fa-star fa-xs"></i>
                <i class="fa-solid fa-star fa-xs"></i>
                <i class="fa-solid fa-star fa-xs"></i>
            </div>

        )}
        else{
            return(
                <div>
                    <i class="fa-solid fa-star fa-xs"></i>
                    <i class="fa-solid fa-star fa-xs"></i>
                    <i class="fa-solid fa-star fa-xs"></i>
                    <i class="fa-solid fa-star fa-xs"></i>
                    <i class="fa-solid fa-star fa-xs"></i>
                </div>
            )
        }

    }
    return(
        <div style={{marginBottom: '10px', position: 'relative'}} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            <NavLink to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }} onClick={scrollUp}>
                <img className="category-product-img" src={product.previewImg}></img>
                <div>
                    {`$${product.price}.00`}
                </div>
                <div style={{display: 'flex', gap: '5px'}}>
                    {findStars(product.avg)}
                    {product.reviews.length ? `(${product.reviews.length})` : ''}
                </div>
                {product.name}
            </NavLink>
            {hover ? <FavButton2 productId={product.id}/> : <></> }

            {/* <FavButton productId={product?.id} /> */}
        </div>
    )
}

export const scrollUp = () => {
    return window.scrollTo(0,0)
}
