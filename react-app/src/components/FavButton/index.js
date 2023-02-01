import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../store/session';
import './index.css';

function FavButton({productId}){
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const favs = user.favIds
    console.log('hey were actually getting the user favs', favs)
    console.log('hey were actually getting the user favs', productId)
    const check = favs.indexOf(parseInt(productId))
    console.log('what is the result of the check', check)
    const handleFavs = (id) => {
        console.log(id)
        if (check === -1){
            dispatch(addFavorite(id))
        } else{
            dispatch(removeFavorite(id))
        }
    }

    return(
        <button className='fav-button' onClick={() => handleFavs(productId)}>
            {check === -1 ? <i class="fa-regular fa-heart"></i> : <i class="fa-solid fa-heart"></i>}
        </button>
    )
}

export default FavButton
