import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import StyledNavbar from '../styled/header/StyledNavbar.js'
import NavLink from '../styled/header/NavLink.js'
import AccountIcon from '../styled/header/AccountIcon.js'

const Navbar = () => {
    const { user, signout } = useAuth();

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

    return (
        <StyledNavbar>
            {user
                ?
                <>
                    <NavLink onClick={signout}>Log out</NavLink>
                    <AccountIcon className="material-icons" onClick={showAccountDialog} title="Account infos">account_circle</AccountIcon>
                </>
                :
                <>
                    <NavLink onClick={showSignupDialog}>Sign up</NavLink>
                    <NavLink onClick={showLoginDialog}>Log in</NavLink>
                </>
            }
        </StyledNavbar>
    )
}

export default Navbar;