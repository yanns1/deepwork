import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * @file Creates the footer
 * @requires react
 */
const Footer = () => {
    return (
        <footer className="footer">
            <a
                className="footer-link"
                target="_blank"
                href="https://twitter.com/YannSalmon1"
                title="Twitter"
            >
                <FontAwesomeIcon className={"brand-icon"} icon={["fab", "twitter"]} />
            </a>
            <a
                className="footer-link"
                target="_blank"
                href="https://github.com/yanns1/deepwork"
                title="Github"
            >
                <FontAwesomeIcon className={"brand-icon"} icon={["fab","github"]} />
            </a>
        </footer>
    )
}

export default Footer;