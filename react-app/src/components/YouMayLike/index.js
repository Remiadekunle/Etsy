import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { fetchCategory, fetchCategoryRecs } from '../../store/category';
import FavButton, { FavButton2 } from '../FavButton';
import './index.css';

function YouMayLike({ids, categoryId}){
    const dispatch = useDispatch()
    const products = useSelector(state => state.product.allProducts)
    const history = useHistory()

    const selected = []
    for (let i =0; i < ids.length; i++){
        const id = ids[i]
        const product = products[id]
        if (selected.length === 6) continue
        selected.push(product)
    }

    const handleCategory = async () => {
        await dispatch(fetchCategory(categoryId))
        return history.push('/category')
    }
    
    const recs = useSelector(state => state.category.recs)


    return(
        <div className='YML-container'>
            <div className='YML-header'>
                <span>
                    You may also like
                </span>

                <button onClick={async () => {
                    await handleCategory()
                    window.scrollTo(0,0)
                }} className='YML-button'>See more</button>
            </div>
            <div className='YML-products-container'>
                {
                    selected && selected.map(product => (
                        <RecsIndex product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default YouMayLike

export function RecsIndex({product}){
    return(
        <div className='recs-index-container'
        
        >
            <NavLink onClick={() => window.scrollTo(0,0)} className='recs-index-a' to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div>
                    <img className='recs-index-img' src={product.previewImg}></img>
                    <div className='recs-index-name'>
                        {product.name}
                    </div>
                </div>
                <div className='recs-index-price'>
                    {`$${product.price}.00`}
                </div>
            </NavLink>
            <FavButton2 productId={product.id} />
            <div className='recs-index-border'></div>
        </div>
    )
}
