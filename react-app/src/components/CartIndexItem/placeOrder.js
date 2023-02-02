import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { Modal } from "../../context/Modal";
import { addToCart, deleteFromCart, editToCartRemove, fetchCart } from "../../store/cart";
import { createOrder } from "../../store/order";
import { createProduct, editProduct, fetchProducts, removeProduct, updateProduct } from "../../store/product";
import './index.css';

function PlaceOrderForm({setShowModal, setCartErrors}){
    const dispatch = useDispatch()
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [errors, setErrors] = useState([]);
    const history = useHistory()
    const user = useSelector(state => state.session.user)

    useEffect(() => {
      const newErrors = []
      if (address.trim().length < 1) newErrors.push('Address must be atleast 1 letter')
      if (address.trim().length > 30) newErrors.push('Address must be less 20 letters')
      if (city.trim().length > 30) newErrors.push('City must be less 20 letters')
      if (state.trim().length !== 2) newErrors.push('state must be exactly 2 letter')
      if (city.trim().length < 1) newErrors.push('city must be atleast 1 letter')
      setErrors(newErrors)
      console.log('ummmmmm the use effect is firing')
    }, [address, city, state])

    if (!user){
      return (
          <div className="login-check-container">
              Please login to continue
          </div>
      )
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = []
        if (address.trim().length < 1 || address.trim().length > 30) return
        if (city.trim().length < 1 || city.trim().length > 30) return
        if (state.trim().length !== 2) return
        const body = await dispatch(createOrder(address, city, state))

        if (Object?.values(body).length > 0){
          setCartErrors([body])
          setShowModal(false)
          return
        }
        // dispatch(deleteFromCart(product.id));
        // setErrors([]);
        await dispatch(fetchProducts())
        await dispatch(fetchCart())
        setShowModal(false)
        return history.push('/orders')
    }


    return(
        <>
            <form className="create-product-form" onSubmit={handleSubmit}>
              <ul className="create-product-error-container">
                      {errors.map((error, idx) => (
                      <li className="product-modal-errors" key={idx}>
                          {error}
                      </li>
                      ))}
                  </ul>
                <label className='delete-product-checkbox'>
                    Address
                    <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className='create-product-input'/>
                </label>
                <label className='delete-product-checkbox'>
                    City
                    <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className='create-product-input'/>
                </label>
                <label className='delete-product-checkbox'>
                    State
                    <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    className='create-product-input'/>
                </label>
                <button className='creater-product-button' type='submit'>Place order</button>
            </form>
        </>
    )
}

export function PlaceOrderFormModal({cart, noStock, setCartErrors}){
    const [showModal, setShowModal] = useState(false);
    const className = (cart.items?.length > 0 && noStock === false) ? 'cart-place-order-button' : 'cart-place-order-button2'

  return (
    <>
      <button disabled={(cart.items?.length > 0 && noStock === false) ? false : true} className={className} onClick={() => setShowModal(true)}>Place Order</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PlaceOrderForm setCartErrors={setCartErrors} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}


export default PlaceOrderForm
