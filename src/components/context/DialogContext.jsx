import React, { useContext, createContext, useMemo } from 'react'
import useProvideDialog from '../../hooks/useProvideDialog.js'

const DialogContext = createContext()

const DialogProvider = ({ children }) => {
    const accountDialog = useProvideDialog('.account-dialog')
    const signupDialog = useProvideDialog('.signup-dialog')
    const loginDialog = useProvideDialog('.login-dialog')

    const contextValue = useMemo(() => ({
        accountDialog,
        signupDialog,
        loginDialog
    }), [
        accountDialog,
        signupDialog,
        loginDialog
    ])

    return (
        <DialogContext.Provider value={contextValue}>
            {children}
        </DialogContext.Provider>
    )
}

const useDialog = () => useContext(DialogContext)

export { DialogProvider, useDialog }