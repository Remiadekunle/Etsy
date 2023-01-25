import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../store/product";
import { DeleteProductModal } from "../DeleteProduct";
import { EditProductModal } from "../EditProduct";
import './index.css';

function ProductIndex(){
    const {productId} = useParams()
    const product = useSelector(state => state.product.allProducts[productId])
    const [listingToggle, setListingToggle] = useState(false);

    if (!product){
        return null
    }

    const toggleListingButtons = () => {
        setListingToggle(!listingToggle)
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
                    <div className="product-description-awards">
                        <div className="product-description-award-item">
                            <i class="fa-solid fa-award fa-2xl"></i>
                            Star Seller. This seller consistently earned
                        </div>
                        <div className="product-description-award-item">
                            <i class="fa-solid fa-truck fa-2xl"></i>
                            Hooray! This item ships free.
                        </div>
                    </div>
                    <div className="product-attribute-dropdown" onClick={toggleListingButtons} >
                        <div>
                            Manage Product Listing
                        </div>
                        <i class="fa-solid fa-chevron-down fa-sm"></i>
                    </div>
                    {listingToggle ? <div className="product-listing-buttons-container">
                        <EditProductModal product={product} />
                        <DeleteProductModal product={product}/>
                    </div> : <></> }
                    <div className="product-attribute-dropdown">
                        <div>
                            Shipping and return policies
                        </div>
                        <i class="fa-solid fa-chevron-down fa-sm"></i>
                    </div>
                    <div className="product-attribute-dropdown">
                        <div>
                            Highlights
                        </div>
                        <i class="fa-solid fa-chevron-down fa-sm"></i>
                    </div>
                    <div className="product-attribute-dropdown">
                        <div>
                            Description
                        </div>
                        <i class="fa-solid fa-chevron-down fa-sm"></i>
                    </div>
                    <div className="product-attribute-dropdown">
                        <div>
                            Meet your sellers
                        </div>
                        <i class="fa-solid fa-chevron-down fa-sm"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductIndex
