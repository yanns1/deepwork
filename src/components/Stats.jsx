import React, { useState, useEffect } from 'react'
import { useAuthContext } from './context/AuthContext.jsx'
import { db } from '../scripts/init_firebase.js';
import StyledStats from './styled/main/stats/StyledStats.js';
import DeleteLabelsForm from './styled/main/stats/DeleteLabelsForm.js';

const Stats = () => {
    const userCred = useAuthContext()

    /**
     * State for stats
     * (make sure that's initialized to an empty array in order to allow calling keys() and values() on it, even when database has not responded yet, which is the case at reload)
     * @var {Map} stats
     */
    const [stats, setStats] = useState([])

    const deleteLabelsInDb= e => {
        e.preventDefault()
        const form = e.target

        const res = window.confirm("Deleting labels is permanent. The data will be lost forever.\nAre you sure to delete them ?")

        if (res) {
            const isCheckbox = el => el.type === "checkbox"
            const isNotChecked = el => el.checked !== true
            const getName = el => el.name
            const filterInObjByKeys = (obj, correctKeys) => {
                const newObj = { ...obj }
                Object.keys(newObj).forEach(key => {
                    if (!correctKeys.includes(key)) {
                        delete newObj[key]
                    }
                })
                return newObj
            }

            const labelsToKeep = Array.from(form.elements)
                .filter(isCheckbox)
                .filter(isNotChecked)
                .map(getName)

            const userDocRef = db.collection("users").doc(userCred.uid)
            db.runTransaction(transaction => {
                return transaction.get(userDocRef).then(userDoc => {
                    if (!userDoc.exists) {
                        throw "userDoc does not exist"
                    }
                    const statsField = userDoc.data().stats
                    const updatedStatsField = filterInObjByKeys(statsField, labelsToKeep)
                    transaction.update(userDocRef, {
                        stats: updatedStatsField
                    })
                })
            }).catch(err => {
                console.error(`Error during transaction for deleting labels (either getting doc or updating it): ${err}`)
            })
            form.reset()
        } else {
            form.reset()
            return
        }
    }
    /**
     * Converts an Object to a Map data type
     * @param {Object} obj Object to convert
     * @returns {Map} New Map object
     */
    const objToMap = obj => {
        const map = new Map()
        Object.keys(obj).forEach(k => map.set(k, obj[k]))
        return map
    }

    /**
     * Listen to stats from database and set state accordingly
     * @function getStats
     * @returns {Object} - unsubscribe to listener function
     */
    const getStats = () => {
        const usersDocRef = db.collection('users').doc(userCred.uid)
        const unsubscribe = usersDocRef.onSnapshot(doc => {
            // Create Map obj to ensure insertion order
            const stats = objToMap(doc.data().stats)
            setStats(() => stats)
        })
        return unsubscribe
    }

    /**
     * Create Chart from stats data
     * @param {array} labels - Labels of the chart
     * @param {array} data - Value of each label (labels[0] goes with data[0] etc)
     */
    const createChart = (labels, data) => {
        if (userCred) {
            const canvas = document.querySelector('#chart');
            const ctx = canvas.getContext('2d');

            const myBarChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Concentrated time per activity (h)',
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    }

    /**
     * Create checkbox for each label in labels
     * @param {array} labels - Labels for which checkboxes are made
     * @returns {array} - Each item is JSX for one checkbox
     */
    const createDeleteCheckboxes = labels => {
        return labels.map(label =>
            <label key={label} className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor={label}>
                <input type="checkbox" id={label} name={label} className="mdl-checkbox__input"/>
                <span className="mdl-checkbox__label">{label}</span>
            </label>
        )
    }

    /**
     * useEffect that get and set stats state when changes occur in database
     */
    useEffect(() => {
        if (!userCred) return

        const unsubscribe = getStats()

        return () => {
            unsubscribe()
        }
    }, [userCred])

    /**
     * Create Chart right after first render and when stats change.
     * (need a useEffect because otherwise, canvas element is not yet appended to the DOM when we create the chart)
     */
    useEffect(() => {
        // stringToInt :: String -> Int || NaN
        const stringToInt = string => parseInt(string, 10)
        // secToHour :: Number -> Number
        const secToHour = s => s / 3600

        const labels = Array.from(stats.keys())
        const data = Array.from(stats.values())
                        .map(stringToInt)
                        .map(secToHour)
        createChart(labels, data)
    }, [stats])

    // Upgrade DOM at each render to maintain styling of MDL elements
    useEffect(() => {
        componentHandler.upgradeDom()
    })

    if (!userCred) return null
    const checkboxesJsx = createDeleteCheckboxes(Array.from(stats.keys()))
    return (
        <StyledStats>
            <h3 className="title">Statistics</h3>
            <canvas id="chart" width="400" height="400"></canvas>
            {checkboxesJsx.length > 0 &&
                <DeleteLabelsForm onSubmit={deleteLabelsInDb}>
                    <div className="hint">Wants to delete labels ? Choose the ones you don't want to see anymore :</div>
                    {checkboxesJsx}
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Delete</button>
                </DeleteLabelsForm>
            }
        </StyledStats>
    )
}

export default Stats;