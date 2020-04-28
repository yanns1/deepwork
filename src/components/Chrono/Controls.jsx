import React from 'react'

/**
 * @file Creates control buttons (start/pause/reset)
 * @requires react
 */
const Controls = ({
    chronoID,
    isPaused,
    setIsPaused,
    setIsRestored
}) => {

    const togglePause = () => {
        setIsPaused(prevState => !prevState);
    }

    const restoreChrono= e => {
        const restoreButtonClasses = Array.from(e.target.parentElement.classList);
        // A changer si rajoute des chronos
        const buttonID = restoreButtonClasses.some(className => className === 'first') ? 1 : 2;

        const res = window.confirm(`Etes-vous sûr de vouloir reset le chrono ${buttonID} ?`)

        if (!res) {
            return
        } else {
            setIsRestored(() => true)
        }


    }

    const restoreButtonClasses = chronoID + " restore-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--accent";

    return (
        <>
            <div className="pause-restore-buttons">
                <div className="pause-button-wrap">
                    <button className="pause-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--accent" onClick={togglePause}>
                        <i className="material-icons">{isPaused ? 'play_arrow' : 'pause'}</i>
                    </button>
                </div>

                <div className="restore-button-wrap">
                    <button className={restoreButtonClasses} onClick={restoreChrono}><i className="material-icons">restore</i></button>
                </div>
            </div>
        </>
    )
}

export default Controls;