import React, { useState, useRef } from 'react'
import { getEl } from '../../../scripts/utils.js';
import { useAuth } from '../../context/AuthContext.jsx'
import { useDialog } from '../../context/DialogContext.jsx'
import useClickOutside from '../../../hooks/useClickOutside.js';
import ErrorMess from '../../styled/header/ErrorMess.js'

const SignupDialog = () => {
    const [signupErrMess, setSignupErrMess] = useState('')
    const { user, signup } = useAuth();
    const { signupDialog: { close } } = useDialog()

    const dialogRef = useRef()
    const closeDialog = () => {
        close()
        getEl('.signup-form').reset()
        setSignupErrMess('')
    }
    useClickOutside(dialogRef, closeDialog)

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

    if (user) return null
    return (
        // Use an inner div in dialog because the dialog has a background
        // that takes the whole screen, so putting the ref on it
        // wouldn't work.
        // Override default padding of dialog and put the same on the inner div.
        <dialog className="signup-dialog mdl-dialog" style={{ "padding": "0" }}>
            <div ref={dialogRef} style={{ "padding": "1em" }}>
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
                            >
                                Sign up
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default SignupDialog;