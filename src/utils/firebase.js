// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDkrEQpl7gl8ZoPypJbKxDse2Ul1zMrEPo",
    authDomain: "netflixreact-c954d.firebaseapp.com",
    projectId: "netflixreact-c954d",
    storageBucket: "netflixreact-c954d.appspot.com",
    messagingSenderId: "829889729544",
    appId: "1:829889729544:web:447e8f735a1e5187f56dbd",
    measurementId: "G-C5RX8X1BH6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();