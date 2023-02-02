import { useSelector } from 'react-redux';
import './index.css';
import OrderIndex from './OrderIndexItem';

function OrderPage(){
    const orders = useSelector(state => state.order.allOrders)
    const orderList = Object.values(orders)
    console.log('yo what is the orderlist for this', orderList)
    return (
        <div className='order-page-background' >
            <div className='order-page-welcome-container'>
                <div className='order-welcome-stuff'>
                    <div>
                        Purchases
                    </div>
                    <form>
                        <input className='order-search-bar' placeholder={`Search your orders` }></input>
                    </form>
                </div>


            </div>
            {
                orderList.length > 0 ?  <div className='order-page-container'>
                {
                    orderList?.map(order => (
                        <OrderIndex order={order}/>
                    ))
                }
            </div> : <div className='no-orders-default-page'> No Orders</div>
            }

        </div>
    )

}

export default OrderPage
