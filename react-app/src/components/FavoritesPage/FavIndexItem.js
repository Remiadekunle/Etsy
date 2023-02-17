import { NavLink } from 'react-router-dom';
import FavButton, { FavButton2 } from '../FavButton';

function FavIndexItem({fav}){
    return(
        <div className='favs-page-index-item'>
            <NavLink className={'favs-page-index-navlink'} to={`/products/${fav.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img className='favs-page-index-item-img' src={fav.previewImg} onError={e => { e.currentTarget.src = "https://freight.cargo.site/w/3840/q/75/i/a17dfc0b27e50cb1c75dcd8fcd13a2d11783729f60265d9a00d184bc5a8d9296/VALORANT_1.png"}}></img>
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
