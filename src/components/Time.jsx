import React, { useState } from 'react'
import CurrentTime from './CurrentTime.jsx'
import Chrono from './Chrono/Chrono.jsx'
import PreChronos from './PreChronos.jsx'
import StyledChronos from './styled/main/time/StyledChronos.js'

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
        <>
            <CurrentTime></CurrentTime>
            <StyledChronos>
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
            </StyledChronos>
            <PreChronos
                setIsPreChronoClicked={setIsPreChronoClicked}
                setPreChronoSeconds={setPreChronoSeconds}
                setPreChronoLabel={setPreChronoLabel}
                convertIntoSeconds={convertIntoSeconds}
            />
        </>
    )
}

export default Time;