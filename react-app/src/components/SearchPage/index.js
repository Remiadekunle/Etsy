import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearSearch, getSearch } from "../../store/search";
import "./index.css";
import SearchIndex from "./SearchIndexItem";

function SearchPage({search, setSearch}){
    const [priceIncr, setPriceIncr] = useState(false)
    const [priceDecr, setPriceDecr] = useState(false)
    const [reviewed, setReviewed] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
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

    const handleSearch = async (e) => {
        e.preventDefault();
        if (search.length === 0) return
        console.log('this is the search', search)
        await dispatch(clearSearch())
        await dispatch(getSearch(search, priceIncr, priceDecr, reviewed))
        localStorage.setItem('search', search)
        sessionStorage.setItem('search', search)
        // setSearch('')
        return history.push('/search')
      }
    // const mappable = Object.values(messages.search)
    return (
        <div >
            <div className="search-results-welcome">
                {`Search results`}
                <i class="fa-solid fa-ellipsis"></i>
            </div>
            <div className="search-results-filter-container">
                <div>
                    <select>
                        <option>Product Name</option>
                        <option>Highest Price</option>
                        <option>Lowest Price</option>
                        <option>Highest Reviewed</option>
                    </select>
                </div>
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
