import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { Modal } from "../../context/Modal";
import './index.css';
import { fetchCart } from '../../store/cart';
import { fetchOrders } from '../../store/order';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  console.log('in modal already heheh')

  const onLogin = async (e) => {
    e.preventDefault();
    console.log('in the dispatch function')
    const data = await dispatch(login(email, password));
    dispatch(fetchCart())
    dispatch(fetchOrders())
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form-container'>
      <form onSubmit={onLogin} className='login-form'>
        <div className='login-form-heading'>
          <div>
            Login
          </div>
          <NavLink className='login-to-singup-button' to='/sign-up'>
            <button className='login-register-button'>Register</button>
          </NavLink>
        </div>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='login-form-containers'>
          <label htmlFor='email'>Email address</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className='login-form-containers'>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button className='login-submit' type='submit'>Login</button>
      </form>
    </div>
  );
};

export function LoginFormModal({order}){
  const [showModal, setShowModal] = useState(false);

return (
  <>
    <button type='button' className="edit-order-button" onClick={() => setShowModal(true)}>Login</button>
    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <LoginForm setShowModal={setShowModal} order={order}/>
      </Modal>
    )}
  </>
);
}

export default LoginForm;
