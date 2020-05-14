import styled from 'styled-components'

const StyledPreChronos = styled.div`
    padding: 1rem var(--side-padding);
    background-color: rgb(226, 226, 226);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.dark {
        background: rgba(139, 139, 139, 0.2);
    }

    .title {
        text-align: center;
    }

    .form {
        margin: 1rem;
    }

    .chips {
        margin: 1rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

        & > .chip {
            cursor: pointer;
            border: 1px solid #7d7979;
            margin: 0.5rem;

            &:hover {
            background: rgba(46, 46, 46, 0.2);
            }
        }

        &.dark > .chip:hover {
            background: rgba(255, 255, 255, 0.45);
        }
    }

    .create-button-wrap {
        display: flex;
        justify-content: center;
    }
`

export default StyledPreChronos