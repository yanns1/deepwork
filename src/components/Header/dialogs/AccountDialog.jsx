import React, { useRef } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useDialog } from '../../context/DialogContext.jsx'
import useClickOutside from '../../../hooks/useClickOutside.js';

const AccountDialog = () => {
    const { user } = useAuth();
    const { accountDialog: { close } } = useDialog()

    const dialogRef = useRef()
    useClickOutside(dialogRef, close)

    if (!user) return null
    return (
        // Use an inner div in dialog because the dialog has a background
        // that takes the whole screen, so putting the ref on it
        // wouldn't work.
        // Override default padding of dialog and put the same on the inner div.
        <dialog className="account-dialog mdl-dialog" style={{ "padding": "0" }}>
            <div ref={dialogRef} style={{ "padding": "1em" }}>
                <h4 className="mdl-dialog__title">Account</h4>
                <div className="mdl-dialog__content">
                    <p><b>Email:</b> {user.email}</p>
                </div>
            </div>

        </dialog>
    )
}

export default AccountDialog;