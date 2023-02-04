import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { DeleteOrderFormModal } from "./deleteOrder"
import { EditOrderFormModal } from "./editOrderr"
import './index.css';
import { ViewReciptPageModal } from "./viewReciept";

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
    console.log('im stumped', typeof order.full_created, order.full_created)
    const createdAt = new Date(order.expires)
    const delivered = new Date(order.deliver_date)
    const cancelWindow = new Date(order.delivery_expires)
    console.log('diid it work', createdAt)
    console.log(Date.now() > createdAt)

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
                                <img className="order-index-previewImg" src={`${first.previewImg}`} onError={e => { e.currentTarget.src = "https://freight.cargo.site/w/3840/q/75/i/a17dfc0b27e50cb1c75dcd8fcd13a2d11783729f60265d9a00d184bc5a8d9296/VALORANT_1.png"}}></img>
                            </div>
                        </NavLink>
                        <div className="order-index-preview-item-details">
                            <NavLink to={`/products/${first.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                {first.name}
                            </NavLink>
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
                        {Date.now() > delivered ? 'Delivered' : 'In Progress ...'}
                    </h3>
                    <div>
                        {`${address},`}
                    </div>
                    <div>
                        {`${city},`}
                    </div>
                    <div>
                        {state}
                    </div>
                </div>
                {/* <button className="edit-orders-button">View Recipt</button> */}
                <ViewReciptPageModal order={order}/>
                <EditOrderFormModal createdAt={createdAt} order={order} />
                <DeleteOrderFormModal cancelWindow={cancelWindow} order={order}/>
            </div>
        </div>
    )
}

export default OrderIndex
