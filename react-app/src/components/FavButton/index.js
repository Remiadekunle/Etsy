import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Modal2 } from '../../context/Modal';
import { addFavorite, removeFavorite } from '../../store/session';
import './index.css';

function FavButton({productId}){
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const favs = user?.favIds
    // console.log('hey were actually getting the user favs', favs)
    // console.log('hey were actually getting the user favs', productId)
    const check = favs?.indexOf(parseInt(productId))
    // console.log('what is the result of the check', check)
    const message = check === -1 ? 'Removed from your favorites' : 'Added to your favorites'
    const handleFavs = (e, id) => {
        e.preventDefault();
        // console.log(id)
        if (check === -1){
            dispatch(addFavorite(id))
        } else{
            dispatch(removeFavorite(id))
        }
    }

    return(
        <>
            {user && (
                <div>
                    <FavsMessageModal productId={productId} check={check} message={message}/>
                </div>
            )}
        </>
    )
}
export function FavButton2({productId}){
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const favs = user?.favIds
    // console.log('hey were actually getting the user favs', favs)
    // console.log('hey were actually getting the user favs', productId)
    const check = favs?.indexOf(parseInt(productId))
    // console.log('what is the result of the check', check)
    const message = check === -1 ? 'Removed from your favorites' : 'Added to your favorites'
    const handleFavs = (e, id) => {
        e.preventDefault();
        // console.log(id)
        if (check === -1){
            dispatch(addFavorite(id))
        } else{
            dispatch(removeFavorite(id))
        }
    }

    return(
        <>
            {user && (
                <div className='fav-2-div-container'>
                    <FavsMessageModal2 productId={productId} check={check} message={message}/>
                </div>
            )}
        </>
    )
}

function FavoritesDivToggle({type, message}){

    return(
        <div className='fav-success-popup'>
            {message === 'Added to your favorites'? <div className='favs-check-border'>
                <i class="fa-solid fa-check"></i>
            </div> : <></>}
            <div>
                {message}
            </div>
        </div>
    )
}

export function FavsMessageModal({productId, check, message}){
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    // console.log('yo whats the id here', productId)

    let timeOutId;
    useEffect(() => {
        return () => clearInterval(timeOutId)
    }, [])
    const handleFavs = async (id) => {
        // console.log(id)
        if (check === -1){
            await dispatch(addFavorite(id))
        } else{
            await dispatch(removeFavorite(id))
        }
        clearTimeout(timeOutId)
        timeOutId = setTimeout(() => {
            setShowModal(false)
        }, 2000)
    }

  return (
    <>
      <button className='fav-button' onClick={async () => {
        // setTimeout(() => {
        //     timeOutId = setShowModal(true)
        // }, 100)
        await handleFavs(productId)
        setShowModal(true)
        }}>
                        {check === -1 ? <i class="fa-regular fa-heart fa-xl"></i> : <i class="fa-solid fa-heart fa-xl fav-liked"></i>}
                    </button>
      {showModal && (
        <Modal2 onClose={() => setShowModal(false)}>
            <FavoritesDivToggle message={message} check={check}/>
        </Modal2>
      )}
    </>
  );
}
export function FavsMessageModal2({productId, check, message}){
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    // console.log('yo whats the id here', productId)

    let timeOutId;
    useEffect(() => {
        return () => clearInterval(timeOutId)
    }, [])
    const handleFavs = async (id) => {
        // console.log(id)
        if (check === -1){
            await dispatch(addFavorite(id))
        } else{
            await dispatch(removeFavorite(id))
        }
        clearTimeout(timeOutId)
        timeOutId = setTimeout(() => {
            setShowModal(false)
        }, 2000)
    }

  return (
    <>
      <button className='fav-button2' onClick={async () => {
        // setTimeout(() => {
        //     timeOutId = setShowModal(true)
        // }, 100)
        await handleFavs(productId)
        setShowModal(true)
        }}>
                        {check === -1 ? <i class="fa-regular fa-heart fa-xl"></i> : <i class="fa-solid fa-heart fa-xl fav-liked"></i>}
                    </button>
      {showModal && (
        <Modal2 onClose={() => setShowModal(false)}>
            <FavoritesDivToggle message={message} check={check}/>
        </Modal2>
      )}
    </>
  );
}



export default FavButton
