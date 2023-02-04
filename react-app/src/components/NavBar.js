
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { fetchCart } from '../store/cart';
import { fetchCategory } from '../store/category';
import { fetchOrders } from '../store/order';
import { clearSearch, getSearch } from '../store/search';
import { login } from '../store/session';
import { LoginFormModal } from './auth/LoginForm';
import LogoutButton from './auth/LogoutButton';
import { SignUpFormModal } from './auth/SignUpForm';
import CreateProductForm, { CreateProductModal } from './CreateProduct/Index';
import './index.css';
import OpenModalMenuItem from './OpenModalButton';

const NavBar = ({setSearch, search, setFilter}) => {
  const user = useSelector(state => state.session.user)
  const cart = useSelector(state => state.cart.cart)
  const [showMenu, setShowMenu] = useState(false)

  const dispatch = useDispatch();
  const history = useHistory();
  const ulRef = useRef();

  const openMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    return () => {
      // console.log('this is b4 dismount')
      localStorage.setItem('search', search)
    }
  }, [])

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search.length === 0) return
    // console.log('this is the search', search)
    await dispatch(clearSearch())
    await dispatch(getSearch(search))
    localStorage.setItem('search', search)
    sessionStorage.setItem('search', search)
    // setSearch('')
    setFilter(0)
    return history.push('/search')
  }

  const handleCategory = async (id) => {
    await dispatch(fetchCategory(id))
    return history.push('/category')
}


  const useDemo = async (e) => {
    e.preventDefault();
    const email = 'demo@aa.io'
    const password = 'password'
    const data = await dispatch(login(email, password));
    await dispatch(fetchCart())
    await dispatch(fetchOrders())
  }

  const toCart = () => {
    return history.push('/cart')
  }

  console.log('searchinggggggggggggggg', search)
  return (
    <nav className='navbar'>
      <div style={{width: '100%'}}>

        <div className='navbar-items'>
          <NavLink to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 className='navbar-h1'>Besty</h1>
          </NavLink>
          <form onSubmit={handleSearch} className='search-form'>
            <input className='search-input'
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='Search for products'></input>
            <button className='nav-search-submit-button' type='submit'><i class="fa-solid fa-magnifying-glass fa-xl"></i></button>
          </form>
          <CreateProductModal />
          <div className='navbar-right-side-container'>
            <div className='profile-dropdown-container' onClick={openMenu} ref={ulRef}>
              <i class="fa-solid fa-user"></i>
              <i class="fa-solid fa-caret-down"></i>
              {showMenu ? <ul className='profile-ul-dropdown'>
                {user ? <div className='profile-dropdown-user'>

                  <NavLink to={`/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className='profile-dropdown-view-profile'>
                      <div>
                        <i class="fa-solid fa-user"></i>
                      </div>
                      <div>
                        <div>
                          {user.username}
                        </div>
                        <div>
                          View your profile
                        </div>
                      </div>
                    </div>
                  </NavLink>
                  <NavLink  to='/orders' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <button className='nav-order-buttons'>
                      <i class="fa-solid fa-table-list fa-xl"></i>
                      Your orders
                    </button>
                  </NavLink>
                  <NavLink  to='/favorites' style={{ textDecoration: 'none', color: 'inherit' }}>
                    <button className='nav-order-buttons'>
                      <i class="fa-regular fa-heart fa-xl"></i>
                      Your favorites
                    </button>
                  </NavLink>
                  <LogoutButton />
                </div> : <div>
                  <div>
                    <NavLink className='nav-auth-buttons' to='/login' style={{ textDecoration: 'none', color: 'inherit' }} exact={true} activeClassName='active'>
                      Login
                    </NavLink>
                  </div>
                  {/* <LoginFormModal /> */}
                  <div>
                    <NavLink className='nav-auth-buttons' to='/sign-up' style={{ textDecoration: 'none', color: 'inherit' }} exact={true}>
                      Sign Up
                    </NavLink>
                  </div>
                  {/* <SignUpFormModal /> */}
                  <button className='nav-order-buttons' onClick={useDemo}>Demo User</button>
                </div> }
              </ul> :<></>}

            </div>
            <div className='cart-container' onClick={toCart}>
              <i class="fa-solid fa-cart-shopping fa-lg"></i>
            </div>
            {cart.items?.length > 0? <div className='cart-item-amount' onClick={toCart}>{cart.items?.length}</div> : <></>}

          </div>
        </div>
      </div>
      <div className='navbar-categories-container'>
        <button onClick={() => handleCategory(1)} className='navbar-categories-button'>valorant</button>
        <button onClick={() => handleCategory(2)}className='navbar-categories-button'>Call of Duty</button>
        <button onClick={() => handleCategory(3)}className='navbar-categories-button'>Pokemon</button>
      </div>
    </nav>
  );
}

export default NavBar;
