import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Modal } from "../../context/Modal";
import { clearCart } from "../../store/cart";
import './index.css';

function ClearCartForm({setShowModal, product, item}){
    const dispatch = useDispatch()


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
