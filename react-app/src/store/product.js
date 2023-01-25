const GET_ALL_PRODUCTS = 'products/getProducts'

const LOAD_PRODUCTS = 'products/loadProducts'

const ADD_PRODUCT = 'products/addProduct'

const EDIT_PRODUCT = 'products/editProduct'

const DELETE_PRODUCT = 'products/deleteProduct'

export const loadProducts = (products) => {
    return {
        type: LOAD_PRODUCTS,
        products
    }
}


export const addProduct = (product) => {
    return {
        type: ADD_PRODUCT,
        product
    }
}

export const editProduct = (product) => {
    return {
        type: EDIT_PRODUCT,
        product
    }
}
export const deleteProduct = (id) => {
    return {
        type: DELETE_PRODUCT,
        id
    }
}



export const fetchProducts = () => async dispatch => {
    const res = await fetch(`/api/products/`)
    if (res.ok){
        const body = await res.json();
        console.log('heyyyyyyyyyyyyyyy', body)
        await dispatch(loadProducts(body.products))
    }
}


const initialState = {
    allProducts: {},
    singleProduct:{}
};

const productReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case LOAD_PRODUCTS:
            newState = Object.assign({}, state);
            newState.allProducts = {...state.allProducts}
            const products = action.products
            products.forEach(product => {
                newState.allProducts[product.id] = product
            })
            return newState
        default:
            return state;
    }
}

export default productReducer
