import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx'
const ThemeContext = React.createContext();

/**
 * @file Initiates the theme context
 * @requires react
 */
function ThemeContextProvider({ children }) {
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
     * @returns {void}
     */
    const listenToTheme = () => {
        const usersDocRef = db.collection('users').doc(userCred.uid)
        usersDocRef.onSnapshot(doc => {
            setIsDarkTheme(() => doc.data().isDarkTheme)
        })
    }

    useEffect(() => {
        if (userCred) {
            listenToTheme()
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