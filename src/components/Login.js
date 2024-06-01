import React, { useRef, useState } from 'react'
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { addUser } from '../utils/userSlice';

const Login = () => {
    // sign-in/up toggle hook
    const [isSignInForm, setSignInForm] = useState(true);

    // validate the form hook
    const [errorMessage, setErrorMessage] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch

    // validate the form data
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        const message = checkValidData(email.current.value, password.current.value);

        setErrorMessage(message);

        // Authentication function

        if (message) return;
        // signIn/Up logic

        if (!isSignInForm) {
            // sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
        else {
            // sign-in logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    updateProfile(user, {
                        // displayName: name.current.value
                    }).then(() => {
                        // Profile updated!
                        // const { uid, email, displayName, photoURL } = auth.currentUser;
                        // dispatch(addUser({
                        //     uid: uid,
                        //     email: email,
                        //     displayName: displayName,
                        //     photoURL: photoURL,
                        // }));
                        navigate("/browse");
                    }).catch((error) => {
                        // An error occurred
                        setErrorMessage(error.message)
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
    }

    // sign-in/up toggle function
    const toggleSignInForm = () => {
        setSignInForm(!isSignInForm)
    }

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src="https://user-images.githubusercontent.com/33485020/108069438-5ee79d80-7089-11eb-8264-08fdda7e0d11.jpg" alt="background-img" />
            </div>

            <form onSubmit={ (e) => e.preventDefault() } className='bg-black absolute w-3/12 my-36 mx-auto right-0 left-0 text-white p-12 rounded-md bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4'>{ isSignInForm ? "Sign In" : "Sign Up" }</h1>
                { !isSignInForm && <input type="text" placeholder='Full Name' className='p-3 my-2 w-full bg-gray-700 bg-opacity-60 rounded-sm' /> }
                <input ref={ email } type="text" placeholder='Email Address' className='p-3 my-2 w-full bg-gray-700 bg-opacity-60 rounded-sm' />
                <input ref={ password } type="password" placeholder='Password' className='p-3 my-2 w-full bg-gray-700 bg-opacity-60 rounded-sm' />
                <p className='text-red-600'>{ errorMessage }</p>
                <button className='p-2 my-4 bg-red-800 w-full rounded-lg' onClick={ handleButtonClick }>{ isSignInForm ? "Sign In" : "Sign Up" }</button>

                <p className='py-4 cursor-pointer text-gray-300' onClick={ toggleSignInForm }>{ isSignInForm ? "New to Netflix? Sign Up Now" : "Already Registered?  Sign In" }</p>
                <p className='py-4 text-sm text-gray-400'>This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className='text-blue-400 cursor-pointer'>Learn more.</span></p>
            </form>
        </div>
    )
}

export default Login;
