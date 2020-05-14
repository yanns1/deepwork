import styled from 'styled-components'

const VideoContainer = styled.div`
    border-top: solid 2px black;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .video__title {
        text-align: center;
    }

    .video__form {
        margin: 1em;
    }

    @media (min-width: 600px) {
        flex: 1;
        border-top: none;
        border-left: solid 2px black;
    }
`

export default VideoContainer