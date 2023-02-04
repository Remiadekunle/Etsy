import { useSelector } from 'react-redux';
import './index.css';

function YouMayLike(){
    const products = useSelector(state => state.product.allProducts)
    const productsArr = []
    for (let i = 0; i < 7; i++){

    }
    

    return(
        <div className='YML-container'>
            <div className='YML-header'>
                <span>
                    You may also like
                </span>

                <button className='YML-button'>See more</button>
            </div>
            <div className='YML-products-container'>
                <img></img>
                <div>

                </div>
            </div>
        </div>
    )
}

export default YouMayLike
