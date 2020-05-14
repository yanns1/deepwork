import styled from 'styled-components'

const NavLink = styled.li`
    cursor: pointer;
    list-style-type: none;
    margin: var(--clickableEl-margin);
    padding: var(--clickableEl-padding);
    opacity: var(--opacity-before-hover);

    &:hover {
        opacity: 1;
    }
`

export default NavLink