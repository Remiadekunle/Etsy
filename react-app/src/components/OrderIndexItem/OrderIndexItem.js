import { useSelector } from "react-redux"
import { DeleteOrderFormModal } from "./deleteOrder"
import { EditOrderFormModal } from "./editOrderr"
import './index.css';

function OrderIndex({order}){
    console.log('yo this is the order', order)
    const first = order.items[0]
    console.log('this is the item', first)
    const {address, city, state} = order
    // const product = useSelector(state => state.allProducts[first?.product_id])
    return (
        <div className="order-item-container">
            <div className="order-details-section">
                {`$${order.total}.00`}
                <img></img>
            </div>
            <div className="order-trackings-cancel-section">
                <div className="shipping-stuff-track">
                    In Progress ...
                    <div>
                        {address}
                    </div>
                    <div>
                        {city}
                    </div>
                    <div>
                        {state}
                    </div>
                </div>
                <EditOrderFormModal order={order} />
                <button>View Recipt</button>
                <DeleteOrderFormModal order={order}/>
            </div>
        </div>
    )
}

export default OrderIndex
