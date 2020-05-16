import React, { useState } from 'react';
import { useTheme } from './context/ThemeContext.jsx';
import MusicContainer from './styled/main/music/MusicContainer.js';
import AudioContainer from './styled/main/music/AudioContainer.js';
import VideoContainer from './styled/main/music/VideoContainer.js';
import concentrationMusic from '../videos/concentration-music.mp3';
import congratulationsMusic from '../videos/congratulations.mp3';
import Icon from './styled/shared/Icon.js'

const Music = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [iframeUrl, setIframeUrl] = useState('');
    const { isDarkTheme } = useTheme();

    const handleChange = e => {
        const {name, value} = e.target;
        if (name === 'videoUrl') {
            setVideoUrl(() => value);
        };
    }

    const handleSubmit = e => {
        e.preventDefault();
        setIframeUrl(() => videoUrl);
    }

    const iframeStyles = {
        width: '70%',
        height: '40vh'
    }

    return (
        <MusicContainer className={isDarkTheme ? 'music dark' : 'music'}>
            <video className="congratulations-music" src={congratulationsMusic} style={{display: 'none'}}></video>
            <AudioContainer>
                <h5 className="audio__title">
                    Concentration music (default)
                    <Icon id="hint" className="material-icons">info</Icon>
                    <div className="mdl-tooltip" data-mdl-for="hint">
                        Press "1" for playing/pausing
                    </div>
                </h5>
                <audio className="concentration-music" src={concentrationMusic} controls>
                    Impossible de lire la vidéo ! Lien ytb:
                    https://www.youtube.com/watch?v=KNuoGeD9Qeo&t=3s
                </audio>
            </AudioContainer>
            <VideoContainer>
                <h5 className="video__title">Choose what you want to listen !</h5>
                <ol>
                    <li>Access your video on Youtube</li>
                    <li>Below the video, click on <strong>SHARE</strong></li>
                    <li>Then, click on <strong>Embed</strong></li>
                    <li>Copy the url you see after "src=" (without the quotes)</li>
                    <li>Paste-it in the input below</li>
                </ol>
                <form className="video__form" onSubmit={handleSubmit}>
                    <input type="text" name="videoUrl" value={videoUrl} onChange={handleChange}/>
                    <button type="submit">Upload</button>
                </form>
                <iframe className="video" src={iframeUrl} style={iframeUrl ? iframeStyles : null}></iframe>
            </VideoContainer>
        </MusicContainer>
    );
}

export default Music;