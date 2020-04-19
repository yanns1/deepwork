import React, { useState } from 'react';
const ThemeContext = React.createContext();

/**
 * @file Initiates the theme context
 * @requires react (useState)
 */
function ThemeContextProvider(props) {
    const [theme, setTheme] = useState('dark');

    function toggleTheme() {
        return setTheme(() => theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeContextProvider };