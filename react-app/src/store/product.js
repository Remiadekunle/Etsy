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

export const fetchOneProducts = (id) => async dispatch => {
    const res = await fetch(`/api/products/${id}`)
    if (res.ok){
        const body = await res.json();
        console.log('heyyyyyyyyyyyyyyy', body)
        await dispatch(addProduct(body.product))
    }
}



export const createProduct = (payload, formData) => async dispatch => {
    const res = await fetch(`/api/products/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: payload.name,
            description:payload.description,
            price:payload.price,
            stock:payload.stock,
            options:payload.options,
        })
    } )
    if (res.ok){
        const body = await res.json()
        console.log('we got the body back', body)
        const prod = body.product
        console.log('what is going on here', formData.entries(), payload.previewImg)

        return prod
    } else{
        const body = await res.json()
        return body.errors
    }
}

export const addImage = (formData, id) => async dispatch => {
    const res = await fetch(`/api/products/${id}/images`, {
        method: "POST",
        body: formData
    })

    if (res.ok){
        const body = await res.json()
        dispatch(addProduct(body.product))
        return
    } else{
        const body = await res.json()
        return body.errors
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
    }else{
        const body = await res.json()
        return body.errors
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

export const updateReview = (productId, content, stars,  img, reviewId) => async dispatch =>{
    const res = await fetch(`/api/products/${productId}/reviews/${reviewId}`, {
        method: "PUT",
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

export const removeReview = (productId, reviewId) => async dispatch =>{
    const res = await fetch(`/api/products/${productId}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })
    if (res.ok){
        const body = await res.json();

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
            newState.array = products
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
