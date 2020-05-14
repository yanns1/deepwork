import React, { useState, useEffect } from 'react';
import StyledCurrentTime from './styled/header/StyledCurrentTime.js'

const CurrentTime = () => {
    const [now, setNow] = useState(new Date());
    const [currentMinute, setCurrentMinute] = useState(now.getMinutes());
    const [currentHour, setCurrentHour] = useState(now.getHours());

    useEffect(() => {
        const intervalID = setInterval(() => {
            setNow(() => new Date());
            setCurrentMinute(() => now.getMinutes());
            setCurrentHour(() => now.getHours());
        }, 1000);

        return () => clearInterval(intervalID);
    }, [now, currentMinute, currentHour]);

    return (
        <StyledCurrentTime className="current-time"><strong>Now</strong>
            <div>{currentHour}:{currentMinute < 10 ? '0' + currentMinute : currentMinute}</div>
        </StyledCurrentTime>
    )
}

export default CurrentTime;