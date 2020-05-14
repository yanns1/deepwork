import styled from 'styled-components'

const MusicContainer = styled.div`
    /* padding to expand background into */
    padding: 0 var(--side-padding);
    background: rgb(226, 226, 226);

    &.dark {
        background: rgba(139, 139, 139, 0.2);
    }

    @media (min-width: 600px) {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

export default MusicContainer