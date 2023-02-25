import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { addUserImage } from "../../store/session";

function EditProfileImageForm({setShowModal, user}){
    const dispatch = useDispatch()
    const history = useHistory()
    const [currImage, setCurrImage] = useState(user.profileImg)
    const [profileImg, setProfileImg] = useState(null)
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        let newErrors = [];

        setErrors(newErrors);
    }, []);

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
        if (profileImg === null) {
            setErrors(['Please select an image.'])
            return
        }
        const formData = new FormData();
        formData.append("image", profileImg);
        console.log('yuuuuuuuuuuuuuuuuuuuuuuuuuu', user)
        const body = await dispatch(addUserImage(user.id, formData))
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
                    Profile Img
                    <input
                    type="text"
                    value={currImage}
                    placeholder='No image'
                    className='create-product-input'/>
                </label>
                <label className='create-product-label'>
                    Change Image?
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const url = e.target?.files[0]
                        setProfileImg(url)
                    }}
                    className='create-product-input'/>
                </label>
                <button className='creater-product-button' type='submit'>Update</button>
            </form>
        </>
    )
}


export function EditProfileImageFormModal({user, type}){
    const [showModal, setShowModal] = useState(false);
    console.log('bruh')
  return (
    <>
      <button className='edit-profile-img-button' onClick={() => setShowModal(true)}><i class="fa-solid fa-camera"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditProfileImageForm setShowModal={setShowModal} user={user}/>
        </Modal>
      )}
    </>
  );
}

export default EditProfileImageForm
