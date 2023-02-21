import { NavLink } from "react-router-dom"

function SearchResultIndex({product}){
    

    return(
        <NavLink to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="search-results-index-item" style={{paddingLeft: '20px', height: '30px'}}>
                {product.name}
            </div>
        </NavLink>
    )
}

export default SearchResultIndex
