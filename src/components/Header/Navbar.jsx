import React from 'react';
import dialogPolyfill from 'dialog-polyfill';
import { useAuthContext } from '../context/AuthContext.jsx';
import { auth } from '../../scripts/init_firebase.js';

const Navbar = () => {
    // Contexts
    const userCred = useAuthContext()

    const showSignupDialog = () => {
        const signupDialog = document.querySelector('.signup-dialog');
        if (!signupDialog.showModal) {
            dialogPolyfill.registerDialog(signupDialog);
        }
        signupDialog.showModal();
    }

    const showLoginDialog = () => {
        const loginDialog = document.querySelector('.login-dialog');
        if (!loginDialog.showModal) {
            dialogPolyfill.registerDialog(loginDialog);
        }
        loginDialog.showModal();
    }

    const showAccountDialog = () => {
        const accountDialog = document.querySelector('.account-dialog');
        if (!accountDialog.showModal) {
            dialogPolyfill.registerDialog(accountDialog);
        }
        accountDialog.showModal();
    }

    const signOut = () => {
        auth.signOut();
    }

    return (
        <nav className="navbar">
            {userCred
                ?
                <>
                    <li className="nav-links logout-link" onClick={signOut}>Log out</li>
                    <i className="material-icons account-icon" onClick={showAccountDialog} title="Account infos">account_circle</i>
                </>
                :
                <>
                    <li className="nav-links signup-link" onClick={showSignupDialog}>Sign up</li>
                    <li className="nav-links login-link" onClick={showLoginDialog}>Log in</li>
                </>
            }
        </nav>
    )
}

export default Navbar;