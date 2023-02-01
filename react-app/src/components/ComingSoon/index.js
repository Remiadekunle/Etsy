import './index.css';
import { Modal } from "../../context/Modal";
import { useState } from 'react';


function ComingSoon({feature, setShowModal}){

    return(
        <div className="comming-soon">
            {`${feature} Coming Soon`}
        </div>
    )
}

export function ComingSoonBuyItNowModal({feature}){
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="product-detail-cart-button" onClick={() => setShowModal(true)}>Buy it now</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ComingSoon setShowModal={setShowModal} feature={feature}/>
        </Modal>
      )}
    </>
  );
}
export function ComingSoonBuyMessageOwnerModal({name}){
    const [showModal, setShowModal] = useState(false);
    const feature = 'Messages to this shop are'
  return (
    <>
      <button className="meet-seller-button" onClick={() => setShowModal(true)}>Message   {name}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ComingSoon setShowModal={setShowModal} feature={feature}/>
        </Modal>
      )}
    </>
  );
}



export default ComingSoon
