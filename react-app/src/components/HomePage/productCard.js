import { useState } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import FavButton, { FavButton2 } from "../FavButton"
function ProductCard({product, extra}){
    const [hover, setHover] = useState(false)

    const toggleHover = () => {
        setHover(!hover)
    }
    const nextClass = extra? extra : ''
    const className = `home-page-product-itemA-container ${nextClass}`
    // console.log('what is the className', className)
    return(
        <div className={className} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            <NavLink to={`/products/${product?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className='home-page-product-itemA'>
                        <img className='home-page-product-itemA-img' src={`${product?.previewImg}`}></img>
                        <div className='home-page-product-itemA-price'>{`$${product?.price}.00`}</div>
                </div>
            </NavLink>
            <FavButton2 productId={product?.id} />
        </div>
    )

}


export function ProductCardRound({product, extra}){
    return(
        <NavLink to={`/products/${product?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className='home-page-welcome-hub-item-container'>
                <img className='home-page-welcome-hub-img' src={`${product?.previewImg}`}></img>
                {/* <div className='home-page-welcome-hub-img-name'>{product?.name}</div> */}
            </div>
        </NavLink>
    )
}


export function BestyPickCard({product, extra}){
    const [hover, setHover] = useState(false)

    const toggleHover = () => {
        setHover(!hover)
    }
    const nextClass = extra? extra : ''
    const className = `Besty-sample-gaming-row-img-container ${nextClass}`
    return(
        <div className={className} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
            <NavLink to={`/products/${product?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img className='Besty-sample-gaming-row-img' src={`${product?.previewImg}`}></img>
                <div className='home-page-product-itemA-price'>{`$${product?.price}.00`}</div>
            </NavLink>
            <FavButton2 productId={product?.id} />
        </div>
    )
}

export function BestyPickCardBig({product}){
    return(
        <div className="home-page-product-itemA-container">
            <NavLink to={`/products/${product?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img></img>
            </NavLink>
            <FavButton productId={product?.id} />
        </div>
    )
}

export function UserCards({name, products, items, ids, extra}){
    const [hover, setHover] = useState(false)

    const toggleHover = () => {
        setHover(!hover)
    }
    const newProducts = []
    ids.forEach(id => {
        const product = products[id]
        newProducts.push(product)
    })
    const nextClass = extra? extra : ''
    const className = `browse-user-item-container ${nextClass}`
    return(
        <div className={className}>
            <div className='browse-user-item-username'>
                <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
                    {name}
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
                <div>
                    {`${items} items`}
                </div>
            </div>
            <div className='browse-user-item-imgs-container'>
                <div className='user-item-imgs-container-top'>
                    <div className="user-card-prouct-container" style={{position: 'relative'}}>
                        <NavLink className='user-card-a-tag' to={`/products/${newProducts[0]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <img className='user-item-img' src={`${newProducts[0]?.previewImg}`}>
                            </img>
                            <div className='home-page-product-itemA-price'>{`$${newProducts[0]?.price}.00`}</div>
                        </NavLink>
                        <FavButton2 productId={newProducts[0]?.id} />
                    </div>
                    <div className="user-card-prouct-container" style={{position: 'relative'}}>
                        <NavLink className='user-card-a-tag' to={`/products/${newProducts[1]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <img className='user-item-img' src={`${newProducts[1]?.previewImg}`}>
                            </img>
                            <div className='home-page-product-itemA-price'>{`$${newProducts[1]?.price}.00`}</div>
                        </NavLink>
                        <FavButton2 productId={newProducts[1]?.id} />
                    </div>
                </div>
                <div className='user-item-imgs-container-bottom'>
                    <div className="user-card-prouct-container" style={{position: 'relative'}}>
                        <NavLink className='user-card-a-tag' to={`/products/${newProducts[2]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <img className='user-item-img2' src={`${newProducts[2]?.previewImg}`}>
                                </img>
                                <div className='home-page-product-itemA-price'>{`$${newProducts[2]?.price}.00`}</div>
                        </NavLink>
                        <FavButton2 productId={newProducts[2]?.id} />
                    </div>
                    <div className="user-card-prouct-container" style={{position: 'relative'}}>
                        <NavLink className='user-card-a-tag' to={`/products/${newProducts[3]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <img className='user-item-img3' src={`${newProducts[3]?.previewImg}`}>
                            </img>
                            <div className='home-page-product-itemA-price'>{`$${newProducts[3]?.price}.00`}</div>
                        </NavLink>
                        <FavButton2 productId={newProducts[3]?.id} />
                    </div>
                </div>

            </div>

        </div>
    )
}


export default ProductCard
