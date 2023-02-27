import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { Modal } from "../../context/Modal";
import { addImage, createProduct } from "../../store/product";
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
    const [previewImg, setPreviewImg] = useState(null)
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        let newErrors = [];

        if (name.trim().length < 1) newErrors.push("Product name must be at least 1 letter");
        else if (name.trim().length > 30) newErrors.push("Product name must be less than 30 characters");
        if (price < 1) newErrors.push('Price must be greater than $0')
        if (stock < 1) newErrors.push('Stock must be greater than 0')
        if (option1.trim().length < 1) newErrors.push('Option1 must be at least 1 letter')
        if (option2.trim().length < 1) newErrors.push('Option2 must be at least 1 letter')
        if (option3.trim().length < 1) newErrors.push('Option2 must be at least 1 letter')
        if (description.trim().length < 50) newErrors.push('Description must be greater than 50 letters')
        if (option1 === '-') newErrors.push('Plz enter a different character')
        if (option2 === '-') newErrors.push('Plz enter a different character')
        if (option3 === '-') newErrors.push('Plz enter a different character')



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

        if (description.trim().length < 50) return
        if (name.trim().length > 30) return
        if (option1.trim().length < 1) return
        if (option2.trim().length < 1) return
        if (option3.trim().length < 1) return
        if (option1 === '-') return
        if (option2 === '-') return
        if (option3 === '-') return
        if (price === 0) return
        if (stock === 0) return
        // setErrors([]);
        const options = `${option1}-${option2}-${option3}`
        const set = new Set(name.split(''))
        const nameCheck = name.trim()
        if (nameCheck.length < 1) {
            setErrors(['name: name must atleast 1 letter'])
            return
        }
        // console.log(typeof price)
        const payload = {
            name,
            description,
            price,
            stock,
            options,
            previewImg
        }
        const formData = new FormData();

        formData.append("image", previewImg);
        const body = await dispatch(createProduct(payload, formData))
        // .catch(async (res) => {
        //     console.log('hey res', res)
        //     // const data = await res.json();
        //     // if (data && data.errors) {
        //     //     setErrors(data.error)
        //     //     return
        //     // }
        // })
        if (body.id){
            const bod = await dispatch(addImage(formData, body.id))
            if (bod){
                return setErrors([bod])
            }
        } else{
            return setErrors([body])
        }
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', body)

        history.push(`/products/${body.id}`)
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
                    className='create-product-input'
                    rows={4} />
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
                    type="file"
                    required
                    accept="image/*"
                    onChange={(e) => {
                        const url = e.target?.files[0]
                        setPreviewImg(url)
                    }}
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
