import React from "react"
import { useThemeContext } from '../context/ThemeContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import HeaderMess from '../styled/header/HeaderMess.js'


const Message = () => {
    const { isDarkTheme } = useThemeContext();
    const { user } = useAuth();

    if (user) return null
    return (
        <HeaderMess className={isDarkTheme ? "header-message dark" : "header-message"}>Log in to make prechronos and record the time you passed in a "deep mode"!</HeaderMess>
    )
}

export default Message