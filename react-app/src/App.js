import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate, fetchExamples } from './store/session';
import HomePage from './components/HomePage';
import ProductIndex from './components/ProductIndexItem';
import { fetchProducts } from './store/product';
import { fetchCart } from './store/cart';
import CartPage from './components/CartIndexItem';
import { fetchOrders } from './store/order';
import OrderPage from './components/OrderIndexItem';
import Footer from './components/FooterItems';
import Welcome from './components/auth/WelcomePage';
import SearchPage from './components/SearchPage';
import { getSearch } from './store/search';
import FavoritesPage from './components/FavoritesPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  // const [search, setSearch] = useState(localStorage.getItem('search')? localStorage.getItem('search') : '')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState(0)
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(fetchProducts())
      dispatch(fetchCart())
      dispatch(fetchOrders())
      // const prevSearch = localStorage.getItem('search')
      const prevSearch = sessionStorage.getItem('search')
      console.log('are we getting the search at all', sessionStorage.getItem('search'))
      if (prevSearch) {
        dispatch(getSearch(prevSearch))
        setSearch(prevSearch)
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar search={search} setSearch={setSearch} setFilter={setFilter}/>
      <Switch>
        <Route path='/login' exact={true}>
          <Welcome />
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <Welcome />
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/cart' exact={true}>
          <CartPage />
        </ProtectedRoute>
        <Route path='/products/:productId'>
          <ProductIndex />
        </Route>
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
        <ProtectedRoute path='/orders' exact={true} >
          <OrderPage />
        </ProtectedRoute>
        <Route path='/search' exact={true}>
          <SearchPage setSearch={setSearch}  search={search} filter={filter} setFilter={setFilter} />
        </Route>
        <ProtectedRoute path='/favorites' exact={true}>
          <FavoritesPage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
