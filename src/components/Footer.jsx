import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StyledFooter from './styled/footer/StyledFooter.js'
import FooterLink from './styled/footer/FooterLink.js'

const Footer = () => {
    return (
        <StyledFooter>
            <FooterLink
                target="_blank"
                href="https://twitter.com/YannSalmon1"
                title="Twitter"
            >
                <FontAwesomeIcon className={"brand-icon"} icon={["fab", "twitter"]} />
            </FooterLink>
            <FooterLink
                target="_blank"
                href="https://github.com/yanns1/deepwork"
                title="Github"
            >
                <FontAwesomeIcon className={"brand-icon"} icon={["fab","github"]} />
            </FooterLink>
        </StyledFooter>
    )
}

export default Footer;