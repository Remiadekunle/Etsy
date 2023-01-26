import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { Modal } from "../../context/Modal";
import { createProduct, editProduct, removeProduct, updateProduct } from "../../store/product";
import './index.css';

function DeleteProductForm({setShowModal, product}){
    const dispatch = useDispatch()
    const history = useHistory()
    const {options} = product

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);
        const body = await dispatch(removeProduct(product.id))
        setShowModal(false)
        history.push(`/`)
    }


    return(
        <>
            <form className="create-product-form" onSubmit={handleSubmit}>
                <label className='delete-product-checkbox'>
                    Are you sure you want to delete?
                    <input
                    type="checkbox"
                    required
                    className='create-product-input'/>
                </label>
                <button className='creater-product-button' type='submit'>Delete your product</button>
            </form>
        </>
    )
}

export function DeleteProductModal({product}){
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete your product</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteProductForm setShowModal={setShowModal} product={product}/>
        </Modal>
      )}
    </>
  );
}


export default DeleteProductForm
