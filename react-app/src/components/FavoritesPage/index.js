import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import { Footer2 } from '../FooterItems';
import FavIndexItem from './FavIndexItem';
import './index.css';
import { EditProfileFormModal, EditProfileFormModal2 } from './UpdateProfile';

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
            <div className='user-profile-container'>
                <div style={{borderRadius: '50%', position: 'relative'}}>
                    <img className='profile-imgs' src={user.profileImg ? user.profileImg  : ''}
                    onError={e => { e.currentTarget.src = "https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top"}} 
                    ></img>
                    <EditProfileFormModal2 user={user} />
                </div>
                <div style={{marginLeft: '20px'}}>
                    <h2>
                        {user.username}
                    </h2>
                    <EditProfileFormModal user={user} />
                </div>

            </div>
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
