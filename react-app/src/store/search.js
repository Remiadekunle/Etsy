export const LOAD_SEARCH = 'search/loadSearch'

export const ADD_SEARCH = 'search/addSearch'

export const LOAD_DMSEARCH = 'search/loadDmSearch'

const CLEAR_SEARCH = 'search/clearSearch'

export const loadSearch = (search) => {
    return {
        type: LOAD_SEARCH,
        search
    }
}

export const clearSearch = () => {
    return {
        type: CLEAR_SEARCH
    }
}


export const getSearch = (search, priceInc, priceDecr, reviews) => async dispatch => {
    const res = await fetch(`/api/products/search`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            search,
            price_incr: priceInc,
            price_decr:priceDecr,
            highest_review:reviews
        })
    })

    if (res.ok){
        const body = await res.json()
        dispatch(loadSearch(body.products))
        return body
    }
}


const initialState = {};

const searchReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SEARCH:
            newState = Object.assign({}, state);
            newState.search = {...state.search}
            const search = action.search
            newState.array = search
            search.forEach((item) => {
                newState.search[item.id] = item
            })

            return newState;
        case ADD_SEARCH:
            newState = Object.assign({}, state)
            newState.search = {...action.search}
            return newState
        case CLEAR_SEARCH:
            newState = Object.assign({}, state)
            newState.search = {}
            return newState
      default:
        return state;
    }
  };

  export default searchReducer;
