import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom"
import { addToCart } from "../../store/cart";
import { getSearch } from "../../store/search";
import { scrollUp } from "../CategoryPage";
import FavButton from "../FavButton";

function SearchIndex(item, search){
    console.log('were getting the item', item)
    const [quantity, setQuantity] = useState(1)
    const history = useHistory();
    const dispatch = useDispatch();
    const product = item.product

    // useEffect(() => {
    //     return(() => dispatch(getSearch(search)))
    // },[])
    const findStars = (avg) => {
        console.log('testing the type', typeof avg)
        if (avg === 0) return 'No Reviews'
        if (avg >  0 && avg <= 1) return <i class="fa-solid fa-star fa-xs"></i>
        else if (avg >=  1 && avg < 2) {
            return (
            <div>
                <i class="fa-solid fa-star fa-xs"></i>
            </div>
        )}
        else if (avg >=  2 && avg < 3) {
            return (
            <div>
                <i class="fa-solid fa-star fa-xs"></i>
                <i class="fa-solid fa-star fa-xs"></i>
            </div>
        )}
        else if (avg >=  3 && avg < 4) {
            return (
            <div>
                <i class="fa-solid fa-star fa-xs"></i>
                <i class="fa-solid fa-star fa-xs"></i>
                <i class="fa-solid fa-star fa-xs"></i>
            </div>
        )}
        else if (avg >=  4 && avg < 5) {
            return (
            <div>
                <i class="fa-solid fa-star fa-xs"></i>
                <i class="fa-solid fa-star fa-xs"></i>
                <i class="fa-solid fa-star fa-xs"></i>
                <i class="fa-solid fa-star fa-xs"></i>
            </div>

        )}
        else{
            return(
                <div>
                    <i class="fa-solid fa-star fa-xs"></i>
                    <i class="fa-solid fa-star fa-xs"></i>
                    <i class="fa-solid fa-star fa-xs"></i>
                    <i class="fa-solid fa-star fa-xs"></i>
                    <i class="fa-solid fa-star fa-xs"></i>
                </div>
            )
        }

    }

    const addCart = async (e) => {
        e.preventDefault();


        await dispatch(addToCart(product.id, quantity, defaultOption))
        setQuantity(0)
        return history.push('/cart')
    }
    console.log('yo what are the products options', product.options)
    const defaultOption = product.options.split('-')[0]
    return(
        <div className="search-index-container">
            <NavLink to={`/products/${product?.id}`} style={{ textDecoration: 'none', color: 'inherit' }} onClick={scrollUp}>
                <img className="search-item-img" src={`${product.previewImg}`}
                onError={e => { e.currentTarget.src = "https://freight.cargo.site/w/3840/q/75/i/a17dfc0b27e50cb1c75dcd8fcd13a2d11783729f60265d9a00d184bc5a8d9296/VALORANT_1.png"}}
                ></img>
                <div className="search-product-details">
                    <div>
                        {product.name}
                    </div>
                    <div className="searc-product-ratings">
                        {findStars(product.avg)}
                        {product.reviews.length ? `(${product.reviews.length})` : ''}
                    </div>
                    <div>
                        {`$${product.price}.00`}
                    </div>
                </div>
            </NavLink>
            <button onClick={addCart} className="search-add-to-cart"><i class="fa-solid fa-plus"></i> Add to cart</button>
            <FavButton productId={product?.id} />
        </div>
    )
}

export default SearchIndex
