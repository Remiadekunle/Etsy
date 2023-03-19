import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Modal } from "../../context/Modal";
import { updateInfo } from "../../store/session";
import './index.css';

function EditProfileForm({setShowModal, user}){
    const dispatch = useDispatch()
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [profileImg, setProfileImg] = useState(user.profileImg === null?  '': user.profileImg )
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        let newErrors = [];

        setErrors(newErrors);
    }, [username, ]);

    if (!user){
        return (
            <div className="login-check-container">
                Please login to continue
            </div>
        )
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([])
        let profile_img = profileImg === '' ? 'https://cdn.dribbble.com/users/6142/screenshots/5679189/media/1b96ad1f07feee81fa83c877a1e350ce.png?compress=1&resize=400x300&vertical=top' : profileImg
        const body = await dispatch(updateInfo(email, password, username, user.id, profile_img))
        if (body){
            return setErrors(body)
        }
        setShowModal(false)
    }


    return(
        <>
            <form className="create-product-form" onSubmit={handleSubmit}>
                <ul className="create-product-error-container">
                    {errors.map((error, idx) => (
                    <li className="product-modal-errors" key={idx}>
                        {error}
                    </li>
                    ))}
                </ul>
                <label className='create-product-label'>
                    Username
                    <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='create-product-input'/>
                </label>
                <label className='create-product-label'>
                    Email
                    <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='create-product-input'
                    />
                </label>
                <label className='create-product-label'>
                    Password
                    <input
                    type="text"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='create-product-input'/>
                </label>
                <button className='creater-product-button' type='submit'>Update</button>
            </form>
        </>
    )
}

export function EditProfileFormModal({user, type}){
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button style={{color: '#858585'}} className='edit-profile-button' onClick={() => setShowModal(true)}>Edit profile</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditProfileForm setShowModal={setShowModal} user={user}/>
        </Modal>
      )}
    </>
  );
}
export function EditProfileFormModal2({user, type}){
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit-profile-img-button' onClick={() => setShowModal(true)}><i class="fa-solid fa-camera"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditProfileForm setShowModal={setShowModal} user={user}/>
        </Modal>
      )}
    </>
  );
}


export default EditProfileForm
