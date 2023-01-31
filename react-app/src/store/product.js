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

export const createProduct = (payload) => async dispatch => {
    const res = await fetch(`/api/products/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: payload.name,
            description:payload.description,
            price:payload.price,
            stock:payload.stock,
            options:payload.options,
            preview_img: payload.previewImg
        })
    } )
    if (res.ok){
        const body = await res.json()
        console.log('we got the body back', body)
        dispatch(addProduct(body.product))
        return body
    } else{
        const body = await res.json()
        console.log('yooooooo this is the bad res', body)
    }
}

export const updateProduct = (payload, id) => async dispatch => {
    const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: payload.name,
            description:payload.description,
            price:payload.price,
            stock:payload.stock,
            options:payload.options,
            preview_img: payload.previewImg
        })
    } )
    if (res.ok){
        const body = await res.json()
        console.log('we got the body back', body)
        dispatch(editProduct(body.product))
        return body
    }
}

export const removeProduct = (id) => async dispatch => {
    const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    } )
    if (res.ok){
        const body = await res.json()
        console.log('we got the body back', body)
        dispatch(deleteProduct(id))
        return body
    }
}

export const addReview = (productId, content, stars,  img) => async dispatch =>{
    const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content,
            stars,
            img
        })
    })
    if (res.ok){
        const body = await res.json();
        console.log('yay we got the cart back', body)
        dispatch(editProduct(body.product))
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
        case ADD_PRODUCT:
            newState = Object.assign({}, state);
            newState.allProducts = {...state.allProducts}
            const product = action.product
            newState.allProducts[product.id] = product
            return newState
        case EDIT_PRODUCT:
            newState = Object.assign({}, state);
            newState.allProducts = {...state.allProducts}
            const newProduct = action.product
            newState.allProducts[newProduct.id] = newProduct
            return newState
        case DELETE_PRODUCT:
            newState = Object.assign({}, state);
            newState.allProducts = {...state.allProducts}
            const id = action.id
            delete newState.allProducts[id]
            return newState
        default:
            return state;
    }
}

export default productReducer
