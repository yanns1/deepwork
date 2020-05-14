

import { createGlobalStyle } from 'styled-components'
// Fonts
import RalewayWoff from '../../fonts/Raleway-Regular.woff'
import RalewayWoff2 from '../../fonts/Raleway-Regular.woff2'

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: "Raleway-Regular";
        src: url(${RalewayWoff}) format("woff"),
             url(${RalewayWoff2}) format("woff2");
        font-weight: normal;
        font-style: normal;
    }

    :root {
        --side-padding: 2rem;
        --clickableEl-margin: 0 1rem;
        --clickableEl-padding: 0.5rem;
        --opacity-before-hover: 0.7;
    }

    body {
        /* Astuce pour que header fix en haut et footer fix en bas */
        min-height: 100vh;
        display: flex;
        flex-flow: column;
        &.dark {
            background: rgb(30, 34, 39);
            color: #dddddd;
        }
    }

    main {
        /* Astuce pour que header fix en haut et footer fix en bas */
        flex: 1;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
        font-family: "Raleway-Regular", "Arial", sans-serif;
        line-height: 1.4;
    }

    /* Some fix */
    .mdl-dialog__actions {
    /* Overriding defaults */
    justify-content: center;
    padding-left: 8px;
    }

`

export default GlobalStyles