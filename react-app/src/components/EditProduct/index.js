import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { Modal } from "../../context/Modal";
import { createProduct, editProduct, updateProduct } from "../../store/product";
import './index.css';

function EditProductForm({setShowModal, product}){
    const dispatch = useDispatch()
    const history = useHistory()
    const {options} = product
    const [name, setName] = useState(product.name)
    const [description, setDescription] = useState(product.description)
    const [price, setPrice] = useState(product.price)
    const [stock, setStock] = useState(product.stock)
    const [option1, setOption1] = useState(product.options.split('-')[0])
    const [option2, setOption2] = useState(product.options.split('-')[1])
    const [option3, setOption3] = useState(product.options.split('-')[2])
    const [previewImg, setPreviewImg] = useState(product.previewImg)
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        let newErrors = [];

        if (name.trim().length < 1) newErrors.push("Product name must be at least 1 letter");
        else if (name.trim().length > 30) newErrors.push("Product name must be less than 30 characters");
        if (price < 1) newErrors.push('Price must be greater than $0')
        if (stock < 1) newErrors.push('Stock must be greater than 0')
        if (description.trim().length < 50) newErrors.push('Description must be greater than 50 letters')
        if (option1.trim().length < 1) newErrors.push('Option1 must be at least 1 letter')
        if (option2.trim().length < 1) newErrors.push('Option2 must be at least 1 letter')
        if (option3.trim().length < 1) newErrors.push('Option2 must be at least 1 letter')



        setErrors(newErrors);
    }, [name, previewImg, option3, option2, option1, stock, price, description]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);
        if (description.trim().length < 50) return
        if (name.trim().length > 30) {
            return
        }
        if (parseInt(price) === 0) return
        if (option1.trim().length < 1) return
        if (option2.trim().length < 1) return
        if (option3.trim().length < 1) return
        if (parseInt(stock) === 0) return
        // setErrors([]);
        const options = `${option1}-${option2}-${option3}`
        const set = new Set(name.split(''))
        const nameCheck = name.trim()
        if (nameCheck.length < 1) {
            setErrors(['name: name must atleast 1 letter'])
            return
        }
        const payload = {
            name,
            description,
            price,
            stock,
            options,
            previewImg
        }
        const body = await dispatch(updateProduct(payload, product.id))


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
                    Name
                    <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='create-product-input'/>
                </label>
                <label className='create-product-label'>
                    Description
                    <input
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='create-product-input' />
                </label>
                <label className='create-product-label'>
                    Price
                    <input
                    type="number"
                    required
                    min={1}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className='create-product-input'/>
                </label>
                <label className='create-product-label'>
                    Quantity
                    <input
                    type="number"
                    min='1'
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className='create-product-input'/>
                </label>
                <label className='create-product-label'>
                    Option 1
                    <input
                    type="text"
                    required
                    value={option1}
                    onChange={(e) => setOption1(e.target.value)}
                    className='create-product-input'/>
                </label>
                <label className='create-product-label'>
                    Option 2
                    <input
                    type="text"
                    required
                    value={option2}
                    onChange={(e) => setOption2(e.target.value)}
                    className='create-product-input'/>
                </label>
                <label className='create-product-label'>
                    Option 3
                    <input
                    type="text"
                    required
                    value={option3}
                    onChange={(e) => setOption3(e.target.value)}
                    className='create-product-input'/>
                </label>
                <label className='create-product-label'>
                    PreviewImg
                    <input
                    type="url"
                    required
                    value={previewImg}
                    onChange={(e) => setPreviewImg(e.target.value)}
                    className='create-product-input'/>
                </label>
                <button className='creater-product-button' type='submit'>Edit your product</button>
            </form>
        </>
    )
}

export function EditProductModal({product}){
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="edit-product-button" onClick={() => setShowModal(true)}><i class="fa-regular fa-pen-to-square fa-2xl"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditProductForm setShowModal={setShowModal} product={product}/>
        </Modal>
      )}
    </>
  );
}


export default EditProductForm
