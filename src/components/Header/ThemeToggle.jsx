import React from 'react'
import { useAuthContext } from '../context/AuthContext.jsx'
import { useThemeContext } from '../context/ThemeContext.jsx'
import { db } from '../../scripts/init_firebase.js'

/**
 * Component returning theme icon with the ability to toggle theme when click on it
 */
const ThemeToggle = () => {
    // Contexts
    const userCred = useAuthContext()
    const { isDarkTheme, toggleTheme } = useThemeContext();

    // Add or remove 'dark' class to body
    const body = document.querySelector('body');
    isDarkTheme ? body.classList.add('dark') : body.classList.remove('dark');

    const handleClick = e => {
        if (e.target.dataset.role === 'toggleTheme') {
            // Update db
            if (userCred) {
                const userDocRef = db.collection("users").doc(userCred.uid)
                const updatedTheme = isDarkTheme
                    ? { isDarkTheme: false }
                    : { isDarkTheme: true }
                userDocRef.update(updatedTheme)
                    .catch(err => {
                        console.error(`Error during updating theme in db: ${err}`)
                    })
            } else {
                toggleTheme()
            }
        }
    }

    return (
        <div className="theme">
            <i className="material-icons theme-icon" data-role="toggleTheme" onClick={handleClick} title="Change the theme">brightness_medium</i>
        </div>
    )
}

export default ThemeToggle;