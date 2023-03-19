import React, {  useState } from "react";
import { useDispatch } from 'react-redux';
import { Modal } from "../../context/Modal";
import { addToCart,  editToCartRemove } from "../../store/cart";
import './index.css';

function EditCartItemForm({setShowModal, product, item}){
    const dispatch = useDispatch()
    const [newQuant, setNewQuant] = useState(item.quantity)
    const [errors, setErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = []
        if (parseInt(newQuant) === parseInt(item.quantity)){
          newErrors.push('Please enter new quantity')
          setErrors(newErrors)
          return
        }
        if (parseInt(newQuant) > parseInt(item.quantity)){
          // console.log('yep its def greater')
          const final = parseInt(newQuant) - parseInt(item.quantity)
          dispatch(addToCart(product.id, final, item.option))
        } else{
          const final = parseInt(item.quantity) - parseInt(newQuant)
          dispatch(editToCartRemove(product.id, final, item.option))
        }


        setShowModal(false)
  
    }


    return(
        <>
            <form className="edit-product-form" onSubmit={handleSubmit}>
              <ul className="create-product-error-container">
                      {errors.map((error, idx) => (
                      <li className="product-modal-errors" key={idx}>
                          {error}
                      </li>
                      ))}
                  </ul>
                <div className="cart-edit-form-curr-qunatity">
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
    const editCartProductClass = product.stock === 0? 'disabled-edit-cart-item-button' :  'edit-cart-item-button'

  return (
    <>
      <button disabled={product.stock === 0? true : false} className={editCartProductClass} onClick={() => setShowModal(true)}>{item?.quantity}<i class="fa-solid fa-caret-down"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCartItemForm setShowModal={setShowModal} item={item} product={product}/>
        </Modal>
      )}
    </>
  );
}


export default EditCartItemForm
