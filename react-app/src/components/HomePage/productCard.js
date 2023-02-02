import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import FavButton from "../FavButton"
function ProductCard({product}){
    return(
        <div className="home-page-product-itemA-container">
            <NavLink to={`/products/${product?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className='home-page-product-itemA'>
                        <img className='home-page-product-itemA-img' src={`${product?.previewImg}`}></img>
                        <div className='home-page-product-itemA-price'>{`$${product?.price}.00`}</div>
                </div>
            </NavLink>
            <FavButton productId={product?.id} />
        </div>
    )
}

export function ProductCardRound({product}){
    return(
        <NavLink to={`/products/${product?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className='home-page-welcome-hub-item-container'>
                <img className='home-page-welcome-hub-img' src={`${product?.previewImg}`}></img>
                {/* <div className='home-page-welcome-hub-img-name'>{product?.name}</div> */}
            </div>
        </NavLink>
    )
}


export function BestyPickCard({product}){
    return(
        <div className="Besty-sample-gaming-row-img-container">
            <NavLink to={`/products/${product?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img className='Besty-sample-gaming-row-img' src={`${product?.previewImg}`}></img>
            </NavLink>
            <FavButton productId={product?.id} />
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

export function UserCards({name, products, items, ids}){
    const newProducts = []
    ids.forEach(id => {
        const product = products[id]
        newProducts.push(product)
    })
    return(
        <div className='browse-user-item-container'>
            <div className='browse-user-item-username'>
                <div>
                    {name}
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
                <div>
                    {`${items} items`}
                </div>
            </div>
            <div className='browse-user-item-imgs-container'>
                <div className='user-item-imgs-container-top'>
                <NavLink to={`/products/${newProducts[0]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img className='user-item-img' src={`${newProducts[0]?.previewImg}`}>
                    </img>
                </NavLink>
                <NavLink to={`/products/${newProducts[1]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img className='user-item-img' src={`${newProducts[1]?.previewImg}`}>
                    </img>
                </NavLink>
                </div>
                <div className='user-item-imgs-container-bottom'>
                <NavLink to={`/products/${newProducts[2]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img className='user-item-img2' src={`${newProducts[2]?.previewImg}`}>
                        </img>
                </NavLink>
                <NavLink to={`/products/${newProducts[3]?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img className='user-item-img2' src={`${newProducts[3]?.previewImg}`}>
                    </img>
                </NavLink>
                </div>

            </div>

        </div>
    )
}

export default ProductCard
