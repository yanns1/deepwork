import React, { useContext, useMemo, createContext } from 'react';
import useProvideAuth from '../../hooks/useProvideAuth.js';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const auth = useProvideAuth()

    const contextValue = useMemo(() => auth, [auth])

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }