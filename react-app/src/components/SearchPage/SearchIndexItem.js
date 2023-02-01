import { NavLink } from "react-router-dom"

function SearchIndex(item){
    console.log('were getting the item', item)
    const product = item.product
    return(
        <div>
            <NavLink to={`/products/${product?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img className="search-item-img" src={`${product.previewImg}`}></img>
                <div>
                    {product.name}
                </div>
            </NavLink>
        </div>
    )
}

export default SearchIndex
