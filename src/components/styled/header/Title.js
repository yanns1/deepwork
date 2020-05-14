import styled from 'styled-components'

const Title = styled.a`
    font-family: "Avant Garde", "Century Gothic", "AppleGothic", sans-serif;
    font-size: 2rem;
    text-align: center;
    text-transform: uppercase;
    text-rendering: optimizeLegibility;
    text-decoration: none;
    color: black;
    letter-spacing: 0.05em;
    text-shadow: 7px 7px 0px #d5d5d5, 4px 4px 0px rgba(0, 0, 0, 0.2);

    &.dark {
        color: rgb(223, 223, 223);
        text-shadow: 4px 4px 0px #8b8b8b, 7px 7px 0px rgba(139, 139, 139, 0.2);
    }
`

export default Title