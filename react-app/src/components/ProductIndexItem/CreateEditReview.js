import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { Modal } from "../../context/Modal";
import { addReview, createProduct, editProduct, updateProduct, updateReview } from "../../store/product";
import './index.css';

function CreateReviewForm({setShowModal, product}){
    const dispatch = useDispatch()
    const history = useHistory()
    const {options} = product
    const [stars, setStars] = useState(1)
    const [content, setContent] = useState('')
    const [img, setImg] = useState('')
    const [description, setDescription] = useState(product.description)

    const [errors, setErrors] = useState([]);
    useEffect(() => {
        let newErrors = [];



        setErrors(newErrors);
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        await dispatch(addReview(product.id, content, stars, img))
        setShowModal(false)
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
                <label className='create-product-label'>
                    stars
                    <input
                    type="number"
                    required
                    min={1}
                    max={5}
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    className='create-product-input'/>
                </label>
                <label className='create-product-label'>
                    content
                    <input
                    type="text"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='create-product-input' />
                </label>
                <label className='create-product-label'>
                    img
                    <input
                    type="url"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                    className='create-product-input'/>
                </label>
                <button className='creater-product-button' type='submit'>Create Comment</button>
            </form>
        </>
    )
}

export function CreateReviewFormModal({product}){
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="create-review-button" onClick={() => setShowModal(true)}><i class="fa-solid fa-plus fa-xl"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReviewForm setShowModal={setShowModal} product={product}/>
        </Modal>
      )}
    </>
  );
}


export default CreateReviewForm


export function EditReviewForm({setShowModal, productId, review}){
    const dispatch = useDispatch()
    const history = useHistory()
    const [stars, setStars] = useState(review.stars)
    const [content, setContent] = useState(review.content)
    const [img, setImg] = useState(review.reviewImg)

    const [errors, setErrors] = useState([]);
    useEffect(() => {
        let newErrors = [];



        setErrors(newErrors);
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        await dispatch(updateReview(review.productId, content, stars, img, review.id))
        // await dispatch(addReview(product.id, content, stars, img))
        setShowModal(false)
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
                <label className='create-product-label'>
                    stars
                    <input
                    type="number"
                    required
                    min={1}
                    max={5}
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    className='create-product-input'/>
                </label>
                <label className='create-product-label'>
                    content
                    <input
                    type="text"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='create-product-input' />
                </label>
                <label className='create-product-label'>
                    img
                    <input
                    type="url"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                    className='create-product-input'/>
                </label>
                <button className='creater-product-button' type='submit'>Edit Comment</button>
            </form>
        </>
    )
}

export function EditReviewFormModal({productId, review}){
    const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="review-index-buttons" onClick={() => setShowModal(true)}><i class="fa-regular fa-pen-to-square fa-xl"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm setShowModal={setShowModal} review={review} productId={productId}/>
        </Modal>
      )}
    </>
  );
}
