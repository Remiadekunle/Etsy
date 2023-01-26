import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { DeleteProductModal } from "../DeleteProduct";
import { EditProductModal } from "../EditProduct";
import './index.css';
import { addToCart } from "../../store/cart";

function ProductIndex(){
    const {productId} = useParams()
    const user = useSelector(state => state.session.user)
    const product = useSelector(state => state.product.allProducts[productId])
    const [listingToggle, setListingToggle] = useState(false);
    const [policiesToggle, setPoliciesToggle] = useState(false);
    const [highlightToggle, setHighlightToggle] = useState(false);
    const [descriptionToggle, setDescriptionToggle] = useState(false);
    const [option, setOption] = useState('0')
    const [optionValue, setOptionValue] = useState('')
    const [sellerToggle, setSellerToggle] = useState(false);
    const [quantity, setQuantity] = useState(0)
    const dispatch = useDispatch()


    if (!product){
        return null
    }

    const toggleListingButtons = () => {
        setListingToggle(!listingToggle)
    }

    const togglePolicyButtons = () => {
        setPoliciesToggle(!policiesToggle)
    }

    const toggleHighlight = () => {
        setHighlightToggle(!highlightToggle)
    }

    const toggleDescription = () => {
        setDescriptionToggle(!descriptionToggle)
    }

    const toggleSeller = () => {
        setSellerToggle(!sellerToggle)
    }

    const incrimentQuantity = () => {
        if (quantity >= product.stock) return
        setQuantity(quantity + 1)
    }
    const decrimentQuantity = () => {
        if (quantity === 0) return
        setQuantity(quantity - 1)
    }

    const addCart = async (e) => {
        e.preventDefault();
        console.log('the quant', quantity)
        // const payloadQ = quantity
        if (quantity === 0) return
        if (option === 0) return
        const optionItem = product.options[option - 1]
        await dispatch(addToCart(productId, quantity, optionValue))
        setQuantity(0)
    }

    let {options } = product;
    console.log(options)
    options = options.split('-')
    console.log('yooooooooooo this is the option', option)
    console.log('yooooooooooo this is the option', optionValue)

    return(
        <div className="product-index-container">
            <div className="product-index-main-content">
                <div className="product-image-container">
                    <div className="product-image-rows">

                    </div>
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
                        <select
                         className="product-details-select"
                         onChange={(e) => {
                            setOption(e.target.value)
                            setOptionValue(e.target.childNodes[e.target.value].label)
                        }}
                         >
                            <option  value='0'>Select an option</option>
                            {options && options.map((item, i) => (
                                <option label={item} value={i + 1}>{item}</option>
                            ))}
                            {/* <option value={}></option> */}
                        </select>
                        <div className="product-quantity-container">
                            <div>
                                Quantity:{quantity}
                            </div>
                            <button className="product-quantity-button" onClick={incrimentQuantity}><i class="fa-solid fa-plus"></i></button>
                            <button className="product-quantity-button" onClick={decrimentQuantity}><i class="fa-solid fa-minus"></i></button>
                        </div>
                    </div>
                    <button className="product-detail-cart-button">Buy it now</button>
                    <form className="product-add-to-cart-button-form" onSubmit={addCart}>
                        <button className="product-to-cart-button" type="submit">Add to cart</button>
                    </form>
                </div>
            </div>
            <div className="product-content-description-container">
                <div className="product-comments-container">

                </div>
                <div className="product-description-container">
                    <div className="product-description-awards">
                        <div className="product-description-award-item">
                            <i class="fa-solid fa-award fa-2xl"></i>
                            Star Seller. This seller consistently shipped on time and replied quickly to any messages they recieved.
                        </div>
                        <div className="product-description-award-item">
                            <i class="fa-solid fa-truck fa-2xl"></i>
                            Hooray! This item ships free.
                        </div>
                    </div>

                    <div className="product-attribute-dropdown" onClick={togglePolicyButtons}>
                        <div>
                            Besty's purchase policies
                        </div>
                        {policiesToggle? <i class="fa-solid fa-chevron-up fa-sm"></i> : <i class="fa-solid fa-chevron-down fa-sm"></i>}
                    </div>
                    {policiesToggle? <div className="prroduct-besty-certified">
                        <i class="fa-regular fa-handshake fa-xl"></i>
                        <div>
                            Besty Purchases Protection: Shop confidently on Besty knowing if something goes wrong with an order, we've got your back.
                        </div>
                    </div> : <></>}
                    <div className="product-attribute-dropdown" onClick={toggleHighlight}>
                        <div>
                            Highlights
                        </div>
                        {highlightToggle? <i class="fa-solid fa-chevron-up fa-sm"></i> : <i class="fa-solid fa-chevron-down fa-sm"></i>}
                    </div>
                    {highlightToggle ? <div className="product-highlights-container">
                        <div className="product-highlight-item">
                            <i class="fa-solid fa-hand"></i>
                            Handmade
                        </div>
                        <div className="product-highlight-item">
                            <i class="fa-solid fa-shop"></i>
                            Small business
                        </div>
                        </div> : <></>
                    }
                    <div className="product-attribute-dropdown" onClick={toggleDescription}>
                        <div>
                            Description
                        </div>
                        {descriptionToggle? <i class="fa-solid fa-chevron-up fa-sm"></i> : <i class="fa-solid fa-chevron-down fa-sm"></i>}
                    </div>
                    {descriptionToggle ? <div className="product-description-item-container">
                        {product.description}
                        </div> : <></>
                    }
                    <div className="product-attribute-dropdown" onClick={toggleSeller}>
                        <div>
                            Meet your sellers
                        </div>
                        {sellerToggle? <i class="fa-solid fa-chevron-up fa-sm"></i> : <i class="fa-solid fa-chevron-down fa-sm"></i>}
                    </div>
                    {sellerToggle ? <div>
                       <div className="meet-seller-owner-container">
                            <img className="meet-seller-img" src={product.owner.profileImg? product.owner.profileImg : 'https://i.pinimg.com/originals/b1/92/4d/b1924dce177345b5485bb5490ab3441f.jpg'}></img>
                            <div className="meet-seeler-description">
                                <div>
                                    {product.owner?.username}
                                </div>
                                <div>
                                    {`Owner of ${product.name}`}
                                </div>
                            </div>
                       </div>
                       <button className="meet-seller-button">
                        Message {product.owner?.username}
                       </button>
                    </div>:<></>
                    }
                    {user?.username === product.owner?.username? <div className="product-attribute-dropdown" onClick={toggleListingButtons} >
                        <div>
                            Manage Product Listing
                        </div>
                        {listingToggle? <i class="fa-solid fa-chevron-up fa-sm"></i> : <i class="fa-solid fa-chevron-down fa-sm"></i>}
                    </div> : <></>}
                    {listingToggle ? <div className="product-listing-buttons-container">
                        <EditProductModal product={product} />
                        <DeleteProductModal product={product}/>
                    </div> : <></> }
                </div>
            </div>
        </div>
    )
}

export default ProductIndex
