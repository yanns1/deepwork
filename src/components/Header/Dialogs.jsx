import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext.jsx'
import { auth, db } from '../../scripts/init_firebase.js';
import ErrorMess from '../styled/header/ErrorMess.js'

const Dialogs = () => {
    const [signupErrMess, setSignupErrMess] = useState('')
    const [loginErrMess, setLoginErrMess] = useState('')
    const userCred = useAuthContext()

    const signUp = async e => {
        e.preventDefault();
        const signupForm = e.target;
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
                setSignupErrMess(err.message)
                console.error(`Error signing up: ${err}`)
            })
    }

    const logIn = e => {
        e.preventDefault();

        const loginForm = e.target;
        const email = loginForm['login-email'].value;
        const password = loginForm['login-pwd'].value;

        // log in user
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                // close modal and reset form
                closeDialogs();
            })
            .catch(err => {
                setLoginErrMess(err.message)
                console.error(`Error logging in: ${err}`)
            });
    }

    const closeDialogs = () => {
        // Because 2 differents dialogs, close the 2 each time instead of trying to know which one is open

        // Empty error message div
        setSignupErrMess('')
        // Close dialog
        const signupDialog = document.querySelector('.signup-dialog');
        signupDialog.close();
        // Reset form
        const signupForm = document.querySelector('.signup-form');
        signupForm.reset();

        // Empty error message div
        setLoginErrMess('')
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
                            <form className="signup-form" onSubmit={signUp}>
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
                                <ErrorMess>{signupErrMess}</ErrorMess>
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
                            <form className="login-form" onSubmit={logIn}>
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
                                <ErrorMess>{loginErrMess}</ErrorMess>
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