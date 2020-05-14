import React, { useState, useContext, useMemo } from 'react';
import { auth } from '../../scripts/init_firebase.js';
const AuthContext = React.createContext();

/**
 * @file Initiates the authentification context
 * @requires react
 */
const AuthContextProvider = ({
    children,
    initialState = null
}) => {
    const [userCred, setUserCred] = useState(initialState);

    auth.onAuthStateChanged(userCred => {
        setUserCred(() => userCred)
    });

    // Optimize perf
    const contextValue = useMemo(() => userCred, [userCred])

    return (
        <AuthContext.Provider
            value={contextValue}
        >
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => useContext(AuthContext)

export { useAuthContext, AuthContextProvider }