import React from 'react';
import twitterLogo from '../img/twitter.png';
import githubLogo from '../img/github.png';

/**
 * @file Creates the footer
 * @requires react
 */
function Footer() {
    return (
        <footer>
            <a
                className="footer-link"
                target="_blank "
                href="https://twitter.com/YannSalmon1"
                title="Twitter"
            >
                <img src={twitterLogo} alt="twitter logo" />
            </a>
            <a
                className="footer-link"
                target="_blank "
                href="https://github.com/yanns1/"
                title="Github"
            >
                <img src={githubLogo} alt="twitter logo" />
            </a>
        </footer>
    )
}

export default Footer;