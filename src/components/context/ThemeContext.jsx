import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx'
import  { db } from '../../scripts/init_firebase.js'
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