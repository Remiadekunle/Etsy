import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { clearCart, fetchCart } from "../../store/cart";
import { addOrder, createOrder } from "../../store/order";
import CartItem from "./CartItem"
import './index.css';
import { PlaceOrderFormModal } from "./placeOrder";
function CartPage(){
    const cart = useSelector(state => state.cart.cart)
    const dispatch = useDispatch()
    const history = useHistory();
    console.log('this is the cart', cart)
    const tag = cart.items?.length > 1 ? 'items' : 'item'

    const deleteCart =  async () => {
        await dispatch(clearCart())
    }

    const placeOrder = async () => {
        await dispatch(createOrder())
        await dispatch(fetchCart())
        return history.push('/orders')
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
                    <div className="payment-types-excepted">
                        <div className="secure-section-container">
                            <i class="fa-solid fa-lock"></i>
                            <div>
                                Secure options in checkout
                            </div>
                        </div>
                        <div className="payment-images-container">
                            <img className="radianite-img" src="https://vgraphs.com/images/players/unlocks/valorant-unlock-free-radianite-points.png"></img>
                            <img className="v-bucks-img" src="https://pbs.twimg.com/media/DsImRImU0AASOXf.png"></img>
                            <img className="divinium-img" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/3bab34bc-9c8a-4e6e-9497-2f2bac0917a3/daz5f1y-b8761026-3ca6-40cc-b7be-c57ceff57626.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzNiYWIzNGJjLTljOGEtNGU2ZS05NDk3LTJmMmJhYzA5MTdhM1wvZGF6NWYxeS1iODc2MTAyNi0zY2E2LTQwY2MtYjdiZS1jNTdjZWZmNTc2MjYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.059IroidNS9cpqFVjrz7sPSLsoJSI8AhPf-OAcVCUlY"></img>
                            <img className="berry-img" src="https://files.cults3d.com/uploaders/14566836/illustration-file/8dbf361b-e41f-4fb1-a0c8-feb814bc9cfb/one_piece_beri_coin_v4.png"></img>
                        </div>

                    </div>
                    <div className="cart-total-data">
                        <div className="cart-discount-container">
                            <div>Item(s) total</div>
                            <div>{`$${cart.total}.00`}</div>
                        </div>
                        <div className="cart-discount-container2">
                            <div>Shop discount</div>
                            <div>{'-$00.00'}</div>
                        </div>
                        <div className="cart-discount-container3">
                            <div>Subtotal</div>
                            <div>{`$${cart.total}.00`}</div>
                        </div>
                        <div className="cart-discount-container4">
                            <div>Shipping</div>
                            <div>{'FREE'}</div>
                        </div>
                        <div className="cart-discount-container5">
                            <div>{`Total`}</div>
                            <div>{`$${cart.total}.00`}</div>
                        </div>
                    </div>
                    {/* <button className="cart-place-order-button" onClick={placeOrder}>Place Order</button> */}
                    <PlaceOrderFormModal />
                    <button className="cart-clear-button" type="button" onClick={deleteCart}>Clear Cart</button>
                    <button className="besty-coupon-button"><i class="fa-solid fa-tag fa-xl"></i><div>Apply Besty coupon code</div></button>
                </div>
            </div>
        </div>
    )
}


export default CartPage
