import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { Modal } from "../../context/Modal";
import { addToCart, deleteFromCart, editToCartRemove, fetchCart } from "../../store/cart";
import { createOrder } from "../../store/order";
import { createProduct, editProduct, removeProduct, updateProduct } from "../../store/product";
import './index.css';

function PlaceOrderForm({setShowModal}){
    const dispatch = useDispatch()
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [errors, setErrors] = useState([]);
    const history = useHistory()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = []
        if (address.length < 2) return
        if (city.length < 2) return
        if (state.length < 2) return
        await dispatch(createOrder(address, city, state))
        // dispatch(deleteFromCart(product.id));
        // setErrors([]);

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

export function PlaceOrderFormModal({cart}){
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button disabled={cart.items?.length > 0 ? false : true} className="cart-place-order-button" onClick={() => setShowModal(true)}>Place Order</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PlaceOrderForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}


export default PlaceOrderForm
