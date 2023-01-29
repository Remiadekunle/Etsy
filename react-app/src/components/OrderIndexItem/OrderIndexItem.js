import { useSelector } from "react-redux"

function OrderIndex({order}){
    console.log('yo this is the order', order)
    const first = order.items[0]
    console.log('this is the item', first)
    // const product = useSelector(state => state.allProducts[first?.product_id])
    return (
        <div className="order-item-container">
            <div className="order-details-section">
                {`$${order.total}.00`}
                <img></img>
            </div>
            <div className="order-trackings-cancel-section">
                <div>
                    In Progress ...
                </div>
                <button>Edit Order</button>
                <button>View Recipt</button>
                <button> Cancel Order</button>
            </div>
        </div>
    )
}

export default OrderIndex
