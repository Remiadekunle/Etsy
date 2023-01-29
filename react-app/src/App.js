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

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      dispatch(fetchProducts())
      dispatch(fetchCart())
      dispatch(fetchOrders())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
