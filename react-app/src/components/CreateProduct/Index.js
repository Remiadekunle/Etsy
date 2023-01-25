import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import './index.css';

function CreateProductForm(){
    // const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);

    }

    const handleDelete = async (e) => {
        e.preventDefault();

        // history.push(`/servers/${serverObj.id}/${id}`)

        // closeModal()
    }
    return(
        <>
            <form className="create-product-form" onSubmit={handleSubmit}>
                <label className='create-product-label'>
                    Name
                    <input className='create-product-input'/>
                </label>
                <label className='create-product-label'>
                    Description
                    <input className='create-product-input' />
                </label>
                <label className='create-product-label'>
                    Price
                    <input className='create-product-input'/>
                </label>
                <label className='create-product-label'>
                    Quantity
                    <input className='create-product-input'/>
                </label>
                <label className='create-product-label'>
                    Options
                    <input className='create-product-input'/>
                </label>
                <label className='create-product-label'>
                    PreviewImg
                    <input className='create-product-input'/>
                </label>
                <button className='creater-product-button' type='submit'>Create a product</button>
            </form>
        </>
    )
}

export default CreateProductForm
