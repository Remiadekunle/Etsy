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
    const object = item.item
    return(
        <div className="order-item-border">
            <div className="order-item-name-quantity">
                {`${object.name} x ${object.quantity}`}
            </div>
            <div>
                {`$${object.price}.00`}
            </div>
        </div>
    )
}

export default ViewReciptPage
