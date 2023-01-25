
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import CreateProductForm from './CreateProduct/Index';
import './index.css';
import OpenModalMenuItem from './OpenModalButton';
const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false)

  const toggleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <nav className='navbar'>
      <div className='navbar-items'>
        <h1 className='navbar-h1'>Besty</h1>
        <input className='search-input' placeholder='Search for products'></input>
        <button className='create-product-button'>
          <OpenModalMenuItem
          itemText='Create a product listing'
          modalComponent={CreateProductForm}
           />
        </button>
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
