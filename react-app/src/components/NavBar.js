
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { login } from '../store/session';
import LogoutButton from './auth/LogoutButton';
import CreateProductForm, { CreateProductModal } from './CreateProduct/Index';
import './index.css';
import OpenModalMenuItem from './OpenModalButton';

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const dispatch = useDispatch();
  const toggleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  const useDemo = async (e) => {
    e.preventDefault();
    const email = 'demo@aa.io'
    const password = 'password'
    const data = await dispatch(login(email, password));
  }

  return (
    <nav className='navbar'>
      <div className='navbar-items'>
        <h1 className='navbar-h1'>Besty</h1>
        <input className='search-input' placeholder='Search for products'></input>
        <CreateProductModal />
        <div className='navbar-right-side-container'>
          <div className='profile-dropdown-container' onClick={toggleShowMenu}>
            <i class="fa-solid fa-user"></i>
            <i class="fa-solid fa-caret-down"></i>
            {showMenu ? <ul className='profile-ul-dropdown'>
              <li>
                <NavLink to='/' exact={true} activeClassName='active'>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/login' exact={true} activeClassName='active'>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink to='/users' exact={true} activeClassName='active'>
                  Users
                </NavLink>
              </li>
              <li>
                <LogoutButton />
              </li>
              <button onClick={useDemo}>Demo User</button>
            </ul> :<></>}

          </div>
          <div className='cart-container'>
            <i class="fa-solid fa-cart-shopping fa-lg"></i>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
