import React, { useState } from 'react'
import CurrentTime from './CurrentTime.jsx'
import Chrono from './Chrono/Chrono.jsx'
import PreChronos from './PreChronos.jsx'

/**
 * @file Container for the 2 Chrono components
 * @requires react (useState)
 */
const Time = () => {
    // That boolean as no meaning. I just reverse it when click to trigger useEffect in Chrono.jsx
    const [isPreChronoClicked, setIsPreChronoClicked ] = useState(false);
    const [preChronoSeconds, setPreChronoSeconds ] = useState(0);
    const [preChronoLabel, setPreChronoLabel ] = useState('');
    const [isFirstChronoRunning, setIsFirstChronoRunning ] = useState(false);

    const convertIntoSeconds = ({ hours, minutes, seconds }) => {
        let secondsTotal = 0;
        secondsTotal += parseInt(hours) * 3600;
        secondsTotal += parseInt(minutes) * 60;
        secondsTotal += parseInt(seconds);

        return secondsTotal;
    }

    return (
        <div className="time">
            <CurrentTime></CurrentTime>
            <div className="chronos">
                <Chrono
                    key={'first'}
                    chronoID={'first'}
                    isPreChronoClicked={isPreChronoClicked}
                    preChronoSeconds={preChronoSeconds}
                    preChronoLabel={preChronoLabel}
                    setPreChronoLabel={setPreChronoLabel}
                    convertIntoSeconds={convertIntoSeconds}
                    isFirstChronoRunning={isFirstChronoRunning}
                    setIsFirstChronoRunning={setIsFirstChronoRunning}
                />
                <Chrono
                    key={'second'}
                    chronoID={'second'}
                    isPreChronoClicked={isPreChronoClicked}
                    preChronoSeconds={preChronoSeconds}
                    preChronoLabel={preChronoLabel}
                    setPreChronoLabel={setPreChronoLabel}
                    convertIntoSeconds={convertIntoSeconds}
                    isFirstChronoRunning={isFirstChronoRunning}
                    setIsFirstChronoRunning={setIsFirstChronoRunning}
                />
            </div>
            <PreChronos
                setIsPreChronoClicked={setIsPreChronoClicked}
                setPreChronoSeconds={setPreChronoSeconds}
                setPreChronoLabel={setPreChronoLabel}
                convertIntoSeconds={convertIntoSeconds}
            />
        </div>
    )
}

export default Time;