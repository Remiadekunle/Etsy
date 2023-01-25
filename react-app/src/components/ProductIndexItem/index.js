import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../store/product";
import './index.css';


function ProductIndex(){
    const {productId} = useParams()
    const product = useSelector(state => state.product.allProducts[productId])
    if (!product){
        return null
    }
    let {options } = product;
    console.log(options)
    options = options.split('-')

    return(
        <div className="product-index-container">
            <div className="product-index-main-content">
                <div className="product-image-container">
                    <img className="product-index-image" src={product.previewImg}></img>
                </div>
                <div className="product-details-container">
                    <div className="product-details-owner">
                        {product.owner.username}
                        <i class="fa-solid fa-heart"></i>
                    </div>
                    <div className="product-detials-owner-stats">
                        {'1 Sale'}
                        {' | '}
                        <i class="fa-solid fa-star fa-xs"></i>
                        <i class="fa-solid fa-star fa-xs"></i>
                        <i class="fa-solid fa-star fa-xs"></i>
                        <i class="fa-solid fa-star fa-xs"></i>
                        <i class="fa-solid fa-star fa-xs"></i>
                    </div>
                    <div className="product-details-name">
                        {product.name}
                    </div>
                    <div className="product-details-price">
                        {`$${product.price}.00`}
                    </div>
                    <div className="product-details-options">
                        <div>
                            Options:
                        </div>
                        <select className="product-details-select">
                            <option value=''>Select an option</option>
                            {options && options.map(item => (
                                <option value={item}>{item}</option>
                            ))}
                            {/* <option value={}></option> */}
                        </select>
                    </div>
                    <button className="product-detail-cart-button">Buy it now</button>
                    <button className="product-detail-cart-button">Add to cart</button>
                </div>
            </div>
            <div className="product-content-description-container">
                <div className="product-comments-container">

                </div>
                <div className="product-description-container">
                    <div className="product-">
                        <div>
                            <i class="fa-solid fa-award"></i>
                            Star Seller. This seller consistently earned
                        </div>
                        <div>
                            <i class="fa-solid fa-truck"></i>
                            Hooray! This item ships free.
                        </div>
                    </div>
                    <div className="product-attribute-dropdown">
                        Shipping and return policies
                        <i class="fa-solid fa-chevron-down fa-sm"></i>
                    </div>
                    <div className="product-attribute-dropdown">
                        Highlights
                        <i class="fa-solid fa-chevron-down fa-sm"></i>
                    </div>
                    <div className="product-attribute-dropdown">
                        Description
                        <i class="fa-solid fa-chevron-down fa-sm"></i>
                    </div>
                    <div className="product-attribute-dropdown">
                        Meet your sellers
                        <i class="fa-solid fa-chevron-down fa-sm"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductIndex
