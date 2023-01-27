import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { Modal } from "../../context/Modal";
import { deleteFromCart } from "../../store/cart";
import { createProduct, editProduct, removeProduct, updateProduct } from "../../store/product";
import './index.css';

function DeleteCartItemForm({setShowModal, product, item}){
    const dispatch = useDispatch()
    const history = useHistory()
    const {options} = product

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(deleteFromCart(product.id, item.option));
        // setErrors([]);

        setShowModal(false)
        // history.push(`/`)
    }


    return(
        <>
            <form className="create-product-form" onSubmit={handleSubmit}>
                <label className='delete-product-checkbox'>
                    Are you sure you want to delete this item?
                    <input
                    type="checkbox"
                    required
                    className='create-product-input'/>
                </label>
                <button className='creater-product-button' type='submit'>Delete your cart item</button>
            </form>
        </>
    )
}

export function DeleteCartItemModal({product, item}){
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="delete-cart-item-button" onClick={() => setShowModal(true)}><i class="fa-regular fa-trash-can fa-2xl"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteCartItemForm item={item} setShowModal={setShowModal} product={product}/>
        </Modal>
      )}
    </>
  );
}


export default DeleteCartItemForm
