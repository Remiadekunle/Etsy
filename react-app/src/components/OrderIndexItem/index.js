import { useSelector } from 'react-redux';
import './index.css';
import OrderIndex from './OrderIndexItem';

function OrderPage(){
    const orders = useSelector(state => state.order.allOrders)
    const orderList = Object.values(orders)
    console.log('yo what is the orderlist for this', orderList)
    return (
        <div className='order-page-container'>
            {
                orderList?.map(order => (
                    <OrderIndex order={order}/>
                ))
            }
        </div>
    )

}

export default OrderPage
