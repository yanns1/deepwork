import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import Dialogs from './dialogs/Dialogs.jsx';
import Message from './Message.jsx';
import Navbar from './Navbar.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import SubHeader from '../styled/header/SubHeader.js';
import Title from '../styled/header/Title.js';


const Header = () => {
    const { isDarkTheme } = useTheme();

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