import styled from 'styled-components'

const FooterLink = styled.a`
    color: inherit;
    margin: 0 1em;
    padding: 1em 1em;
    text-decoration: none;

    .brand-icon {
        cursor: pointer;
        font-size: 2rem;
        opacity: var(--opacity-before-hover);

        &:hover {
            opacity: 1;
        }
    }
`

export default FooterLink