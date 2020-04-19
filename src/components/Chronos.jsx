import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Chrono from './Chrono/Chrono.jsx';
import PreChronos from './PreChronos.jsx';

/**
 * @file Container for the 2 Chrono components
 * @requires react (useState)
 */
function Chronos() {
    // That boolean as no meaning. I just reverse it when click to trigger useEffect in Chrono.jsx
    const [isPreChronoClicked, setIsPreChronoClicked ] = useState(false);
    const [preChronoSeconds, setPreChronoSeconds ] = useState(0);
    const [preChronoLabel, setPreChronoLabel ] = useState('');
    const [isFirstChronoRunning, setIsFirstChronoRunning ] = useState(false);

    function convertIntoSeconds({ hours, minutes, seconds }) {
        let secondsTotal = 0;
        secondsTotal += parseInt(hours) * 3600;
        secondsTotal += parseInt(minutes) * 60;
        secondsTotal += parseInt(seconds);

        return secondsTotal;
    }

    return (
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
            <PreChronos
                setIsPreChronoClicked={setIsPreChronoClicked}
                setPreChronoSeconds={setPreChronoSeconds}
                setPreChronoLabel={setPreChronoLabel}
                convertIntoSeconds={convertIntoSeconds}
            />
        </div>
    )
}

export default Chronos;