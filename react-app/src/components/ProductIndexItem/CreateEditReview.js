import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
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
    const user = useSelector(state => state.session.user)
    const [content, setContent] = useState('')
    const [img, setImg] = useState('')
    const [description, setDescription] = useState(product.description)

    const [errors, setErrors] = useState([]);
    useEffect(() => {
        let newErrors = [];

        if (content.length < 5) newErrors.push('Content: please type atleast 5 chars')
        if (content.length > 75) newErrors.push('Content: please type under 75 chars')
        if (stars > 5 || stars < 0) newErrors.push('Stars: please input a number between 1 and 5')

        setErrors(newErrors);
    }, [content, stars]);

    if (!user){
        return (
            <div className="login-check-container">
                Please login to continue
            </div>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        if (content.length < 5) {
            setErrors(['Content: please type atleast 5 chars'])
            return
        }
        else if (content.length > 75){
            setErrors(['Content: please type under 75 chars'])
            return
        }
        if (stars > 5 || stars < 0) {
            setErrors(['Stars: please input a number between 1 and 5'])
        }
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
                    <div className="the-modal-review-labels">
                        stars<i class="fa-solid fa-asterisk fa-2xs"></i>
                    </div>
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
                    <div className="the-modal-review-labels">
                        content<i class="fa-solid fa-asterisk fa-2xs"></i>
                    </div>
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
        if (content.length < 5) newErrors.push('Content: please type atleast 5 chars')
        if (content.length > 75) newErrors.push('Content: please type under 75 chars')
        if (stars > 5 || stars < 0) newErrors.push('Stars: please input a number between 1 and 5')


        setErrors(newErrors);
    }, [content, stars]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        if (content.length < 5) {
            setErrors(['Content: please type atleast 5 chars'])
            return
        }
        else if (content.length > 75){
            setErrors(['Content: please type under 75 chars'])
            return
        }
        if (stars > 5 || stars < 0) {
            setErrors(['Stars: please input a number between 1 and 5'])
        }

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
                    <div className="the-modal-review-labels">
                        stars<i class="fa-solid fa-asterisk fa-2xs"></i>
                    </div>
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
                    <div className="the-modal-review-labels">
                        content<i class="fa-solid fa-asterisk fa-2xs"></i>
                    </div>
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
