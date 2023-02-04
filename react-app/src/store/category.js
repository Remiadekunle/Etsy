const LOAD_CATEGORY = 'category/loadCategory'
const LOAD_RECS = 'category/loadRecs'

export const loadCategory = (category) => {
    return{
        type:LOAD_CATEGORY,
        category
    }
}

export const loadRecs = (recs) => {
    return{
        type:LOAD_RECS,
        recs
    }
}


export const fetchCategory = (id) => async dispatch => {
    const res = await fetch(`/api/categories/${id}`)

    if (res.ok){
        const body = await res.json();
        dispatch(loadCategory(body.category))
    }
}
export const fetchCategoryRecs = (id) => async dispatch => {
    const res = await fetch(`/api/categories/${id}/recs`)
    // console.log('the fetch happened', res.status)
    if (res.ok){
        const body = await res.json();
        console.log('UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU', body.products)
        dispatch(loadRecs(body.products))
    }
}


const initialState = {};

const categoryReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_CATEGORY:
            newState = Object.assign({}, state);
            newState.category = {}
            const category = action.category
            category.forEach((product) => {
                newState.category[product.id] = product
            })

            return newState;
        case LOAD_RECS:
            newState = Object.assign({}, state);
            // newState.category = {...newState.category}
            newState.recs = {}
            const products = action.recs
            products.forEach(product => {
                newState.recs[product.id] = product
            })
            return newState
      default:
        return state;
    }
  };

  export default categoryReducer;
