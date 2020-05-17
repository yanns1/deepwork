import React, { useState, useEffect } from 'react';
import { firebase, db } from '../../scripts/init_firebase.js';
import Input from './Input.jsx';
import Display from './Display.jsx';
import Controls from './Controls.jsx';
import { useAuth } from '../context/AuthContext.jsx';


const Chrono = ({
    chronoID,
    isPreChronoClicked,
    preChronoSeconds,
    preChronoLabel,
    setPreChronoLabel,
    isFirstChronoRunning,
    setIsFirstChronoRunning
}) => {
    const { user } = useAuth();

    const [secondsLeft, setSecondsLeft] = useState(0);
    const [label, setLabel] = useState('');
    const [initChronoTime, setInitChronoTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isRestored, setIsRestored] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);


    const isLabelNumLimitReached = async (labelToAdd) => {
        const limit = 5
        let isLimitReached = true

        try {
            const userDoc = await db.collection('users').doc(user.uid).get()
            if (userDoc.exists) {
                const labels = Object.keys(userDoc.data().stats)
                if (labels.includes(labelToAdd) || labels.length < limit) {
                    isLimitReached = false
                }
            } else {
                console.log("User document doesn't exist")
            }
        } catch(err) {
            console.error(`Error getting user document: ${err}`)
        }

        return isLimitReached
    }

    /**
     * Update stats in db for given user, label and timeToAdd
     * @param {Object} uid - User id from his credentials
     * @param {string} label - Label to udpdate
     * @param {number} timeToAdd - Time in seconds to add to label
     * @returns {Object} - null if update is successfull. Error object otherwise.
     */
    const updateStatsInDb = (uid = user.uid, label, timeToAdd = 0) => {
        const userDoc = db.collection('users').doc(uid)
        const keyToUpdate = `stats.${label}`
        const updatedStats = {
            [keyToUpdate]: firebase.firestore.FieldValue.increment(timeToAdd)
        }
        userDoc.update(updatedStats).then(() => {
            return null
        })
        .catch(err => {
            return err
        })
    }

    /**
     * Play the congratulations music
     */
    const playCongratulationsMusic = () => {
        const congratulations = document.querySelector('.congratulations-music');
        congratulations.currentTime = 0;
        congratulations.loop = true;
        // Pour éviter cette erreur: DOMException: The play() request was interrupted
        const playPromise = congratulations.play();
        if (playPromise !== undefined) {
            playPromise.catch(err => {
                console.error(`Error during loading of congratulations-music` + err)
            })
        }
    }

    /**
     * Acts when isRestored changes to true
     * If there's a label, asks the user if he wants to record elapsed time in his stats. If so, update db.
     * Then set secondsLeft to 0 in any case.
     * @func
     */
    useEffect(() => {
        if (isRestored) {
            // Set isPaused to false, in case it was true
            setIsPaused(() => false)

            if (chronoID === 'first') {
                setIsFirstChronoRunning(() => false);
            }

            const currentLabel = preChronoLabel || label
            if (currentLabel) {
                const timeElapsedBeforeRestore = initChronoTime - secondsLeft

                const res = window.confirm(`Souhaitez-vous ajouter les ${timeElapsedBeforeRestore}s écoulées à vos statistiques pour le label ${currentLabel} ?`);

                (async () => {
                    if (res) {
                        if (!await isLabelNumLimitReached(currentLabel)) {
                            console.log("passed here")
                            const err = updateStatsInDb(user.uid, currentLabel, timeElapsedBeforeRestore)
                            if (err) {
                                console.error(`Error during updating stats: ${err}`)
                            }
                        } else {
                            window.alert("Sorry, you can't have more than 5 labels !\nDelete one before using a new one.")
                        }
                        setSecondsLeft(() => -1)
                        setIsRestored(() => false)
                    } else {
                        setSecondsLeft(() => -1)
                        setIsRestored(() => false)
                    }
                })()

            } else {    // if no label but isRestored = true
                setSecondsLeft(() => -1)
                setIsRestored(() => false)
            }
        }
    }, [isRestored])


    useEffect(() => {
        if (isPaused) return

        const id = setTimeout(() => {
            if (secondsLeft > 0) {
                setSecondsLeft(prevState => prevState - 1);
                chronoID === 'first' ? setIsFirstChronoRunning(() => true) : null
            }
        }, 1000);

        /**
         * @todo Silly workaround coming...
        */
        // If secondsLeft < 0 (-1 || -2), that means chrono was restored
        if (secondsLeft < 0) {
            chronoID === 'first' ? setIsFirstChronoRunning(() => false) : null
            playCongratulationsMusic()
            /**
             * @todo Si j'enlève le return, justement ça fait le coup du -1 (ducoup secondsLeft == -2). Mais pk ?
             * Parfois donne -1, parfois -2...
             */
            return
        }
        // If secondsLeft == 0, that means chrono finished by himself
        if (secondsLeft == 0) {
            // Skip if first render
            if (isFirstRender) {
                setIsFirstRender(() => false);
                return;
            }

            chronoID === 'first' ? setIsFirstChronoRunning(() => false) : null
            playCongratulationsMusic()

            // if chrono not restored and there's a label, update db
            const currentLabel = preChronoLabel || label
            if (currentLabel) {

                const message = "from seconds"
                const err = updateStatsInDb(user.uid, currentLabel, initChronoTime, message)
                if (err) {
                    console.error(`Error during updating stats: ${err}`)
                }

                // Reinitialize 'preChronoLabel', because not associated with an input like 'label' (which become automatically empty at each render)
                setPreChronoLabel(() => '');
            }
        }


        return () => {
            clearTimeout(id)
        }
    }, [secondsLeft, isPaused]);

    /*
    qd click sur prechrono et que applyChip, je modifie le state
    isPrechronoClicked (Chronos) pour ensuite le redistribuer à chacun des chronos et choisir sur lequel appliquer le prechrono
    1: aucun chrono en route. Alors lancer sur chrono 1
    2: chrono 1 en route et pas 2. Alors lancer sur chrono 2
    3: chrono 2 en route mais pas 1. Alors lancer sur chrono 1
    4: 2 chronos en route. Alors dire au user que peut pas lancer prechrono
    */

    /**
     * Set first chrono (or second if first already in use) when one prechrono clicked
     * @func setPrechrono
     */
    useEffect(() => {
        if (!isFirstChronoRunning) {
            // Filter the 'second' Chrono component
            if (chronoID === 'first') {
                if (preChronoSeconds > 0) {
                    setSecondsLeft(() => preChronoSeconds);
                    setInitChronoTime(() => preChronoSeconds);
                }
            }
        } else {
            // Filter the 'first' Chrono component
            // If the 2 chronos are running, the chrono 2 will be
            // overriden if a new prechrono is launched
            if (chronoID === 'second') {
                if (preChronoSeconds > 0) {
                    setSecondsLeft(() => preChronoSeconds);
                    setInitChronoTime(() => preChronoSeconds);
                }
            }
        }
    }, [isPreChronoClicked])

    return (
        <div className="chrono">
            <Input
                label={label}
                setLabel={setLabel}
                setInitChronoTime={setInitChronoTime}
                setSecondsLeft={setSecondsLeft}
            />
            <Display
                secondsLeft={secondsLeft}
                chronoID={chronoID}
            />
            <Controls
                label={label}
                preChronoLabel={preChronoLabel}
                chronoID={chronoID}
                isPaused={isPaused}
                setIsPaused={setIsPaused}
                setIsRestored={setIsRestored}
                secondsLeft={secondsLeft}
                setSecondsLeft={setSecondsLeft}
            />
        </div>
    )
}

export default Chrono;