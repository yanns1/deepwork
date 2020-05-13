// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDriRmwVpj9WK8b3oI1LW_Gbia1ZY79Siw",
    authDomain: "deep-work-c7fe3.firebaseapp.com",
    databaseURL: "https://deep-work-c7fe3.firebaseio.com",
    projectId: "deep-work-c7fe3",
    storageBucket: "deep-work-c7fe3.appspot.com",
    messagingSenderId: "1094518983732",
    appId: "1:1094518983732:web:2f05345fad1584d13f4e61",
    measurementId: "G-7XBQT0MWPN",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

const enablePersistenceOfDb = () => {
    db.enablePersistence()
        .catch(err => {
            if (err.code === 'failed-precondition') {
                // probably multiple tabs open at once
                console.log('persistence failed')
            } else if (err.code === 'unimplemented') {
                // lack of browser support
                console.log('persistence is not available')
            }
        })
};

export { firebase, db, auth, enablePersistenceOfDb }