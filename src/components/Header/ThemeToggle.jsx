import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';
import PropTypes from 'prop-types';

/**
 * Component returning theme icon with the ability to toggle theme when click on it
 */
function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    // Add or remove 'dark' class to body
    const body = document.querySelector('body');
    theme === 'dark' ? body.classList.add('dark') : body.classList.remove('dark');

    function handleClick(e) {
        if (e.target.dataset.role === 'toggleTheme') {
            toggleTheme();
        }
    }

    return (
        <div className="theme">
            <i className="material-icons theme-icon" data-role="toggleTheme" onClick={handleClick} title="Change the theme">brightness_medium</i>
            {/* <div className="theme-checkbox">
                <label
                    className="theme-checkbox_label mdl-switch mdl-js-switch mdl-js-ripple-effect"
                >
                    <input
                        type="checkbox"
                        id="theme"
                        name="theme"
                        className="mdl-switch__input"
                        onChange={handleChange}
                        checked={theme === 'dark' ? true : false}
                    />
                    <span className="mdl-switch__label"></span>
                </label>
            </div> */}
        </div>
    )
}

export default ThemeToggle;