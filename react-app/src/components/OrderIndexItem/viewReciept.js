import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { Modal } from "../../context/Modal";
import { addToCart, deleteFromCart, editToCartRemove, fetchCart } from "../../store/cart";
import { createOrder, updateOrder } from "../../store/order";
import { createProduct, editProduct, removeProduct, updateProduct } from "../../store/product";
import './index.css';

function ViewReciptPage({setShowModal, order}){
    const dispatch = useDispatch()
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [errors, setErrors] = useState([]);
    const history = useHistory()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = []
        if (address.length < 2) return
        if (city.length < 2) return
        if (state.length < 2) return
        // dispatch(createOrder(address, city, state))
        // dispatch(deleteFromCart(product.id));
        // setErrors([]);

        // await dispatch(fetchCart())
        setShowModal(false)
        return history.push('/orders')
    }

    console.log('hey were checking the order items', order.items)
    const items = order.items
    return(
        <div className="view-receipt-page-container">
            <div className="view-receipt-container">
                {`Order #${order.id}`}
            </div>
            {items.map(item => (
                <OrderItemIndex item={item} />
            ))}
            <div className="order-receipt-page-total">
                {`$${order.total}.00`}
            </div>
        </div>
    )
}

export function ViewReciptPageModal({order, createdAt}){
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="edit-orders-button" onClick={() => setShowModal(true)}>View Receipt</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ViewReciptPage setShowModal={setShowModal} order={order}/>
        </Modal>
      )}
    </>
  );
}

function OrderItemIndex(item){
    console.log('this is the  item', item)
    const object = item.item
    return(
        <div className="order-item-border">
            <div>
                {object.name}
            </div>
            <div>
                {`$${object.price}.00`}
            </div>
        </div>
    )
}

export default ViewReciptPage
