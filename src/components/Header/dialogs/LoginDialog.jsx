import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import ErrorMess from '../../styled/header/ErrorMess.js'

const LoginDialog = () => {
    const [loginErrMess, setLoginErrMess] = useState('')
    const { user, signin } = useAuth();

    const handleLogin = e => {
        e.preventDefault();
        const loginForm = e.target;
        const email = loginForm['login-email'].value;
        const password = loginForm['login-pwd'].value;

        signin(email, password)
            .catch(err => {
                setLoginErrMess(err.message)
                console.error(`Error logging in: ${err}`)
            });
    }

    const closeDialog = () => {
        // Empty error message div
        setLoginErrMess('')
        // Close dialog
        const loginDialog = document.querySelector('.login-dialog');
        loginDialog.close();
        // Reset form
        const loginForm = document.querySelector('.login-form');
        loginForm.reset();
    }

    if (user) return null
    return (
        <dialog className="login-dialog mdl-dialog">
            <h4 className="mdl-dialog__title">Log in</h4>
            <div className="mdl-dialog__content">
                <form className="login-form" onSubmit={handleLogin}>
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
                            onClick={closeDialog}
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
    )
}

export default LoginDialog;