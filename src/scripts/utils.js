
const getEl = sel => document.querySelector(sel)

// stringToInt :: String -> Int || NaN
const stringToInt = string => parseInt(string, 10)

const convertIntoSeconds = ({ hours, minutes, seconds }) => {
    let secondsTotal = 0;
    secondsTotal += parseInt(hours) * 3600;
    secondsTotal += parseInt(minutes) * 60;
    secondsTotal += parseInt(seconds);

    return secondsTotal;
}

const convertIntoHours = seconds => {
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

/**
 * Create chrono text given the hours, minutes and seconds
 * @param {Object} prechrono Prechrono obj, i.e with keys hours, minutes and seconds
 * @returns {String} - Chrono text
 */
const displayTime = ({ hours, minutes, seconds }, [firstInterval, secondInterval]) => {
    // Ensure that inputs are ints, but add 'stringToInt' dependency
    // + changing variables hours, minutes, seconds to h, min, s
    const [h, min, s] = [hours, minutes, seconds].map(stringToInt)

    const hoursText = h ? `${h}h` : '';
    let minutesText = '';
    let secondsText = '';
    let displayFirstInterval = false;
    let displaySecondInterval = false;

    if (hoursText) {
        displayFirstInterval = true;
        if (min < 10) {
            minutesText = `0${min}min`;
        } else {
            minutesText = `${min}min`;
        }
    } else {
        if (min === 0) {
            minutesText = '';
        } else {
            minutesText = `${min}min`;
        }
    }

    if (minutesText) {
        displaySecondInterval = true;
        if (s < 10) {
            secondsText = `0${s}s`;
        } else {
            secondsText = `${s}s`;
        }
    } else {
        secondsText = `${s}s`;
    }

    return hoursText + (displayFirstInterval ? firstInterval : '') + minutesText + (displaySecondInterval ? secondInterval : '') + secondsText;
}

export { getEl, stringToInt, convertIntoSeconds, convertIntoHours, displayTime }