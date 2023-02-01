import { useSelector } from "react-redux";
import "./index.css";
import SearchIndex from "./SearchIndexItem";

function SearchPage(){

    const products = useSelector(state => state.search)
    console.log('yo did we get the search?',products)
    if (Object.values(products).length < 1){
        return null
    }
    const results = Object.values(products.search)
    console.log('we arent getting this far')
    // const mappable = Object.values(messages.search)
    return (
        <div className="search-results-container">
            {results && results.map(item => (
                <SearchIndex product={item}/>
            ))}
        </div>
    )
}

export default SearchPage
