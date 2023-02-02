import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./index.css";
import SearchIndex from "./SearchIndexItem";

function SearchPage({search, setSearch}){
    useEffect(() => {
        return () => setSearch('')
    }, [])

    const products = useSelector(state => state.search)
    console.log('yo did we get the search?',products)
    if (Object.values(products).length < 1 || Object?.values(products.search).length < 1){
        return (
            <div className="search-no-results">
                No Results
            </div>
        )
    }
    const results = Object.values(products.search)
    console.log('we arent getting this far')
    // const mappable = Object.values(messages.search)
    return (
        <div >
            <div className="search-results-welcome">
                {`Search results`}
                <i class="fa-solid fa-ellipsis"></i>
            </div>
            <div className="search-results-container">
                {results && results.map(item => (
                    <SearchIndex product={item}/>
                ))}
            </div>
        </div>
    )
}

export default SearchPage
