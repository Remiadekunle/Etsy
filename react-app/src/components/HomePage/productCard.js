import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

function ProductCard({product}){
    return(
        <NavLink to={`/products/${product?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className='home-page-product-itemA'>
                    <img className='home-page-product-itemA-img' src={`${product?.previewImg}`}></img>
                    <div className='home-page-product-itemA-price'>{`$${product?.price}.00`}</div>
            </div>
        </NavLink>
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

// export function UserCards({user}){
//     const userProducts = user.products
//     const products = []

//     console.log('these are the user products', userProducts)
//     // const product = useSelector(state => )
//     return(
//         <div className='browse-user-item-container'>
//             {/* <div className='browse-user-item-username'>
//                 <div>
//                     {user?.username}
//                     <i class="fa-solid fa-arrow-right"></i>
//                 </div>
//                 <div>
//                     {user?.products.length === 1 ?`${user?.products.length} items` : `${user?.products.length} item` }
//                 </div>
//             </div>
//             <div className='browse-user-item-imgs-container'>
//                 <div className='user-item-imgs-container-top'>
//                 <NavLink to={`/products/${product[user.products[0]].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                     <img className='user-item-img' src={`${product[user.products[0]].previewImg}`}>
//                     </img>
//                 </NavLink>
//                 <NavLink to={`/products/${product[user.products[1]].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                     <img className='user-item-img' src={`${product[user.products[1]].previewImg}`}>
//                     </img>
//                 </NavLink>
//                 </div>
//                 <div className='user-item-imgs-container-bottom'>
//                 <NavLink to={`/products/${product[user.products].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                     <img className='user-item-img2' src={`${product[user.product].previewImg}`}>
//                         </img>
//                 </NavLink>
//                 <NavLink to={`/products/${product[user.products[3]].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                     <img className='user-item-img2' src={`${product[user.products[3]].previewImg}`}>
//                     </img>
//                 </NavLink>
//                 </div>

//             </div> */}

//         </div>
//     )
// }

export default ProductCard
