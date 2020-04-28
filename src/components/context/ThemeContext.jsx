import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx'
const ThemeContext = React.createContext();

/**
 * @file Initiates the theme context
 * @requires react
 */
const ThemeContextProvider = ({
    children
}) => {
    // Contexts
    const { userCred } = useContext(AuthContext)

    // States
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    /**
     * Toggle theme state (used when user no authentificated)
     * @function listenToTheme
     * @returns {function}
     */
    const toggleTheme = () => setIsDarkTheme(prevState => !prevState)

    /**
     * Set listener for changes in db and set theme state accordingly to response.
     * (impure)
     * @function listenToTheme
     * @returns {Object} - unsubscribe to listener function
     */
    const listenToTheme = () => {
        const usersDocRef = db.collection('users').doc(userCred.uid)
        const unsubscribe = usersDocRef.onSnapshot(doc => {
            setIsDarkTheme(() => doc.data().isDarkTheme)
        })
        return unsubscribe
    }

    useEffect(() => {
        if (!userCred) return

        const unsubscribe = listenToTheme()

        return () => {
            unsubscribe()
        }
    }, [userCred])

    return (
        <ThemeContext.Provider
            value={{
                isDarkTheme,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeContextProvider };