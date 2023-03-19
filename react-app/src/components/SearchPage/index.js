import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearSearch, getSearch } from "../../store/search";
import { Footer2 } from "../FooterItems";
import "./index.css";
import SearchIndex from "./SearchIndexItem";

function SearchPage({search, setSearch, filter, setFilter}){
    const [priceIncr, setPriceIncr] = useState(false)
    const products = useSelector(state => state.search)
    const results2 =  useSelector(state => state.search.array)
    const [priceDecr, setPriceDecr] = useState(false)
    const [reviewed, setReviewed] = useState(false)
    // const [filter, setFilter] = useState(0)
    // const [results, setResults] = useState(Object?.values(products.search))
    const [filterValue, setFilterValue] = useState('None')
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        return () => setFilter(0)
    }, [])

    if (Object.values(products).length < 1 || Object?.values(products.search).length < 1){
        return (
            <div className="search-no-results">
                No Results
            </div>
        )
    }
    const results = Object?.values(products.search)


    const handleSearch = async (e, priceIncr, priceDecr, reviewed, label, idx) => {
        e.preventDefault();
        if (search.length === 0) return
        // await dispatch(clearSearch())
        const body = await dispatch(getSearch(search, priceIncr, priceDecr, reviewed))
        localStorage.setItem('search', search)
        sessionStorage.setItem('search', search)
        setFilter(idx)
        // setSearch('')
        // return history.push('/search')
      }
    // const mappable = Object.values(messages.search)
    return (
        <div >
            <div style={{marginBottom: '50px'}} >
                <div className="search-results-welcome">
                    {`Search results`}
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
                <div className="search-results-filter-container">
                    <div style={{width:'100%', display: 'flex', justifyContent: "flex-end", marginTop: '10px'}}>
                        <select
                        className="search-select-field"
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value)
                            const idx = e.target.value
                            if (parseInt(e.target.value) === 1) handleSearch(e, true, false, false, e.target.childNodes[e.target.value].label, idx)
                            else if (parseInt(e.target.value) === 2) handleSearch(e, false, true, false, e.target.childNodes[e.target.value].label, idx)
                            else if (parseInt(e.target.value) === 3) handleSearch(e, false, false, true, e.target.childNodes[e.target.value].label, idx)
                        }}
                        >   <option label="None" value={0}>None</option>
                            <option label="HighestPrice" value={1}>Highest Price</option>
                            <option label="Lowest Price" value={2}>Lowest Price</option>
                            <option label="Highest Reviewed" value={3}>Highest Reviewed</option>
                        </select>
                    </div>
                </div>
                <div className="search-results-container">
                    {results2 && results2.map(item => (
                        <SearchIndex product={item}/>
                    ))}
                </div>
            </div>
            <Footer2 />
        </div>
    )
}

export default SearchPage
