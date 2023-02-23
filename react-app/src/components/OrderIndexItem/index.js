import { useState } from 'react';
import { useSelector } from 'react-redux';
import './index.css';
import OrderIndex from './OrderIndexItem';
import Footer2 from '../FooterItems';
function OrderPage(){
    const orders = useSelector(state => state.order.allOrders)
    const [toggle, setToggle] = useState(false)
    const [orderSearch, setOrderSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const className = toggle ? 'disabled-search-feature' : 'disabled-search-feature disabled-hidden'
    const orderList = Object.values(orders)

    const handleSearch = () => {
        const res = orderList.filter(order => {
            let hasVal = false
            const items = Object.values(order.items)
            items.forEach(item => {
                console.log(item.name)
                if (item.name?.toLowerCase().includes(orderSearch.toLowerCase())) {
                    console.log('hi')
                    hasVal =  true
                }
                else if (item.description?.toLowerCase().includes(orderSearch.toLowerCase())) hasVal = true
            })
            return hasVal
        })
        console.log('yo whats the res', res)
        setSearchResults(res)
    }

   const compare = ( a, b, param, reverse ) => {
    // console.log('in compare function', a, b)
    let aDate = new Date(a.created_at)
    let bDate = new Date(b.created_at)
        if ( aDate < bDate ){
            console.log('we got here actually')
          return 1
        }
        if ( aDate > bDate ){
          return -1
        }
        return 0;
    }
    console.log('what is the result heree,', searchResults)
    orderList.sort((a,b) => compare(a,b))
    // console.log('yo what is the orderlist for this', orderList)
    return (
        <div style={{height: '100%'}}>
            <div className='order-page-background' >
                <div className='order-page-welcome-container'>
                    <div className='order-welcome-stuff'>
                        <div className='order-welcome-stuff-header'>
                            Purchases
                        </div>
                        {/* <form >
                            <input
                            onChange={(e) => {
                                setOrderSearch(e.target.value)
                                handleSearch()
                            }}
                            className='order-search-bar' placeholder={`Search your orders` }></input>
                            <div className='order-search-results-container'>
                                {
                                    searchResults.map(order => (
                                        <div>
                                            {order.items[0]}
                                        </div>
                                    ))
                                }
                            </div>
                        </form> */}
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
            <div className='home-page-container-footer' style={{width: '100%', height:'50px'}}>
                <Footer2 />
            </div>
        </div>
    )

}

export default OrderPage
