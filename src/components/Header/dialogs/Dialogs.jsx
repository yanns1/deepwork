import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import AccountDialog from './AccountDialog.jsx'
import SignupDialog from './SignupDialog.jsx'
import LoginDialog from './LoginDialog.jsx'

const Dialogs = () => {
    const { user } = useAuth();

    // Upgrade DOM at each render to maintain styling of MDL elements
    useEffect(() => {
        componentHandler.upgradeDom()
    })

    // Render dialogs depending of user even if each dialog has the logic,
    // because otherwise all dialogs would be rendered, even there value is null.
    // So the onClickOutside hook attached to them would never unmount.
    return (
        <>
            {user ?
                <AccountDialog></AccountDialog>
                :
                <>
                    <SignupDialog></SignupDialog>
                    <LoginDialog></LoginDialog>
                </>
            }
        </>
    )
}

export default Dialogs;