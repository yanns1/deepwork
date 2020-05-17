import React from 'react'
import { convertIntoHours, displayTime } from '../../scripts/utils.js'

const Display = ({
    secondsLeft,
    chronoID
}) => {
    const chronoText = displayTime(convertIntoHours(secondsLeft), [' : ', ' : '])

    // Set document title based on first chrono
    if (chronoID === 'first') {
        if (chronoText === '0s') {
            document.title = 'Deep Work';
        } else {
            document.title = chronoText;
        }
    }
    return (
        <h2 className="chrono-text">{chronoText}</h2>
    )
}

export default Display
