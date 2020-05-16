import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { db } from '../../scripts/init_firebase.js'
import ThemeContainer from '../styled/header/ThemeContainer.js'
import ThemeIcon from '../styled/header/ThemeIcon.js'

const ThemeToggle = () => {
    const { user } = useAuth()
    const { isDarkTheme, toggleTheme } = useTheme();

    // Add or remove 'dark' class to body
    const body = document.querySelector('body');
    isDarkTheme ? body.classList.add('dark') : body.classList.remove('dark');

    const handleClick = e => {
        if (e.target.dataset.role === 'toggleTheme') {
            // Update db
            if (user) {
                const userDocRef = db.collection("users").doc(user.uid)
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
        <ThemeContainer>
            <ThemeIcon className="material-icons" data-role="toggleTheme" onClick={handleClick} title="Change the theme">brightness_medium</ThemeIcon>
        </ThemeContainer>
    )
}

export default ThemeToggle;