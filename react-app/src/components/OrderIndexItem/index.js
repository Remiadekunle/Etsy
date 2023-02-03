import { useState } from 'react';
import { useSelector } from 'react-redux';
import './index.css';
import OrderIndex from './OrderIndexItem';
import Footer2 from '../FooterItems';
function OrderPage(){
    const orders = useSelector(state => state.order.allOrders)
    const [toggle, setToggle] = useState(false)
    const switchToggle = () => {
        setToggle(!toggle)
    }
    const className = toggle ? 'disabled-search-feature' : 'disabled-search-feature disabled-hidden'
    const orderList = Object.values(orders)
    console.log('yo what is the orderlist for this', orderList)
    return (
        <div>
            <div className='order-page-background' >
                <div className='order-page-welcome-container'>
                    <div className='order-welcome-stuff'>
                        <div className='order-welcome-stuff-header'>
                            Purchases
                        </div>
                        <form onMouseEnter={switchToggle} onMouseLeave={switchToggle}>
                            <input disabled={true} className='order-search-bar' placeholder={`Search your orders` }></input>
                            <div className={className}>
                                Coming soon
                            </div>
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
            <div className='home-page-container-footer' style={{width: '100%', height:'50px',}}>
                <Footer2 />
            </div>
        </div>
    )

}

export default OrderPage
