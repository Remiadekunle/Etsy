function OrderIndex({order}){
    return (
        <div>
            {`$${order.total}.00`}
        </div>
    )
}

export default OrderIndex
