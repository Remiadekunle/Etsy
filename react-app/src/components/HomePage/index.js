import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/product';
import './index.css';

function HomePage(){
    return(
        <div className="home-page">
            <div className="home-products-container">
                <div className='welcome-back-container'>
                    <div className='welcome-back-hub'>

                    </div>
                    <div className='welcome-back-items'>

                    </div>
                </div>
                <div className='home-sample-products'>
                    <div className='home-sample-gaming'>

                    </div>
                    <div className='home-sample-keyboards'>

                    </div>
                    <div className='home-sample-audio'>

                    </div>

                </div>
            </div>
            <div className='footer'>
                <h1>
                    Besty
                </h1>
                <div className='footer-items-container'>
                    <div className='footer-item'>
                        Technology
                    </div>
                    <div className='footer-item'>
                        About Me
                    </div>
                    <div className='footer-item'>
                        Placeholder
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
