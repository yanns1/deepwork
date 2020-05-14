import styled from 'styled-components'

const StyledStats = styled.div`
    padding: 2rem var(--side-padding);

    .title {
        text-align: center;

        &.dark {
            /* Keep the title white when we're in dark mode because otherwise it would be black because of the color black implemented on the table parent element (.stats) */
            color: #dddddd;
        }
    }

    #chart {
    max-width: 90vw;
    margin: 3rem 0;
    }
`

export default StyledStats