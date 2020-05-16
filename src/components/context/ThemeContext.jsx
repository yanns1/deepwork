import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useAuth } from '../context/AuthContext.jsx'
import  { db } from '../../scripts/init_firebase.js'
const ThemeContext = React.createContext();


const ThemeProvider = ({
    children,
    initialState = true
}) => {
    const { user } = useAuth();

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
        if (!user) return

        const usersDocRef = db.collection('users').doc(user.uid)
        const unsubscribe = usersDocRef.onSnapshot(doc => {
            setIsDarkTheme(doc.data().isDarkTheme)
        })

        return () => {
            unsubscribe()
        }
    }, [user])

    return (
        <ThemeContext.Provider
            value={contextValue}
        >
            {children}
        </ThemeContext.Provider>
    )
}

const useTheme = () => useContext(ThemeContext)

export { useTheme, ThemeProvider };