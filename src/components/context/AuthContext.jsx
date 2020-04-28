import React, { useState } from 'react';
const AuthContext = React.createContext();

/**
 * @file Initiates the authentification context
 * @requires react
 */
const AuthContextProvider = ({
    children
}) => {
    const [userCred, setUserCred] = useState(null);

    auth.onAuthStateChanged(userCred => {
        setUserCred(() => userCred)
    });

    return (
        <AuthContext.Provider
            value={{
                userCred
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider }