import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import { Footer2 } from '../FooterItems';
import FavIndexItem from './FavIndexItem';
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
        <div>
            <div className='favorites-page-container'>
                <div className='favorites-welcome-section'>
                    <div className='favorites-welcome-header'>
                        Favorite items <span className='favorites-welcome-header-span'>{`${favorites?.length} items`}</span>
                    </div>
                    <div className='favorites-welcome-header-icon'>
                        <i class="fa-solid fa-earth-africa"></i>
                        Public
                    </div>
                    <form className='favorites-search-form'>
                        <input
                        className='favorites-search-form-input'
                        placeholder='Search your favorites'></input>
                    </form>
                </div>
                <div className='favorites-index-container'>
                    {favorites && favorites.map(fav => (
                        <FavIndexItem fav={fav} />
                    ))}
                </div>
            </div>
            <div className='home-page-container-footer' style={{width: '100%', height:'50px'}}>
                <Footer2 />
            </div>
        </div>
    )
}



export default FavoritesPage
