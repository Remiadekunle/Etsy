import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchProducts } from '../../store/product';
import Footer from '../FooterItems';
import HomePageSlideshow, { HomePageSlideshow2 } from './HomePageSlides';
import './index.css';
import ProductCard, { BestyPickCard, ProductCardRound, UserCards } from './productCard';

function HomePage(){
    const product = useSelector(state => state.product.allProducts)
    const user = useSelector(state => state.session.user)
    useEffect(() => {
        return () => window.scrollTo(0, 0);
    }, [])
    return(
        <div className="home-page">
            <div className='welcome-back-background'>
                {user ? <h2>Welcome back, {user.username}!</h2> : <h2>Welcome!!!</h2>}
            </div>
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
                        <div className='Usercard-container'>
                            <UserCards products={product} items={10} name='Omen' ids={[1, 5, 9, 13]}/>
                            <UserCards products={product} items={6} name='Reyna' ids={[2, 6, 10, 14]}/>
                            <UserCards products={product} items={25} name='Takeo' ids={[3, 7, 11, 15]}/>
                            <UserCards products={product} items={4} name='Asta' ids={[4, 8, 12, 16]}/>
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
                                    <BestyPickCard product={product[13]}/>
                                    <BestyPickCard product={product[14]}/>
                                </div>
                            </div>
                            <div className='Besty-sample-gaming-products-Bottom'>
                                <BestyPickCard product={product[15]}/>
                                <BestyPickCard product={product[16]}/>
                                <BestyPickCard product={product[17]}/>
                                <BestyPickCard product={product[18]}/>
                            </div>
                        </div>
                        <div className='vct-trophy-container'>
                            <img className='vct-trophy-img' src='https://www.volpinprops.com/wp-content/uploads/2021/12/1319RIO_VAL_Champions-8.jpg'>
                            </img>
                        </div>
                    </div>
                    {/* <div className='home-sample-keyboards'>

                    </div>
                    <div className='home-sample-audio'>

                    </div> */}
                </div>
            </div>
            <div className='home-slidehow-container'>
                <div className='home-slidehow-header'>
                    Besty's products
                </div>
                <div className='home-slides-container'>
                    <HomePageSlideshow product={product}/>
                    <HomePageSlideshow2 product={product}/>
                </div>
            </div>
            <div className='home-page-container-footer'>
                <Footer />
            </div>
            {/* <div className='footer'>
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
            </div> */}
        </div>
    )
}

export default HomePage
