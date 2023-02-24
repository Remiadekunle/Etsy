const GET_ORDERS = 'orders/getOrders'

const ADD_ORDER = 'orders/addOrder'
const EDIT_ORDER = 'orders/editOrder'
const DELETE_ORRDER = 'orders/deleteOrder'

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
export const editOrder = (order) => {
    return {
        type:EDIT_ORDER,
        order
    }
}

export const deleteOrder = (id) => {
    return {
        type:DELETE_ORRDER,
        id
    }
}


export const fetchOrders = () => async dispatch => {
    const res = await fetch('/api/orders/')

    if (res.ok){
        const body = await res.json();
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
        dispatch(addOrder(body.order))
        return {}
    } else{
        const body = await res.json();
        return body.errors
    }
}

export const updateOrder = (address, city, state, id) => async dispatch => {
    const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            city: city,
            state: state,
            address:address
        })
    })

    if (res.ok){
        const body = await res.json();
        dispatch(editOrder(body.order))
    }
}

export const removeOrder = (id) => async dispatch => {
    const res = await fetch(`/api/orders/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    })

    if (res.ok){
        dispatch(deleteOrder(id))
    }
}


const initialState = {
    allOrders: {},
};

const orderReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_ORDERS:
            newState = Object.assign({}, state);
            newState.allOrders = {}
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
        case EDIT_ORDER:
            newState = Object.assign({}, state);
            newState.allOrders = {...state.allOrders}
            const order2 = action.order
            newState.allOrders[order2.id] = order2
            return newState
        case DELETE_ORRDER:
            newState = Object.assign({}, state);
            newState.allOrders = {...state.allOrders}
            delete newState.allOrders[action.id]
            return newState
        default:
            return state;
    }
}

export default orderReducer
