import { useSelector } from 'react-redux';
import './index.css';

function FavoritesPage(){
    const user = useSelector(state => state.session.user)
    const favorites = user.favorites
    return(
        <div className='favorites-page-container'>
            {favorites && favorites.map(fav => (
                <div>
                    {fav.name}
                </div>
            ))}
        </div>
    )
}

export default FavoritesPage
