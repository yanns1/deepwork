import React from "react"
import { useThemeContext } from '../context/ThemeContext.jsx'
import { useAuthContext } from '../context/AuthContext.jsx'
import HeaderMess from '../styled/header/HeaderMess.js'

/**
 * @file Component with message conveying to log in to access prechronos and stats
 * @requires react
 */
const Message = () => {
    // Contexts
    const { isDarkTheme } = useThemeContext();
    const userCred = useAuthContext()

    if (userCred) return null
    return (
        <HeaderMess className={isDarkTheme ? "header-message dark" : "header-message"}>Log in to make prechronos and record the time you passed in a "deep mode"!</HeaderMess>
    )
}

export default Message