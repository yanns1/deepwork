import styled from 'styled-components'
import Icon from '../shared/Icon.js'

const AccountIcon = styled(Icon)`
    margin: var(--clickableEl-margin);
    padding: var(--clickableEl-padding);
    opacity: var(--opacity-before-hover);

    &:hover {
        opacity: 1;
    }
`

export default AccountIcon