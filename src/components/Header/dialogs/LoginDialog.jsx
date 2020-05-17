import React, { useState, useRef } from 'react'
import { getEl } from '../../../scripts/utils.js';
import { useAuth } from '../../context/AuthContext.jsx'
import { useDialog } from '../../context/DialogContext.jsx'
import useClickOutside from '../../../hooks/useClickOutside.js';
import useKeyPress from '../../../hooks/useKeyPress.js';
import ErrorMess from '../../styled/header/ErrorMess.js'

const LoginDialog = () => {
    const [loginErrMess, setLoginErrMess] = useState('')
    const { user, signin } = useAuth();
    const { loginDialog: { close } } = useDialog()

    const isEscapePressed = useKeyPress('Escape')
    if (isEscapePressed) {
        close()
    }

    const dialogRef = useRef()
    const closeDialog = () => {
        close()
        getEl('.login-form').reset()
        setLoginErrMess('')
    }
    useClickOutside(dialogRef, closeDialog)
    // Problème perf: vu que le dialog est mounted même quand il est close
    // useClickOutside run a chaque fois qu'il y a un click sur la page
    // alors que le dialog est fermé.
    // Il faudrait useClickOutside si dialog open mais pas le droit
    // d'utiliser hook dans if statements.
    // Peut run close que si isOpen mais ça ne résout pas la majorité
    // du problème
    // (même problème pour les 3 dialogs)

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

    if (user) return null
    return (
        // Use an inner div in dialog because the dialog has a background
        // that takes the whole screen, so putting the ref on it
        // wouldn't work.
        // Override default padding of dialog and put the same on the inner div.
        <dialog className="login-dialog mdl-dialog" style={{ "padding": "0" }}>
            <div ref={dialogRef} style={{ "padding": "1em" }}>
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
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default LoginDialog;