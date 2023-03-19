import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { Modal } from "../../context/Modal";
import { addToCart, deleteFromCart, editToCartRemove, fetchCart } from "../../store/cart";
import { createOrder, updateOrder } from "../../store/order";
import { createProduct, editProduct, removeProduct, updateProduct } from "../../store/product";
import './index.css';

function EditOrderForm({setShowModal, order}){
    const dispatch = useDispatch()
    const [address, setAddress] = useState(order.address)
    const [city, setCity] = useState(order.city)
    const [state, setState] = useState(order.state)
    const [errors, setErrors] = useState([]);
    const history = useHistory()

    useEffect(() => {
      const newErrors = []
      if (address.trim().length < 1) newErrors.push('Address must be atleast 1 letter')
      if (address.trim().length > 30) newErrors.push('Address must be less 20 letters')
      if (city.trim().length > 30) newErrors.push('City must be less 20 letters')
      if (state.trim().length !== 2) newErrors.push('state must be exactly 2 letter')
      if (city.trim().length < 1) newErrors.push('city must be atleast 1 letter')
      setErrors(newErrors)
    }, [address, city, state])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = []
        if (address.trim().length < 1 || address.trim().length > 30) return
        if (city.trim().length < 1 || city.trim().length > 30) return
        if (state.trim().length !== 2) return
        dispatch(updateOrder(address, city, state, order.id))
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

export function EditOrderFormModal({order, createdAt}){
    const [showModal, setShowModal] = useState(false);

    const className = Date.now() > createdAt ? 'edit-orders-button2' : 'edit-orders-button'

  return (
    <>
      <button className={className} onClick={() => setShowModal(true)} disabled={Date.now() > createdAt ? true : false}>Edit Order</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditOrderForm setShowModal={setShowModal} order={order}/>
        </Modal>
      )}
    </>
  );
}


export default EditOrderForm
