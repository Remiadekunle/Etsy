const GET_ORDERS = 'cart/getOrders'

const ADD_ORDER = 'carts/addOrder'

export const loadorders = (orders) => {
    return{
        type:GET_ORDERS,
        orders
    }
}

export const addOrder = (order) => {
    return {
        type:ADD_ORDER,
        order
    }
}


export const fetchOrders = () => async dispatch => {
    const res = await fetch('/api/orders/')

    if (res.ok){
        const body = await res.json();
        console.log('yay we got the order back', body)
        dispatch(loadorders(body.orders))
    }
}

export const createOrder = (address, city, state) => async dispatch => {
    const res = await fetch('/api/orders/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            city: city,
            state: state,
            address:address
        })
    })

    if (res.ok){
        const body = await res.json();
        console.log('yay we got the order back', body)
        dispatch(addOrder(body.order))
    }
}

// export const addToCart = (productId, quantity, optionValue) => async dispatch => {
//     const res = await fetch('/api/cart/', {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             product_id:productId,
//             quantity:quantity,
//             option:optionValue
//         })
//     })

//     if (res.ok){
//         const body = await res.json();
//         console.log('yay we got the cart back', body)
//         dispatch(loadCart(body.cart))
//     }
// }



const initialState = {
    allOrders: {},
};

const orderReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_ORDERS:
            newState = Object.assign({}, state);
            newState.allOrders = {...state.allOrders}
            const orders = action.orders
            orders.forEach(order => {
                newState.allOrders[order.id] = order
            })
            return newState
        case ADD_ORDER:
            newState = Object.assign({}, state);
            newState.allOrders = {...state.allOrders}
            const order = action.order
            newState.allOrders[order.id] = order
            return newState
        default:
            return state;
    }
}

export default orderReducer
