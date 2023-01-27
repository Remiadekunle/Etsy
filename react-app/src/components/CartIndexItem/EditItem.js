import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { Modal } from "../../context/Modal";
import { deleteFromCart } from "../../store/cart";
import { createProduct, editProduct, removeProduct, updateProduct } from "../../store/product";
import './index.css';

function EditCartItemForm({setShowModal, product, item}){
    const dispatch = useDispatch()
    const [quant, setQuant] = useState(item.quantity)
    const [newQuant, setNewQuant] = useState(0)
    const history = useHistory()
    const {options} = product

    const handleSubmit = async (e) => {
        e.preventDefault();
        // dispatch(deleteFromCart(product.id));
        // setErrors([]);

        // setShowModal(false)
        // history.push(`/`)
    }


    return(
        <>
            <form className="create-product-form" onSubmit={handleSubmit}>
                <div>
                    Current quantity: {quant}
                </div>
                <label className='delete-product-checkbox'>
                    How much do you want?
                    <input
                    type="number"
                    min={1}
                    max={product.stock}
                    required
                    className='create-product-input'/>
                </label>
                <button className='creater-product-button' type='submit'>Edit your cart item</button>
            </form>
        </>
    )
}

export function EditCartItemModal({product, item}){
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="edit-cart-item-button" onClick={() => setShowModal(true)}>{item?.quantity}<i class="fa-solid fa-caret-down"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCartItemForm setShowModal={setShowModal} item={item} product={product}/>
        </Modal>
      )}
    </>
  );
}


export default EditCartItemForm
