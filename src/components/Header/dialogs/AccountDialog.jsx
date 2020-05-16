import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'

const AccountDialog = () => {
    const { user } = useAuth();

    const closeAccountDialog = () => {
        const accountDialog = document.querySelector('.account-dialog');
        accountDialog.close();
    }

    if (!user) return null
    return (
        <dialog className="account-dialog mdl-dialog">
            <h4 className="mdl-dialog__title">Account</h4>
            <div className="mdl-dialog__content">
                <p><b>Email:</b> {user.email}</p>
                <button
                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                    type="button"
                    onClick={closeAccountDialog}
                >Close</button>
            </div>
        </dialog>
    )
}

export default AccountDialog;