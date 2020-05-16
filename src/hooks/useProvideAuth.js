import { useState, useEffect } from 'react'
import { auth, db } from '../scripts/init_firebase.js'

const useProvideAuth = () => {
    const [user, setUser] = useState(null)

    // catch possible errors in components
    const signin = (email, password) => {
        return auth
            .signInWithEmailAndPassword(email, password)
            .then(res => {
                setUser(res.user);
                return res.user;
            });
    };

    // catch possible errors in components
    const signup = (email, password) => {
        return auth
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
                // Initialize document in db for user
                db.collection('users').doc(res.user.uid).set({
                    "pre-chronos": [],
                    "stats": {},
                    "isDarkTheme": true
                })
                return res.user
            })
            .then(user => {
                setUser(user);
                return user;
            })
    };

    const signout = () => {
        return auth
            .signOut()
            .then(() => {
                setUser(false);
            });
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return {
        user,
        signin,
        signup,
        signout
    };
}

export default useProvideAuth