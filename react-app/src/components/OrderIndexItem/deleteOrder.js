import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { Modal } from "../../context/Modal";
import { addToCart, deleteFromCart, editToCartRemove, fetchCart } from "../../store/cart";
import { createOrder, removeOrder, updateOrder } from "../../store/order";
import { createProduct, editProduct, removeProduct, updateProduct } from "../../store/product";
import './index.css';

function DeleteOrderForm({setShowModal, order}){
    const dispatch = useDispatch()
    const [address, setAddress] = useState(order.address)
    const [city, setCity] = useState(order.city)
    const [state, setState] = useState(order.state)
    const [errors, setErrors] = useState([]);
    const history = useHistory()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = []
        if (address.length < 2) return
        if (city.length < 2) return
        if (state.length < 2) return
        // dispatch(createOrder(address, city, state))
        // dispatch(deleteFromCart(product.id));
        // setErrors([]);
        dispatch(removeOrder(order.id))
        // await dispatch(fetchCart())
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
                    Are you sure you want to delete your order?
                    <input
                    type="checkbox"
                    required
                    className='create-product-input'/>
                </label>
                <button className='creater-product-button' type='submit'>Cancel Order</button>
            </form>
        </>
    )
}

export function DeleteOrderFormModal({order, cancelWindow}){
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button disabled={ Date.now() > cancelWindow ? true : false} className="edit-orders-button" onClick={() => setShowModal(true)}>Cancel Order</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteOrderForm setShowModal={setShowModal} order={order}/>
        </Modal>
      )}
    </>
  );
}


export default DeleteOrderForm
