import { useState } from "react"
import { useSelector } from "react-redux"

function CartItem({item}){
    const product = useSelector(state => state.product.allProducts[item.product])
    const [cartQuantity, setCartQuantity] = useState(item.quantity)

    const incrimentQuantity = () => {
        if (cartQuantity >= product.stock) return
        setCartQuantity(cartQuantity + 1)
    }
    const decrimentQuantity = () => {
        if (cartQuantity === 0) return
        setCartQuantity(cartQuantity - 1)
    }
    return(
        <div className="cart-item-index-container">
            <img className="cart-product-img" src={product?.previewImg}></img>
            <div className="cart-product-info-container">
                <div className="cart-product-name-container">
                    <div className="cart-product-name">
                        {product?.name}
                    </div>
                    <div>
                        {'Options placeholder'}
                    </div>
                </div>
                <div className="cart-quantity-buttons">

                </div>
                <div className="cart-cost-metrics">
                    <div className="cart-item-quantity">
                        {`${cartQuantity}`}
                        <i class="fa-solid fa-caret-down"></i>
                    </div>
                    <div className="cart-item-price">
                        {`$${product?.price}.00`}
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