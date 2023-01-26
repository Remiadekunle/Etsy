const GET_CART = 'cart/getCart'

const ADD_CART = 'carts/addCart'

export const loadCart = (cart) => {
    return{
        type:GET_CART,
        cart
    }
}

export const addCart = (cart) => {
    return {
        type:ADD_CART,
        cart
    }
}


export const fetchCart = () => async dispatch => {
    const res = await fetch('/api/cart/')

    if (res.ok){
        const body = await res.json();
        console.log('yay we got the cart back', body)
        dispatch(loadCart(body.cart))
    }
}

export const addToCart = (productId, quantity) => async dispatch => {
    const res = await fetch('/api/cart/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            product_id:productId,
            quantity:quantity
        })
    })

    if (res.ok){
        const body = await res.json();
        console.log('yay we got the cart back', body)
        dispatch(loadCart(body.cart))
    }
}

const initialState = {
    cart: {},
};

const cartReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_CART:
            newState = Object.assign({}, state);
            newState.cart = action.cart
            return newState
        default:
            return state;
    }
}

export default cartReducer
