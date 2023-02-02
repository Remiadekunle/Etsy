import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import './index.css';

function FavoritesPage(){
    const user = useSelector(state => state.session.user)
    const favorites = user?.favorites
    if (favorites?.length < 1){
        return(
            <div className=''>
                No Favorites
            </div>
        )
    }
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
