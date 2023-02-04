import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { Modal } from "../../context/Modal";
import { addReview, createProduct, editProduct, removeReview, updateProduct, updateReview } from "../../store/product";
import './index.css';

function DeleteReviewForm({setShowModal, review}){
    const dispatch = useDispatch()
    const history = useHistory()
    const [stars, setStars] = useState(1)
    const [content, setContent] = useState('')
    const [img, setImg] = useState('')

    const [errors, setErrors] = useState([]);
    useEffect(() => {
        let newErrors = [];



        setErrors(newErrors);
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        await dispatch(removeReview(review.productId, review.id))
        setShowModal(false)
    }


    return(
        <>
            <form className="create-product-form" onSubmit={handleSubmit}>
                <label className='delete-product-checkbox2'>
                    Are you sure you want to delete?
                    <input
                    type="checkbox"
                    required
                    className='create-product-input'/>
                </label>
                <button className='creater-product-button' type='submit'>Delete your review</button>
            </form>
        </>
    )
}

export function DeleteReviewFormModal({review}){
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="review-index-buttons" onClick={() => setShowModal(true)}><i class="fa-regular fa-trash-can fa-xl"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteReviewForm setShowModal={setShowModal} review={review}/>
        </Modal>
      )}
    </>
  );
}


export default DeleteReviewForm
