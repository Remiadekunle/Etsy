import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { deleteFromCart, editToCartAdd, editToCartRemove } from "../../store/cart"
import EditCartItemForm, { EditCartItemModal } from "./EditItem"
import { DeleteCartItemModal } from "./RemoveItem"

function CartItem({item, setNoStock}){
    const product = useSelector(state => state.product.allProducts[item.product])
    const [cartQuantity, setCartQuantity] = useState(item.quantity)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();
    const stockDrop = []
    const currQuantity = item.quantity
    const incrimentQuantity = () => {
        if (cartQuantity >= product.stock) return
        setCartQuantity(cartQuantity + 1)
    }
    const decrimentQuantity = () => {
        if (cartQuantity === 0) return
        setCartQuantity(cartQuantity - 1)
    }

    const getStock = () => {
        for(let i = 0;  i < product.stock; i++ ){
            stockDrop.push(i)
        }
    }

    useEffect(() => {
        const errors = []
        if (product.stock === 0){
            errors.push(`This item is out of stock. Please remove to continue.`)
            setNoStock(true)
            setErrors([...errors])
        }

        return () => {
            setNoStock(false)
            setErrors([])
        }
    }, [product])
    if(!product){
        return null
    }
    const updateCart = async (e) => {
        if (cartQuantity === item.quantity) return
        console.log('we got past the validation', currQuantity)
        if (cartQuantity < currQuantity){

        } else{

        }
        e.preventDefault();

    }
    getStock();

    return(
        <div className="cart-item-index-container">
            <NavLink to={`/products/${product.id}`}>
                <img className="cart-product-img" src={product?.previewImg} onError={e => { e.currentTarget.src = "https://freight.cargo.site/w/3840/q/75/i/a17dfc0b27e50cb1c75dcd8fcd13a2d11783729f60265d9a00d184bc5a8d9296/VALORANT_1.png"}}></img>
            </NavLink>
            <div className="cart-product-info-container">
                <div className="cart-product-name-container">
                    <NavLink className='navlink-back-to-product' to={`/products/${product.id}`}>
                        <div className="cart-product-name">
                            {product?.name}
                        </div>
                    </NavLink>
                    <div>
                        {`Option: ${item?.option}`}
                    </div>
                    <div>
                        {errors.map((error, ind) => (
                            <div className='product-modal-errors' key={ind}>{error}</div>
                        ))}
                    </div>
                    {/* <div className="product-description-cart">
                        {`Description: ${product.description}`}
                    </div> */}
                    <DeleteCartItemModal product={product} item={item}/>
                </div>

                <div className="cart-cost-metrics">
                    {/* <select value={cartQuantity} onChange={(e) => {
                        setCartQuantity(e.target.value)
                        console.log('in the onchange')
                        updateCart(e)
                        }} className="cart-item-quantity">
                        {
                            stockDrop.map(index => (
                                <option value={index}>{index}</option>
                            ))
                        }
                    </select> */}
                    <EditCartItemModal product={product} item={item} />
                    <div className="cart-item-price">
                        {`$${product?.price * item.quantity}.00`}
                    </div>
                    {/* <button className="product-quantity-button" onClick={incrimentQuantity}><i class="fa-solid fa-plus"></i></button>
                    <button className="product-quantity-button" onClick={decrimentQuantity}><i class="fa-solid fa-minus"></i></button> */}

                </div>
            </div>
            {/* {item.quantity} */}
        </div>
    )
}

export default CartItem
