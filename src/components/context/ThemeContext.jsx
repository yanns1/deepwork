import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useAuthContext } from '../context/AuthContext.jsx'
import  { db } from '../../scripts/init_firebase.js'
const ThemeContext = React.createContext();

/**
 * @file Initiates the theme context
 * @requires react
 */
const ThemeContextProvider = ({
    children,
    initialState = true
}) => {
    const userCred = useAuthContext()

    const [isDarkTheme, setIsDarkTheme] = useState(initialState);

    /**
     * Toggle theme state (used when user no authentificated)
     * @function toggleTheme
     * @returns {function}
     */
    const toggleTheme = () => setIsDarkTheme(prevState => !prevState)

    // Optimize perf
    const contextValue = useMemo(() => ({ isDarkTheme, toggleTheme }), [isDarkTheme])

    /**
     * Set listener for changes in db and set theme state accordingly to response.
     */
    useEffect(() => {
        if (!userCred) return

        const usersDocRef = db.collection('users').doc(userCred.uid)
        const unsubscribe = usersDocRef.onSnapshot(doc => {
            setIsDarkTheme(() => doc.data().isDarkTheme)
        })

        return () => {
            unsubscribe()
        }
    }, [userCred])

    return (
        <ThemeContext.Provider
            value={contextValue}
        >
            {children}
        </ThemeContext.Provider>
    )
}

const useThemeContext = () => useContext(ThemeContext)

export { useThemeContext, ThemeContextProvider };