import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import { ThemeContext } from '../context/ThemeContext.jsx'

/**
 * Component returning theme icon with the ability to toggle theme when click on it
 */
function ThemeToggle() {
    // Contexts
    const { userCred } = useContext(AuthContext);
    const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

    // Add or remove 'dark' class to body
    const body = document.querySelector('body');
    isDarkTheme ? body.classList.add('dark') : body.classList.remove('dark');

    function handleClick(e) {
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