import { useDispatch, useSelector } from "react-redux"
import { clearCart } from "../../store/cart";
import CartItem from "./CartItem"
import './index.css';
function CartPage(){
    const cart = useSelector(state => state.cart.cart)
    const dispatch = useDispatch()
    console.log('this is the cart', cart)
    const tag = cart.items?.length > 1 ? 'items' : 'item'

    const deleteCart =  async () => {
        await dispatch(clearCart())
    }
    return(
        <div className="cart-page">
            <div className="cart-page-welcome">
                <h1>{`${cart.items?.length} ${tag} in your cart`}</h1>
                <div className="cart-besty-certified">
                    <i class="fa-regular fa-handshake fa-xl"></i>
                    <div>
                        Besty Purchases Protection: Shop confidently on Besty knowing if something goes wrong with an order, we've got your back.
                    </div>
                </div>
            </div>
            <div className="cart-index-container">
                {cart.items?.map(item => (
                    <CartItem item={item}/>
                ))}
                <div className="cart-total-container">
                    <div className="cart-total-data">
                        <div className="cart-discount-container">
                            <div>Item(s) total</div>
                            <div>{`$${cart.total}.00`}</div>
                        </div>
                        <div className="cart-discount-container">
                            <div>Shop discount</div>
                            <div>{'-$00.00'}</div>
                        </div>
                        <div className="cart-discount-container">
                            <div>Subtotal</div>
                            <div>{`$${cart.total}.00`}</div>
                        </div>
                        <div className="cart-discount-container">
                            <div>Shipping</div>
                            <div>{'FREE'}</div>
                        </div>
                        <div className="cart-discount-container">
                            <div>{`Total`}</div>
                            <div>{`$${cart.total}.00`}</div>
                        </div>
                    </div>
                    <button className="cart-place-order-button">Place Order</button>
                    <button className="cart-clear-button" type="button" onClick={deleteCart}>Clear Cart</button>
                </div>
            </div>
        </div>
    )
}


export default CartPage
