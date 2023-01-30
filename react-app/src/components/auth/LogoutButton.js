import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const onLogout = async (e) => {
    await dispatch(logout());
    return history.push('/')
  };

  return <button className='nav-loggout-button' onClick={onLogout}><i class="fa-solid fa-arrow-right-from-bracket fa-xl"></i>Logout</button>;
};

export default LogoutButton;
