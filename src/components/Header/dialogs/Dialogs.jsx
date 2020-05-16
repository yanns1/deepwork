import React, { useEffect } from 'react'
import AccountDialog from './AccountDialog.jsx'
import SignupDialog from './SignupDialog.jsx'
import LoginDialog from './LoginDialog.jsx'

const Dialogs = () => {
    // Upgrade DOM at each render to maintain styling of MDL elements
    useEffect(() => {
        componentHandler.upgradeDom()
    })

    return (
        <>
            <AccountDialog></AccountDialog>
            <SignupDialog></SignupDialog>
            <LoginDialog></LoginDialog>
        </>
    )
}

export default Dialogs;