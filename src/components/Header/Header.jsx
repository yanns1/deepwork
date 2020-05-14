import React from 'react';
import { useThemeContext } from '../context/ThemeContext.jsx';
import Dialogs from './Dialogs.jsx';
import Message from './Message.jsx';
import Navbar from './Navbar.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import SubHeader from '../styled/header/SubHeader.js';
import Title from '../styled/header/Title.js';


const Header = () => {
    const { isDarkTheme } = useThemeContext();

    return (
        <header>
            <SubHeader>
                <Dialogs />
                <Title className={isDarkTheme ? "title dark" : "title"} href="/index.html">Deep Work</Title>
                <Navbar />
            </SubHeader>
            <Message />
            <ThemeToggle />
        </header>
    )
}

export default Header;