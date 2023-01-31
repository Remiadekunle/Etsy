import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { DeleteOrderFormModal } from "./deleteOrder"
import { EditOrderFormModal } from "./editOrderr"
import './index.css';

function OrderIndex({order}){
    console.log('yo this is the order', order)
    const first = order.preview_item
    // const product = useSelector(state => state.allProducts[first.id])
    console.log('this is the item', first)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", 'June', "July", 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const handleFormat = (time) =>{
        const sections = time.split('-')
        console.log('just testing', parseInt(sections[1]), sections )
        const month = months[parseInt(sections[1]) - 1]
        const str = `${month} ${sections[2]}, ${sections[0]}`
        return str
    }
    const {address, city, state} = order
    const id = first.product_id
    console.log('im stumped', first)
    return (
        <div className="order-item-container">
            <div className="order-details-section">
                <div className="order-details-shop-holder">
                    <div className="order-details-shop-holder-values">
                        <div>
                            {`Purchased on ${handleFormat(order.created_at)}`}
                        </div>
                        <div>
                            {`$${order.total}.00`}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="order-index-preview">
                        <NavLink to={`/products/${first.id}`}>
                            <div className="order-index-previewImg-container">
                                <img className="order-index-previewImg" src={`${first.previewImg}`}></img>
                            </div>
                        </NavLink>
                        <div className="order-index-preview-item-details">
                            {first.name}
                            <div>
                                <NavLink to={`/products/${first.id}`}>
                                    <button className="order-index-preview-item-details-button"> Buy this again</button>
                                </NavLink>
                                {`$${first.price}.00`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-trackings-cancel-section">
                <div className="shipping-stuff-track">
                    <h3 className="order-shipping-status">
                        In Progress ...
                    </h3>
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
                <button className="edit-orders-button">View Recipt</button>
                <EditOrderFormModal order={order} />
                <DeleteOrderFormModal order={order}/>
            </div>
        </div>
    )
}

export default OrderIndex
