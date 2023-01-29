import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchProducts } from '../../store/product';
import './index.css';
import ProductCard, { ProductCardRound, UserCards } from './productCard';

function HomePage(){
    const product = useSelector(state => state.product.allProducts)
    const users = useSelector(state => state.session.examples)
    console.log('hey we getting the users', users)
    console.log('hey we getting the users', users[2])
    return(
        <div className="home-page">
            <div className="home-products-container">
                <div className='welcome-back-container'>
                    <div className='welcome-back-hub'>
                        <ProductCardRound product={product[1]}/>
                        <ProductCardRound product={product[3]}/>
                        <ProductCardRound product={product[2]}/>
                        <ProductCardRound product={product[4]}/>
                        <ProductCardRound product={product[5]}/>
                    </div>
                    <div className='welcome-back-items'>
                        <div className='welcome-back-items-groupA'>
                            <ProductCard product={product[6]}/>
                            <ProductCard product={product[7]}/>
                            <ProductCard product={product[8]}/>
                            <ProductCard product={product[9]}/>
                            <ProductCard product={product[10]}/>
                        </div>
                        <div className='welcome-back-items-groupB'>
                            <ProductCard product={product[10]}/>
                            <ProductCard product={product[11]}/>
                            <ProductCard product={product[12]}/>
                            <ProductCard product={product[1]}/>
                            <ProductCard product={product[5]}/>
                        </div>
                    </div>
                </div>
                <div className='home-sample-products'>
                    <div className='browse-users-heading'>
                        <h2>
                            Browse for items from other users
                        </h2>
                        <div>

                        </div>
                    </div>
                    <div className='home-sample-gaming'>
                        <div className='Besty-sample-gaming-products'>
                            <div className='Besty-sample-gaming-products-Top'>
                                <div className='Besty-sample-gaming-heading'>
                                    <div>
                                        Besty's Picks
                                        <h2>Gaming Wear</h2>
                                    </div>
                                </div>
                                <div className='Besty-sample-gaming-imgs-top'>
                                    <img className='Besty-sample-gaming-row-img2' src='https://www.volpinprops.com/wp-content/uploads/2021/12/1319RIO_VAL_Champions-8.jpg'>
                                    </img>
                                    <img className='Besty-sample-gaming-row-img2' src='https://www.volpinprops.com/wp-content/uploads/2021/12/1319RIO_VAL_Champions-8.jpg'>
                                    </img>
                                </div>
                            </div>
                            <div className='Besty-sample-gaming-products-Bottom'>
                                <img className='Besty-sample-gaming-row-img' src='https://www.volpinprops.com/wp-content/uploads/2021/12/1319RIO_VAL_Champions-8.jpg'></img>
                                <img className='Besty-sample-gaming-row-img' src='https://www.volpinprops.com/wp-content/uploads/2021/12/1319RIO_VAL_Champions-8.jpg'></img>
                                <img className='Besty-sample-gaming-row-img' src='https://www.volpinprops.com/wp-content/uploads/2021/12/1319RIO_VAL_Champions-8.jpg'></img>
                                <img className='Besty-sample-gaming-row-img' src='https://www.volpinprops.com/wp-content/uploads/2021/12/1319RIO_VAL_Champions-8.jpg'></img>
                            </div>
                        </div>
                        <div>
                            <img className='vct-trophy-img' src='https://www.volpinprops.com/wp-content/uploads/2021/12/1319RIO_VAL_Champions-8.jpg'>
                            </img>
                        </div>
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
