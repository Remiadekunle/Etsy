
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { login } from '../store/session';
import LogoutButton from './auth/LogoutButton';
import CreateProductForm, { CreateProductModal } from './CreateProduct/Index';
import './index.css';
import OpenModalMenuItem from './OpenModalButton';

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const cart = useSelector(state => state.cart.cart)
  const [showMenu, setShowMenu] = useState(false)
  const dispatch = useDispatch();
  const history = useHistory();

  const toggleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  const useDemo = async (e) => {
    e.preventDefault();
    const email = 'demo@aa.io'
    const password = 'password'
    const data = await dispatch(login(email, password));
  }

  const toCart = () => {
    return history.push('/cart')
  }


  return (
    <nav className='navbar'>
      <div className='navbar-items'>
        <NavLink to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 className='navbar-h1'>Besty</h1>
        </NavLink>
        <input className='search-input' placeholder='Search for products'></input>
        <CreateProductModal />
        <div className='navbar-right-side-container'>
          <div className='profile-dropdown-container' onClick={toggleShowMenu}>
            <i class="fa-solid fa-user"></i>
            <i class="fa-solid fa-caret-down"></i>
            {showMenu ? <ul className='profile-ul-dropdown'>
              {user ? <div className='profile-dropdown-user'>
                <NavLink  to='/orders'>
                  <button className='nav-order-buttons'>
                    Your orders
                  </button>
                </NavLink>
                <NavLink to={`/users/${user.id}`} >
                  <button className='nav-order-buttons'>Profile</button>
                </NavLink>
                <LogoutButton />
              </div> : <div>
                <div>
                  <NavLink to='/login' exact={true} activeClassName='active'>
                    Login
                  </NavLink>
                </div>
                <div>
                  <NavLink to='/sign-up' exact={true} activeClassName='active'>
                    Sign Up
                  </NavLink>
                </div>
                <button onClick={useDemo}>Demo User</button>
              </div> }
            </ul> :<></>}

          </div>
          <div className='cart-container' onClick={toCart}>
            <i class="fa-solid fa-cart-shopping fa-lg"></i>
          </div>
          <div className='cart-item-amount'>{cart.items?.length}</div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
