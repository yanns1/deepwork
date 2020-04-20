import React, { useContext } from 'react';
import dialogPolyfill from 'dialog-polyfill';
import { AuthContext } from '../context/AuthContext.jsx';

function Navbar() {
    // Contexts
    const { userCred } = useContext(AuthContext)

    function showSignupDialog() {
        const signupDialog = document.querySelector('.signup-dialog');
        if (!signupDialog.showModal) {
            dialogPolyfill.registerDialog(signupDialog);
        }
        signupDialog.showModal();
    }

    function showLoginDialog() {
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
            {userCred
                ?
                <li className="nav-links logout-link" onClick={signOut}>Log out</li>
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