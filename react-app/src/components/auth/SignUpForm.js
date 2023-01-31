import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { Modal } from "../../context/Modal";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [url, setUrl] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, url));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };
  const updateUrl = (e) => {
    setUrl(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form-container'>
      <form onSubmit={onSignUp} className='login-form'>
        <div className='login-form-heading'>
          Signup
        </div>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='login-form-containers'>
          <label>Username<i class="fa-solid fa-asterisk fa-2xs"></i></label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className='login-form-containers'>
          <label>Email<i class="fa-solid fa-asterisk fa-2xs"></i></label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className='login-form-containers'>
          <label>Password<i class="fa-solid fa-asterisk fa-2xs"></i></label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className='login-form-containers'>
          <label>Repeat Password <i class="fa-solid fa-asterisk fa-2xs"></i></label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className='login-form-containers'>
          <label>Profile Img</label>
          <input
            type='url'
            name='url'
            onChange={updateUrl}
            value={url}
          ></input>
        </div>
        <button className='login-submit' type='submit'>Sign Up</button>
      </form>
    </div>
  );
};
export function SignUpFormModal({order}){
  const [showModal, setShowModal] = useState(false);

return (
  <>
    <button className="edit-order-button" onClick={() => setShowModal(true)}>Signup</button>
    {showModal && (
      <Modal onClose={() => setShowModal(false)}>
        <SignUpForm setShowModal={setShowModal} order={order}/>
      </Modal>
    )}
  </>
);
}


export default SignUpForm;
