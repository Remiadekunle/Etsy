import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchProducts } from '../../store/product';
import './index.css';

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
                        <NavLink to={`/products/${product[1]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className='home-page-welcome-hub-item-container'>
                                <img className='home-page-welcome-hub-img' src={`${product[1]?.previewImg}`}></img>
                                {/* <div className='home-page-welcome-hub-img-name'>{product[1]?.name}</div> */}
                            </div>
                        </NavLink>
                        <NavLink to={`/products/${product[2]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className='home-page-welcome-hub-item-container'>
                                <img className='home-page-welcome-hub-img' src={`${product[2]?.previewImg}`}></img>
                            </div>
                        </NavLink>
                        <NavLink to={`/products/${product[3]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className='home-page-welcome-hub-item-container'>
                                <img className='home-page-welcome-hub-img' src={`${product[3]?.previewImg}`}></img>
                            </div>
                        </NavLink>
                        <NavLink to={`/products/${product[4]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className='home-page-welcome-hub-item-container'>
                                <img className='home-page-welcome-hub-img' src={`${product[4]?.previewImg}`}></img>
                            </div>

                        </NavLink>
                        <NavLink to={`/products/${product[5]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className='home-page-welcome-hub-item-container'>
                                <img className='home-page-welcome-hub-img' src={`${product[5]?.previewImg}`}></img>
                            </div>
                        </NavLink>
                    </div>
                    <div className='welcome-back-items'>
                        <div className='welcome-back-items-groupA'>

                            <NavLink to={`/products/${product[6]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className='home-page-product-itemA'>
                                        <img className='home-page-product-itemA-img' src={`${product[6]?.previewImg}`}></img>
                                        <div className='home-page-product-itemA-price'>{`$${product[6]?.price}.00`}</div>
                                </div>
                            </NavLink>
                            <NavLink to={`/products/${product[7]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className='home-page-product-itemA'>
                                        <img className='home-page-product-itemA-img' src={`${product[7]?.previewImg}`}></img>
                                        <div className='home-page-product-itemA-price'>{`$${product[7]?.price}.00`}</div>
                                </div>
                            </NavLink>
                            <NavLink to={`/products/${product[8]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
                                <div className='home-page-product-itemA'>
                                        <img className='home-page-product-itemA-img' src={`${product[8]?.previewImg}`}></img>
                                        <div className='home-page-product-itemA-price'>{`$${product[8]?.price}.00`}</div>
                                </div>
                            </NavLink>
                            <NavLink to={`/products/${product[9]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className='home-page-product-itemA'>
                                        <img className='home-page-product-itemA-img' src={`${product[9]?.previewImg}`}></img>
                                        <div className='home-page-product-itemA-price'>{`$${product[9]?.price}.00`}</div>
                                </div>
                            </NavLink>
                            <NavLink to={`/products/${product[10]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className='home-page-product-itemA'>
                                        <img className='home-page-product-itemA-img' src={`${product[10]?.previewImg}`}></img>
                                        <div className='home-page-product-itemA-price'>{`$${product[10]?.price}.00`}</div>
                                </div>
                            </NavLink>
                        </div>
                        <div className='welcome-back-items-groupB'>
                            <NavLink to={`/products/${product[11]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className='home-page-product-itemA'>
                                        <img className='home-page-product-itemA-img' src={`${product[11]?.previewImg}`}></img>
                                        <div className='home-page-product-itemA-price'>{`$${product[11]?.price}.00`}</div>
                                </div>
                            </NavLink>
                            <NavLink to={`/products/${product[12]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className='home-page-product-itemA'>
                                        <img className='home-page-product-itemA-img' src={`${product[12]?.previewImg}`}></img>
                                        <div className='home-page-product-itemA-price'>{`$${product[12]?.price}.00`}</div>
                                </div>
                            </NavLink>
                            <NavLink to={`/products/${product[4]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className='home-page-product-itemA'>
                                        <img className='home-page-product-itemA-img' src={`${product[4]?.previewImg}`}></img>
                                        <div className='home-page-product-itemA-price'>{`$${product[4]?.price}.00`}</div>
                                </div>
                            </NavLink>
                            <NavLink to={`/products/${product[5]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className='home-page-product-itemA'>
                                        <img className='home-page-product-itemA-img' src={`${product[5]?.previewImg}`}></img>
                                        <div className='home-page-product-itemA-price'>{`$${product[5]?.price}.00`}</div>
                                </div>
                            </NavLink>
                            <NavLink to={`/products/${product[1]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className='home-page-product-itemA'>
                                        <img className='home-page-product-itemA-img' src={`${product[1]?.previewImg}`}></img>
                                        <div className='home-page-product-itemA-price'>{`$${product[1]?.price}.00`}</div>
                                </div>
                            </NavLink>
                        </div>

                    </div>
                </div>
                <div className='home-sample-products'>
                    <div className='browse-users-container'>
                        <div className='browse-user-item-container'>
                            <div className='browse-user-item-username'>
                                <div>
                                    {users[2]?.username}
                                    <i class="fa-solid fa-arrow-right"></i>
                                </div>
                                <div>
                                    {users[2]?.products.length === 1 ?`${users[2]?.products.length} items` : `${users[2]?.products.length} item` }
                                </div>
                            </div>
                            <div className='browse-user-item-imgs-container'>
                                <div className='user-item-imgs-container-top'>
                                <NavLink to={`/products/${product[users[2].products[0]].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <img className='user-item-img' src={`${product[users[2].products[0]].previewImg}`}>
                                    </img>
                                </NavLink>
                                <NavLink to={`/products/${product[users[2].products[1]].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <img className='user-item-img' src={`${product[users[2].products[1]].previewImg}`}>
                                    </img>
                                </NavLink>
                                </div>
                                <div className='user-item-imgs-container-bottom'>
                                <NavLink to={`/products/${product[users[2].products[2]].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <img className='user-item-img2' src={`${product[users[2].products[2]].previewImg}`}>
                                        </img>
                                </NavLink>
                                <NavLink to={`/products/${product[users[2].products[3]].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <img className='user-item-img2' src={`${product[users[2].products[3]].previewImg}`}>
                                    </img>
                                </NavLink>
                                </div>

                            </div>

                        </div>
                        <div className='browse-user-item-container'>
                            <div className='browse-user-item-username'>
                                <div>
                                    {users[3]?.username}
                                    <i class="fa-solid fa-arrow-right"></i>
                                </div>
                                <div>
                                    {users[3]?.products.length === 1 ?`${users[3]?.products.length} items` : `${users[3]?.products.length} item` }
                                </div>
                            </div>
                            <div className='browse-user-item-imgs-container'>
                                <div className='user-item-imgs-container-top'>
                                <NavLink to={`/products/${product[users[3].products[0]].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <img className='user-item-img' src={`${product[users[3].products[0]].previewImg}`}>
                                    </img>
                                </NavLink>
                                <NavLink to={`/products/${product[users[3].products[1]].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <img className='user-item-img' src={`${product[users[3].products[1]].previewImg}`}>
                                    </img>
                                </NavLink>
                                </div>
                                <div className='user-item-imgs-container-bottom'>
                                <NavLink to={`/products/${product[users[3].products[2]].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <img className='user-item-img2' src={`${product[users[3].products[2]].previewImg}`}>
                                        </img>

                                </NavLink>
                                <NavLink to={`/products/${product[users[3].products[3]].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <img className='user-item-img2' src={`${product[users[3].products[3]].previewImg}`}>
                                    </img>
                                </NavLink>

                                </div>

                            </div>

                        </div>
                        <div className='browse-user-item-container'>
                            <div className='browse-user-item-username'>
                                <div>
                                    {users[4]?.username}
                                    <i class="fa-solid fa-arrow-right"></i>
                                </div>
                                <div>
                                    {users[4]?.products.length === 1 ?`${users[2]?.products.length} items` : `${users[2]?.products.length} item` }
                                </div>
                            </div>
                            <div className='browse-user-item-imgs-container'>

                                <div className='user-item-imgs-container-top'>
                                    <NavLink to={`/products/${product[users[4].products[0]].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <img className='user-item-img' src={`${product[users[4].products[0]].previewImg}`}>
                                        </img>

                                    </NavLink>
                                    <NavLink to={`/products/${product[users[4].products[1]].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <img className='user-item-img' src={`${product[users[4].products[1]].previewImg}`}>
                                        </img>
                                    </NavLink>
                                </div>
                                <div className='user-item-imgs-container-bottom'>
                                    <NavLink to={`/products/${product[users[4].products[2]].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <img className='user-item-img2' src={`${product[users[4].products[2]].previewImg}`}>
                                        </img>

                                    </NavLink>
                                    <NavLink to={`/products/${product[users[4].products[3]].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <img className='user-item-img2' src={`${product[users[4].products[3]].previewImg}`}>
                                        </img>
                                    </NavLink>

                                </div>

                            </div>

                        </div>
                        <div className='browse-user-item-container'>
                            <div className='browse-user-item-username'>
                                <div>
                                    {users[5]?.username}
                                    <i class="fa-solid fa-arrow-right"></i>
                                </div>
                                <div>
                                    {users[5]?.products.length === 1 ?`${users[2]?.products.length} items` : `${users[2]?.products.length} item` }
                                </div>
                            </div>
                            <div className='browse-user-item-imgs-container'>
                                <div className='user-item-imgs-container-top'>
                                    <NavLink to={`/products/${product[users[5].products[0]].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <img className='user-item-img' src={`${product[users[5].products[0]].previewImg}`}>
                                        </img>

                                    </NavLink>
                                    <NavLink to={`/products/${product[users[5].products[1]].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <img className='user-item-img' src={`${product[users[5].products[1]].previewImg}`}>
                                        </img>
                                    </NavLink>

                                </div>
                                <div className='user-item-imgs-container-bottom'>
                                    <NavLink to={`/products/${product[users[5].products[2]].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <img className='user-item-img2' src={`${product[users[5].products[2]].previewImg}`}>
                                        </img>

                                    </NavLink>
                                    <NavLink to={`/products/${product[users[5].products[3]].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <img className='user-item-img2' src={`${product[users[5].products[3]].previewImg}`}>
                                        </img>
                                    </NavLink>
                                </div>

                            </div>

                        </div>


                    </div>
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
