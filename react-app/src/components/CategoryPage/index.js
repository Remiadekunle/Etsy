import { useSelector } from "react-redux"

function CategoryPage(){
    const products = useSelector(state => state.category.category)
    if (!Object?.values(products)) return null

    const productsArr = Object?.values(products)
    return(
        <div>
            {
                productsArr && productsArr.map(product => (
                    <div>{product.name}</div>
                ))
            }
        </div>
    )
}
export default CategoryPage
