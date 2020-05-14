import styled from 'styled-components'
import Icon from '../shared/Icon.js'

const ThemeIcon = styled(Icon)`
    margin: var(--clickableEl-margin);
    padding: var(--clickableEl-padding);
    display: flex;
    align-items: center;
    opacity: var(--opacity-before-hover);

    &:hover {
        opacity: 1;
    }
`

export default ThemeIcon