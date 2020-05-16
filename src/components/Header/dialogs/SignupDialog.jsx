import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import ErrorMess from '../../styled/header/ErrorMess.js'

const SignupDialog = () => {
    const [signupErrMess, setSignupErrMess] = useState('')
    const { user, signup } = useAuth();

    const handleSignup = async e => {
        e.preventDefault();
        const signupForm = e.target;
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-pwd'].value;

        signup(email, password)
            .catch(err => {
                setSignupErrMess(err.message)
                console.error(`Error signing up: ${err}`)
            })
    }

    const closeDialog = () => {
        setSignupErrMess('')
        // Close dialog
        const signupDialog = document.querySelector('.signup-dialog');
        signupDialog.close();
        // Reset form
        const signupForm = document.querySelector('.signup-form');
        signupForm.reset();
    }

    if (user) return null
    return (
        <dialog className="signup-dialog mdl-dialog">
            <h4 className="mdl-dialog__title">Sign up</h4>
            <div className="mdl-dialog__content">
                <form className="signup-form" onSubmit={handleSignup}>
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
                            onClick={closeDialog}
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
    )
}

export default SignupDialog;