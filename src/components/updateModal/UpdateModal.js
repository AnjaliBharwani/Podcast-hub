import React, { useEffect, useState } from 'react'
import './style.css'
// import Button from '../button/Button'
// import Input from '../input/Input'
import { RiImageEditFill } from "react-icons/ri";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { setUser } from '../../slices/userSlice';
import Button from '../Common2/Button';
import InputComponent from '../Common2/Input';

function UpdateModal({ setShowModal, user }) {
    const dispatch = useDispatch();
    const [name, setName] = useState(user?.name);
    const [profileImage, setProfileImage] = useState('');
    const [previewImage, setPreviewImage] = useState(user.image)

    useEffect(() => {
        if(profileImage){
            const path = URL.createObjectURL(profileImage);
            setPreviewImage(path);
        }
    }, [profileImage])

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setProfileImage(e.target.files[0]);
        }
    };

    const handleUpdate = async () => {
        if(name){
            try{
                if(profileImage){
                    const docRef = doc(db, 'users', user.uid);
        
                    const ProfileImageRef = ref(storage, `users/${user.uid}/${Date.now()}`);
                    await uploadBytes(ProfileImageRef, profileImage);
                    const profileImageUrl = await getDownloadURL(ProfileImageRef);
            
                    const newData = {
                        ...user,
                        name: name,
                        image: profileImageUrl
                    };
                    
            
                    await updateDoc(docRef, newData);
                    dispatch(setUser(newData))  
                }
                else{
                    const docRef = doc(db, 'users', user.uid);
        
                    const newData = {
                        ...user,
                        name: name,
                        // image: profileImageUrl
                    };
            
                    await updateDoc(docRef, newData);
                    dispatch(setUser(newData))  
                }
                              
        
                toast.success('Profile Updated Successfully!');
                
                setShowModal(false);        
            }
            catch(error){
                toast.error(error.message);
            }
        }
        else{
            toast.error('Fill All The Details');
        }
    }

    return (
        <div className='update-modal'>
            <div className="modal-container">
                <h2>Edit Profile</h2>
                <label htmlFor='profile-pic' className='profile-pic'>
                    <img src={previewImage} alt="" />
                    <RiImageEditFill />
                    <input 
                        type="file"
                        name="profile-pic"
                        id="profile-pic"
                        // value={profileImage}
                        onChange={handleFileChange}
                        style={{display: 'none'}}
                        accept={'image/*'}
                    />
                </label>
                <InputComponent
                    type="text"
                    placeholder="Fullname"
                    state={name}
                    setState={setName}
                />
                <Button
                    onClick={handleUpdate}
                    text={ "Update" }
                />
                <Button
                    onClick={() => setShowModal(false)}
                    text={ "Discard" }
                />
            </div>
        </div>
    )
}

export default UpdateModal