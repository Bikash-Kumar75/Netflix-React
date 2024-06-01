import React from 'react'
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// import { user } from 'react';

const Header = () => {

    const navigate = useNavigate();

    const handelSignOut = () => {
        signOut(auth).then(() => {
            navigate("/");
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            navigate("/error");
        });
    }
    return (
        <div className='w-full absolute flex justify-between bg-gradient-to-b from-black z-10'>
            <div className=' px-8 py-2'>
                <img className='w-44' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" />
            </div>
            <div className='flex px-4'>
                <img className='w-12 h-12 mt-6 rounded-lg' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Netflix-avatar.png/120px-Netflix-avatar.png?20201013161117" alt="log-out" />
                <button onClick={ handelSignOut } className='bg-red-500 h-7 w-20 mt-9 ml-2  text-white rounded-sm'>Sign Out</button>
            </div>


        </div>
    )
}

export default Header;
