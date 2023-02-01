import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import { DeleteProductModal } from "../DeleteProduct";
import { EditProductModal } from "../EditProduct";
import './index.css';
import { addToCart } from "../../store/cart";
import ReviewIndex from "./ProductReview";
import { ComingSoonBuyItNowModal, ComingSoonBuyMessageOwnerModal } from "../ComingSoon";
import { CreateReviewFormModal } from "./CreateEditReview";
import FavButton from "../FavButton";

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
    const [optionsError, setOptionsError] = useState([])
    const [quantityError, setQuantityError] = useState([])
    const [quantity, setQuantity] = useState(0)
    const dispatch = useDispatch()
    const history = useHistory();


    if (!product){
        console.log('ooopsie')
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
        setQuantityError([])
    }
    const decrimentQuantity = () => {
        if (quantity === 0) return
        setQuantity(quantity - 1)
    }

    const findStars = (avg) => {
        console.log('testing the type', typeof avg)
        if (avg === 0) return 'No Reviews'
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
    const addCart = async (e) => {
        e.preventDefault();
        setOptionsError([])
        setQuantityError([])
        console.log('the quant', quantity)
        // const payloadQ = quantity
        if (quantity === 0) {
            setQuantityError(['Please input a quantity greater than 0'])
            return
        }
        if (parseInt(option) === 0) {
            console.log('in here')
            setOptionsError(['Please select an option'])
            return
        }
        console.log('b4 we submit', optionValue)
        await dispatch(addToCart(productId, quantity, optionValue))
        setQuantity(0)
        return history.push('/cart')
    }
    findStars(product.avg)
    let {options } = product;
    console.log(options)
    options = options.split('-')
    console.log('yooooooooooo this is the option', option)
    console.log('yooooooooooo this is the option', optionValue)
    console.log('ummmmmmmmmmmmmmmmmm', optionsError?.length > 0)
    const placeImgs = []

    for (let i = 0; i < 9; i++){
        placeImgs.push(i)
    }
    const id = product.id
    console.log('this is def working nnnnnnnnnnnnnnnnnnnnnnnnnnn', id)
    const optionsErrorName = optionsError?.length > 0 ? 'options-error-class' : 'options-error-class2'
    const quantityErrorName = quantityError?.length > 0 ? 'quantity-error-class' : 'quantity-error-class2'
    console.log('ummmmmmmmmmmmm again', optionsErrorName)
    console.log(optionsError)

    return(
        <div className="product-index-container">
            <div className="product-index-main-content">
                <div className="product-image-container">
                    <div className="product-image-rows">
                        {
                            placeImgs?.map(item => (
                                <img className="smaller-imgs"
                                onError={e => { e.currentTarget.src = "https://freight.cargo.site/w/3840/q/75/i/a17dfc0b27e50cb1c75dcd8fcd13a2d11783729f60265d9a00d184bc5a8d9296/VALORANT_1.png"}}
                                src={product.previewImg}>
                                </img>
                            ))
                        }
                    </div>
                    <img className="product-index-image" onError={e => { e.currentTarget.src = "https://freight.cargo.site/w/3840/q/75/i/a17dfc0b27e50cb1c75dcd8fcd13a2d11783729f60265d9a00d184bc5a8d9296/VALORANT_1.png"}} src={product.previewImg}></img>
                    <FavButton productId={productId}/>
                </div>
                <div className="product-details-container">
                    <div className="product-details-owner">
                        {product.owner.username}
                        <i class="fa-solid fa-heart"></i>
                    </div>
                    <div className="product-detials-owner-stats">
                        {'1 Sale'}
                        {' | '}
                        {findStars(product.avg)}
                    </div>
                    <div className="product-details-name">
                        {product.name}
                    </div>
                    <div className="product-details-price">
                        {`$${product.price}.00`}
                    </div>
                    <div className="product-details-options">
                        <div className="product-options-select-name">
                            Options<i class="fa-solid fa-asterisk fa-2xs"></i>
                        </div>
                        <select
                         className="product-details-select"
                         onChange={(e) => {
                            setOption(e.target.value)
                            setOptionValue(e.target.childNodes[e.target.value].label)
                            setOptionsError([])
                        }}
                         >
                            <option  value='0'>Select an option</option>
                            {options && options.map((item, i) => (
                                <option label={item} value={i + 1}>{item}</option>
                            ))}
                            {/* <option value={}></option> */}
                        </select>
                        <ul className={optionsErrorName}>
                            {optionsError.map((error,idx) =>(<li key={idx}>{error}</li>))}
                        </ul>
                        <div className="product-quantity-container">
                            <div className="product-details-quantity-container">
                                Quantity:{product.stock === 0 ? 'Out of stock' : quantity}
                                <ul className={quantityErrorName}>
                                    {quantityError.map((error,idx) =>(<li key={idx}>{error}</li>))}
                                </ul>
                            </div>
                            <button className="product-quantity-button" onClick={incrimentQuantity}><i class="fa-solid fa-plus"></i></button>
                            <button className="product-quantity-button" onClick={decrimentQuantity}><i class="fa-solid fa-minus"></i></button>
                        </div>
                    </div>
                    <ComingSoonBuyItNowModal feature={'Direct purchase from product listing'}/>
                    <form className="product-add-to-cart-button-form" onSubmit={addCart}>
                        <button className="product-to-cart-button" type="submit">Add to cart</button>
                    </form>
                </div>
            </div>
            <div className="product-content-description-container">
                <div className="product-comments-container">
                    <div className="product-reviews-container-summary">
                        <div>
                            {`${product.reviews?.length} product reviews`}
                        </div>
                        {findStars(product.avg) === 'No Reviews' ? '' : findStars(product.avg)}
                        <CreateReviewFormModal product={product}/>
                    </div>
                    {product.reviews?.map(review => (
                        <ReviewIndex  productId={id} review={review} findStars={findStars} />
                    ))}
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
                            <img className="meet-seller-img" src={'https://i.pinimg.com/originals/b1/92/4d/b1924dce177345b5485bb5490ab3441f.jpg'}></img>
                            <div className="meet-seeler-description">
                                <div>
                                    {product.owner?.username}
                                </div>
                                <div>
                                    {`Owner of ${product.name}`}
                                </div>
                            </div>
                       </div>
                       <ComingSoonBuyMessageOwnerModal name={product.owner?.username}/>
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
