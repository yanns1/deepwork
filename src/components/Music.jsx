import React, { useState, useContext } from 'react';
import { ThemeContext } from './context/ThemeContext.jsx';
import concentrationMusic from '../videos/concentration-music.mp3';
import congratulationsMusic from '../videos/congratulations.mp3';

/**
 * @file Creates the music section
 * @requires react (useState, useContext)
 */
function Music() {
    const [videoUrl, setVideoUrl] = useState('');
    const [iframeUrl, setIframeUrl] = useState('');

    function handleChange(e) {
        const {name, value} = e.target;
        if (name === 'videoUrl') {
            setVideoUrl(() => value);
        };
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIframeUrl(() => videoUrl);
    }

    const iframeStyles = {
        width: '70%',
        height: '40vh'
    };

    const { theme } = useContext(ThemeContext);

    return (
        <div className={theme === 'dark' ? `music ${theme}` : 'music'}>
            <video className="congratulations-music" src={congratulationsMusic} style={{display: 'none'}}></video>
            <div className="audio-wrapper">
                <h5 className="audio-title">
                    Concentration music (default)
                    <div id="hint" className="icon material-icons">info</div>
                    <div className="mdl-tooltip" data-mdl-for="hint">
                        Press "1" for playing/pausing
                    </div>
                </h5>
                <audio className="concentration-music" src={concentrationMusic} controls>
                    Impossible de lire la vidéo ! Lien ytb:
                    https://www.youtube.com/watch?v=KNuoGeD9Qeo&t=3s
                </audio>
            </div>
            <div className="video-wrapper">
                <h5 className="video-title">Choose what you want to listen !</h5>
                <ol>
                    <li>Access your video on Youtube</li>
                    <li>Below the video, click on <strong>SHARE</strong></li>
                    <li>Then, click on <strong>Embed</strong></li>
                    <li>Copy the url you see after "src=" (without the quotes)</li>
                    <li>Paste-it in the input below</li>
                </ol>
                <form className="upload-form" action="" onSubmit={handleSubmit}>
                    <input type="text" name="videoUrl" value={videoUrl} onChange={handleChange}/>
                    <button type="submit">Upload</button>
                </form>
                <iframe className="video" src={iframeUrl} style={iframeUrl ? iframeStyles : null}></iframe>
            </div>
        </div>
    );
}

export default Music;