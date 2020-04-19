import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';
import Dialogs from './Dialogs.jsx';
import Message from './Message.jsx';
import Navbar from './Navbar.jsx';
import ThemeToggle from './ThemeToggle.jsx';


function Header() {
    const { theme } = useContext(ThemeContext);

    return (
        <header>
            <div className="header-subcontainer">
                <Dialogs />
                <a className={theme === 'dark' ? "title dark" : "title"} href="/index.html">Deep Work</a>
                <Navbar />
            </div>
            <Message />
            <ThemeToggle />
        </header>
    )
}

export default Header;