import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { Modal } from "../../context/Modal";
import { createProduct } from "../../store/product";
import './index.css';

function CreateProductForm({setShowModal}){
    const dispatch = useDispatch()
    const history = useHistory()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [option1, setOption1] = useState('')
    const [option2, setOption2] = useState('')
    const user = useSelector(state => state.session.user)
    const [option3, setOption3] = useState('')
    const [previewImg, setPreviewImg] = useState('')
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        let newErrors = [];

        if (name.length < 1) newErrors.push("Product name must be at least 1 character");
        else if (name.length > 30) newErrors.push("Product name must be less than 30 characters");
        if (price < 1) newErrors.push('Price must be greater than $0')
        if (stock < 1) newErrors.push('Stock must be greater than 0')
        if (description.length < 50) newErrors.push('Description must be greater than 50 characters')



        setErrors(newErrors);
    }, [name, previewImg, option3, option2, option1, stock, price, description]);

    if (!user){
        return (
            <div className="login-check-container">
                Please login to continue
            </div>
        )
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (description.length < 50) return
        if (name.length > 30) return
        if (price === 0) return
        if (stock === 0) return
        // setErrors([]);
        const options = `${option1}-${option2}-${option3}`
        const set = new Set(name.split(''))
        if (set.size == 1 && set.has(' ')) {
            setErrors(['name: name must not be all whitespace'])
            return
        }
        console.log(typeof price)
        const payload = {
            name,
            description,
            price,
            stock,
            options,
            previewImg
        }
        const body = await dispatch(createProduct(payload)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.error)
                return
            }
        })

        const errors = body.errors
        console.log('yo theses are the errrors man', body)
        if (body?.length > 0){
            console.log(body)

            console.log('plz')
            setErrors(body)
            return
        }


        history.push(`/products/${body.product.id}`)
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
                    <textarea
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
                <button className='creater-product-button' type='submit'>Create a product</button>
            </form>
        </>
    )
}

export function CreateProductModal(){
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="create-product-nav-button" onClick={() => setShowModal(true)}>Create a product</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateProductForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}


export default CreateProductForm
