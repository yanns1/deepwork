import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import { auth, db } from '../../scripts/init_firebase.js';

const Dialogs = () => {
    // Contexts
    const { userCred } = useContext(AuthContext)

    const signUp = async (e) => {
        e.preventDefault();
        const signupForm = document.querySelector('.signup-form');

        // get inputs
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-pwd'].value;

        // sign up user
        auth.createUserWithEmailAndPassword(email, password)
            .then(cred => {
                closeDialogs()
                // Initialize document in db for user
                db.collection('users').doc(cred.user.uid).set({
                    "pre-chronos": [],
                    "stats": {}
                })
            })
            .catch(err => {
                const signupErrorMessage = document.querySelector('.signup-error-message');
                signupErrorMessage.innerHTML = err.message;
                signupErrorMessage.style.display = 'block';
                console.error(`Error signing up: ${err}`)
            })
    }

    const logIn = e => {
        e.preventDefault();

        const loginForm = document.querySelector('.login-form');

        // get inputs
        const email = loginForm['login-email'].value;
        const password = loginForm['login-pwd'].value;

        // log in user
        auth.signInWithEmailAndPassword(email, password)
            .then(cred => {
                // close modal and reset form
                closeDialogs();
            })
            .catch(err => {
                const loginErrorMessage = document.querySelector('.login-error-message');
                loginErrorMessage.innerHTML = err.message;
                loginErrorMessage.style.display = 'block';
                console.error(`Error logging in: ${err}`)
            });
    }

    const closeDialogs = () => {
        // Because 2 differents dialogs, close the 2 each time instead of trying to know which one is open

        // Empty error message div
        const signupErrorMessage = document.querySelector('.signup-error-message');
        signupErrorMessage.innerHTML = '';
        // Close dialog
        const signupDialog = document.querySelector('.signup-dialog');
        signupDialog.close();
        // Reset form
        const signupForm = document.querySelector('.signup-form');
        signupForm.reset();

        // Empty error message div
        const loginErrorMessage = document.querySelector('.login-error-message');
        loginErrorMessage.innerHTML = '';
        // Close dialog
        const loginDialog = document.querySelector('.login-dialog');
        loginDialog.close();
        // Reset form
        const loginForm = document.querySelector('.login-form');
        loginForm.reset();
    }

    const closeAccountDialog = () => {
        const accountDialog = document.querySelector('.account-dialog');
        accountDialog.close();
    }

    // Upgrade DOM at each render to maintain styling of MDL elements
    useEffect(() => {
        componentHandler.upgradeDom()
    })

    return (
        <>
            {userCred
                ?
                <dialog className="account-dialog mdl-dialog">
                    <h4 className="mdl-dialog__title">Account</h4>
                    <div className="mdl-dialog__content">
                        <p><b>Email:</b> {userCred.email}</p>
                        <button
                            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                            type="button"
                            onClick={closeAccountDialog}
                        >Close</button>
                    </div>
                </dialog>
                :
                <>
                    <dialog className="signup-dialog mdl-dialog">
                        <h4 className="mdl-dialog__title">Sign up</h4>
                        <div className="mdl-dialog__content">
                            <form className="signup-form" action="#" onSubmit={signUp}>
                                <div
                                    className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
                                >
                                    <input
                                        className="mdl-textfield__input"
                                        type="email"
                                        id="signup-email"
                                    />
                                    <label className="mdl-textfield__label" htmlFor="signup-email"
                                    >Email address...</label>
                                </div>
                                <div
                                    className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
                                >
                                    <input
                                        className="mdl-textfield__input"
                                        type="password"
                                        id="signup-pwd"
                                        pattern=".{8,}"
                                    />
                                    <label className="mdl-textfield__label" htmlFor="signup-pwd"
                                    >Password...</label>
                                    <span className="mdl-textfield__error">Eight or more characters</span>
                                </div>
                                <div className="signup-error-message"></div>
                                <div className="mdl-dialog__actions">
                                    <button
                                        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                                        type="button"
                                        onClick={closeDialogs}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </dialog>

                    <dialog className="login-dialog mdl-dialog">
                        <h4 className="mdl-dialog__title">Log in</h4>
                        <div className="mdl-dialog__content">
                            <form className="login-form" action="#" onSubmit={logIn}>
                                <div
                                    className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
                                >
                                    <input
                                        className="mdl-textfield__input"
                                        type="email"
                                        id="login-email"
                                    />
                                    <label className="mdl-textfield__label" htmlFor="login-email"
                                    >Email address...</label>
                                </div>
                                <div
                                    className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
                                >
                                    <input
                                        className="mdl-textfield__input"
                                        type="password"
                                        id="login-pwd"
                                        pattern=".{8,}"
                                    />
                                    <label className="mdl-textfield__label" htmlFor="login-pwd"
                                    >Password...</label>
                                    <span className="mdl-textfield__error">Eight or more characters</span>
                                </div>
                                <div className="login-error-message"></div>
                                <div className="mdl-dialog__actions">
                                    <button
                                        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                                        type="button"
                                        onClick={closeDialogs}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                                    >
                                        Log in
                                    </button>
                                </div>
                            </form>
                        </div>
                    </dialog>
                </>
            }
        </>
    )
}

export default Dialogs;