import { NavLink } from 'react-router-dom';
import FavButton, { FavButton2 } from '../FavButton';

function FavIndexItem({fav}){
    return(
        <div className='favs-page-index-item'>
            <NavLink className={'favs-page-index-navlink'} to={`/products/${fav.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img className='favs-page-index-item-img' src={fav.previewImg}></img>
                <div className='favs-page-index-item-name'>
                    {fav.name}
                </div>
                <div>
                    {fav.owner}
                </div>
                <div>
                    {`$${fav.price}.00`}
                </div>
            </NavLink>
            <FavButton2 productId={fav.id} />
        </div>
    )
}

export default FavIndexItem
