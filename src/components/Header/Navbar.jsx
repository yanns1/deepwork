import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import dialogPolyfill from 'dialog-polyfill';
import { AuthContext } from '../context/AuthContext.jsx';

function Navbar() {
    const { userCred } = useContext(AuthContext);

    useEffect(() => {
        // Problème: If user already signed in on first load, we see non-signed-in links during a short period of time.
        if (userCred) {
            const logoutLink = document.querySelector('.logout-link');
            logoutLink.style.display = 'block';
            const signupLink = document.querySelector('.signup-link');
            signupLink.style.display = 'none';
            const loginLink = document.querySelector('.login-link');
            loginLink.style.display = 'none';
        } else {
            const logoutLink = document.querySelector('.logout-link');
            logoutLink.style.display = 'none';
            const signupLink = document.querySelector('.signup-link');
            signupLink.style.display = 'block';
            const loginLink = document.querySelector('.login-link');
            loginLink.style.display = 'block';
        }
    }, [userCred])


    function showSignupDialog(e) {
        const signupDialog = document.querySelector('.signup-dialog');
        if (!signupDialog.showModal) {
            dialogPolyfill.registerDialog(signupDialog);
        }
        signupDialog.showModal();
    }

    function showLoginDialog(e) {
        const loginDialog = document.querySelector('.login-dialog');
        if (!loginDialog.showModal) {
            dialogPolyfill.registerDialog(loginDialog);
        }
        loginDialog.showModal();
    }

    function signOut() {
        auth.signOut();
    }

    return (
        <nav className="navbar">
            <li className="nav-links signup-link" onClick={showSignupDialog}>Sign up</li>
            <li className="nav-links login-link" onClick={showLoginDialog}>Log in</li>
            <li className="nav-links logout-link" onClick={signOut}>Log out</li>
        </nav>
    )
}

export default Navbar;