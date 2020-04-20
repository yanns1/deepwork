import React, { useContext } from "react"
import { ThemeContext } from '../context/ThemeContext.jsx'
import { AuthContext } from '../context/AuthContext.jsx'

/**
 * @file Component with message conveying to log in to access prechronos and stats
 * @requires react
 */
function Message() {
    // Contexts
    const { isDarkTheme } = useContext(ThemeContext);
    const { userCred } = useContext(AuthContext)

    if (userCred) return null
    return (
        <div className={isDarkTheme ? "header-message dark" : "header-message"}>Log in to make prechronos and record the time you passed in a "deep mode"!</div>
    )
}

export default Message