import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { Modal } from "../../context/Modal";
import { addToCart, deleteFromCart, editToCartRemove } from "../../store/cart";
import { createProduct, editProduct, removeProduct, updateProduct } from "../../store/product";
import './index.css';

function EditCartItemForm({setShowModal, product, item}){
    const dispatch = useDispatch()
    const [quant, setQuant] = useState(item.quantity)
    const [newQuant, setNewQuant] = useState(item.quantity)
    const [errors, setErrors] = useState([]);
    const history = useHistory()
    const {options} = product

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = []
        console.log('hi were in the submite with', newQuant)
        if (parseInt(newQuant) === parseInt(item.quantity)){
          newErrors.push('New quantity is the same as the current quantity')
          setErrors(newErrors)
          console.log('ummmm i think you should return')
          return
        }
        if (parseInt(newQuant) > parseInt(item.quantity)){
          console.log('yep its def greater')
          const final = parseInt(newQuant) - parseInt(item.quantity)
          dispatch(addToCart(product.id, final, item.option))
        } else{
          const final = parseInt(item.quantity) - parseInt(newQuant)
          dispatch(editToCartRemove(product.id, final, item.option))
        }
        // dispatch(deleteFromCart(product.id));
        // setErrors([]);

        setShowModal(false)
        // history.push(`/`)
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
                <div>
                    Current quantity: {item.quantity}
                </div>
                <label className='delete-product-checkbox'>
                    How much do you want?
                    <input
                    type="number"
                    min={1}
                    max={product.stock}
                    onChange={(e) => setNewQuant(e.target.value)}
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
