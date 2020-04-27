import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';
import Dialogs from './Dialogs.jsx';
import Message from './Message.jsx';
import Navbar from './Navbar.jsx';
import ThemeToggle from './ThemeToggle.jsx';


function Header() {
    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <header>
            <div className="subheader">
                <Dialogs />
                <a className={isDarkTheme ? "title dark" : "title"} href="/index.html">Deep Work</a>
                <Navbar />
            </div>
            <Message />
            <ThemeToggle />
        </header>
    )
}

export default Header;