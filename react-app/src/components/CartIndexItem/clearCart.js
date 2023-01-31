import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { Modal } from "../../context/Modal";
import { addToCart, clearCart, deleteFromCart, editToCartRemove } from "../../store/cart";
import { createProduct, editProduct, removeProduct, updateProduct } from "../../store/product";
import './index.css';

function ClearCartForm({setShowModal, product, item}){
    const dispatch = useDispatch()
    const history = useHistory()


    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(clearCart())

        setShowModal(false)
        // history.push(`/`)
    }


    return(
        <>
            <form className="create-product-form" onSubmit={handleSubmit}>
                <label className='delete-product-checkbox2'>
                    Are you sure you want to clear all items?
                    <input
                    type="checkbox"
                    required
                    className='create-product-input'/>
                </label>
                <button className='creater-product-button' type='submit'>Clear your cart</button>
            </form>
        </>
    )
}

export function ClearCartModal({product, item}){
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="cart-clear-button" onClick={() => setShowModal(true)}>Clear Cart</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ClearCartForm setShowModal={setShowModal} item={item} product={product}/>
        </Modal>
      )}
    </>
  );
}


export default ClearCartForm
