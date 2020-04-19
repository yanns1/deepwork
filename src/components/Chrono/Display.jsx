import React from 'react';
import PropTypes from 'prop-types';
import congratulationsMusic from '../../videos/congratulations.mp3';

/**
 * @file Creates section where the chrono content is displayed
 * @requires react
 */
function Display({ secondsLeft }) {

    function convertIntoHours(seconds) {
        // Because of a problem unresolved, secondsLeft can have the value -1
        if (seconds < 0) {
            return {
                hours: 0,
                minutes: 0,
                seconds: 0
            };
        };
        const hours = Math.floor(seconds / 3600);
        let secondsLeft = seconds % 3600;
        const minutes = Math.floor(secondsLeft / 60);
        secondsLeft %= 60;

        return { hours, minutes, seconds: secondsLeft };
    }

    function createChronoText({ hours, minutes, seconds }) {
        const hoursText = hours ? `${hours}h` : '';
        let minutesText = '';
        let secondsText = '';
        let firstInterval = '';
        let secondInterval = '';

        if (hoursText) {
            firstInterval = ' : ';
            if (minutes < 10) {
                minutesText = `0${minutes}min`;
            } else {
                minutesText = `${minutes}min`;
            }
        } else {
            if (minutes === 0) {
                minutesText = '';
            } else {
                minutesText = `${minutes}min`;
            }
        }

        if (minutesText) {
            secondInterval = ' : ';
            if (seconds < 10) {
                secondsText = `0${seconds}s`;
            } else {
                secondsText = `${seconds}s`;
            }
        } else {
            secondsText = `${seconds}s`;
        }

        return hoursText + firstInterval + minutesText + secondInterval + secondsText;
    }

    const chronoText = createChronoText(convertIntoHours(secondsLeft));
    // Ca bug qd 2 chronos en marche mais sinon besoin d'identifier lequel a le temps restant le + faible, donc surement obligé de remonter au component Chronos.jsx...
    if (chronoText === '0s') {
        document.title = 'Deep Work';
    } else {
        document.title = chronoText;
    }

    return (
        <>
            <h2 className="chrono-text">{chronoText}</h2>
            <h2 className="chrono-text">{secondsLeft}</h2>
        </>
    )
}

export default Display;
