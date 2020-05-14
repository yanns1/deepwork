import styled from 'styled-components'

const StyledChronos = styled.div`
    padding: 0 var(--side-padding);

    @media (min-width: 850px) {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .chrono {
        padding: 2rem var(--side-padding);
    }

    .chrono-text {
        text-align: center;
    }

    .start-button-wrap {
        display: flex;
        justify-content: center;
    }

    .pause-restore-buttons {
        display: flex;
        justify-content: center;
    }

    .pause-button-wrap {
        margin: 0 1em;
    }

    .restore-button-wrap {
        margin: 0 1em;
        align-self: center;
        justify-self: center;

        display: flex;
        justify-content: center;
        align-items: center;
    }
`

export default StyledChronos