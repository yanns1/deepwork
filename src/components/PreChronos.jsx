import React, { useState, useEffect } from 'react';
import { useTheme } from './context/ThemeContext.jsx';
import { useAuth } from './context/AuthContext.jsx';
import { firebase, db } from '../scripts/init_firebase.js';
import { convertIntoSeconds, displayTime } from '../scripts/utils.js';
import StyledPreChronos from './styled/main/time/StyledPreChronos.js'
import TimeSelects from './styled/main/time/TimeSelects.js'
import Icon from './styled/shared/Icon.js'


const PreChronos = ({
    setIsPreChronoClicked,
    setPreChronoSeconds,
    setPreChronoLabel,
}) => {
    const [prechronos, setPrechronos] = useState(null)

    const { isDarkTheme } = useTheme();
    const { user } = useAuth();

    /**
     * Create a chip given the hours, minutes and seconds
     * @param {Object} prechrono - Prechrono obj, i.e with keys hours, minutes and seconds
     * @returns {JSX} - JSX for a chip
     */
    const createChip = ({ hours, minutes, seconds }) => {
        const chronoText = displayTime({ hours, minutes, seconds }, ['', '']);
        return (
            <span
                key={hours + minutes + seconds}
                className="chip mdl-chip mdl-chip--deletable"
                data-hours={hours}
                data-minutes={minutes}
                data-seconds={seconds}
                data-role="applyChip">
                <span
                    className="mdl-chip__text"
                    data-role="applyChip"
                >
                    {chronoText}
                </span>
                <button
                    type="button"
                    className="mdl-chip__action"
                    data-role="deleteChip"
                >
                    <Icon
                        className="material-icons"
                        data-role="deleteChip"
                    >
                        cancel
                    </Icon>
                </button>
            </span>
        )
    }

    /**
     * Modify states (preChronoSeconds, isPreChronoClicked, preChronoLabel) accordingly which lauchs the prechrono
     * @param {Object} prechrono - Prechrono obj (from chipWrapper dataset)
     * @returns {void}
     */
    const applyChip = ({ hours, minutes, seconds }) => {
        // Ask for a label
        const label = window.prompt(`Choose your label:\n(Only lowercases and underscores are valid. Don't let white spaces ! If those conditions are not respected, the label will not be considered.)`)

        // Different from "!label", because label can be an empty string
        if (label === null) return

        // Start prechrono
        setPreChronoSeconds(() => convertIntoSeconds({ hours, minutes, seconds }))

        // Same pattern used in Input.jsx for label input
        const checkedLabel = label.match(/[a-z_]+/)
        if (!checkedLabel) {
            window.alert("Your label is incorrect !\nOnly lowercases and underscores are valid. In addition, don't let white spaces !")
        }
        if (checkedLabel && label === checkedLabel[0]) {
            setPreChronoLabel(() => label)
        }

        // Ordre important: il faut que 'preChronoSeconds' et 'preChronoLabel' soient update avant que 'preChronoClicked' soit true. Sinon useEffect dans Chrono.jsx marchera alors que données non-update.
        setIsPreChronoClicked(prevState => !prevState)
    }

    /**
     * Delete prechrono in db
     * @param {Object} prechrono - Prechrono obj (from chipWrapper dataset)
     * @returns {void}
     */
    const deleteChip = ({ hours, minutes, seconds }) => {
        const userDocRef = db.collection("users").doc(user.uid)
        db.runTransaction(transaction => {
            return transaction.get(userDocRef).then(userDoc => {
                if (!userDoc.exists) {
                    throw "userDoc does not exist"
                }
                transaction.update(userDocRef, {
                    "pre-chronos": firebase.firestore.FieldValue.arrayRemove({ hours, minutes, seconds })
                })
            })
        }).catch(err => {
            console.error(`Error during transaction for deleting chip (either getting doc or updating it): ${err}`)
        })
    }

    /**
     * Push Prechrono obj to database when user submits, i.e when clicks on CREATE button
     * @param {Object} e - Event object
     */
    const pushPrechronoToDb = e => {
        e.preventDefault();

        const form = e.target
        const isSelect = el => el.tagName === "SELECT"
        const selectElements = Array.from(form.elements).filter(isSelect)

        const userDocRef = db.collection("users").doc(user.uid)
        db.runTransaction(transaction => {
            return transaction.get(userDocRef).then(userDoc => {
                if (!userDoc.exists) {
                    throw "userDoc does not exist"
                }
                if (userDoc.data()["pre-chronos"].length >= 5) {
                    window.alert("Sorry, you can't have more than 5 prechronos!\nDelete an existing one to replace it by a new one.")
                    return
                }
                const timeObj = selectElements.reduce((acc, selectEl) => {
                    acc[selectEl.name] = selectEl.value
                    return acc
                }, {})
                transaction.update(userDocRef, {
                    "pre-chronos": firebase.firestore.FieldValue.arrayUnion(timeObj)
                })
            })
        }).catch(err => {
            console.error(`Error during transaction for adding prechrono (either getting doc or updating it): ${err}`)
        })
    }

    /**
     * Determine which chip and which part of it was clicked and call applyChip() or deleteChip() accordingly
     * @param {Object} e - Event
     * @returns {void}
     */
    const handleClick = e => {
        if (e.target.dataset.role === "deleteChip") {
            const chipWrapper = e.target.parentNode.parentNode;
            deleteChip(chipWrapper.dataset);
        }
        if (e.target.dataset.role === "applyChip") {
            // Is the element clicked the 'chipWrapper' or the 'text span' ?
            const chipWrapper = e.target.className === 'mdl-chip__text' ? e.target.parentNode : e.target;

            applyChip(chipWrapper.dataset);
        }
    }



    /**
     * Listen to changes of prechronos in database and set state accordingly
     * @function getPrechronos
     * @returns {Object} - unsubscribe to listener function
     */
    const getPrechronos = () => {
        const usersDocRef = db.collection('users').doc(user.uid)
        const unsubscribe = usersDocRef.onSnapshot(doc => {
            const prechronos = doc.data()["pre-chronos"]
            setPrechronos(() => prechronos)
        })

        return unsubscribe
    }

    /**
     * useEffect that get and set prechronos state when changes occur in database
     */
    useEffect(() => {
        if (!user) return

        const unsubscribe = getPrechronos()

        return () => {
            unsubscribe()
        }
    }, [user])

    /**
     * Create prechronos chips at first render if user is logged in
     * @func
     */
    useEffect(() => {
        if (prechronos) {
            prechronos.forEach(createChip)
        }
    }, [prechronos]);

    // Upgrade DOM at each render to maintain styling of MDL elements
    useEffect(() => {
        componentHandler.upgradeDom()
    })

    if (!user) return null
    return (
        <StyledPreChronos className={isDarkTheme ? "dark" : ""}>
            <h5 className="title">
                Save time by creating your chronos in advance !
                <Icon id="info" className="material-icons">info</Icon>
                        <div className="mdl-tooltip" data-mdl-for="info">
                            5 max
                </div>
            </h5>

            <form className="form" onSubmit={pushPrechronoToDb}>
                <TimeSelects>
                    <select className="mdl-textfield__input" name="hours" id="hours">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                    </select>
                    <label htmlFor="hours">h</label>

                    <select className="mdl-textfield__input" name="minutes" id="minutes">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                        <option value="32">32</option>
                        <option value="33">33</option>
                        <option value="34">34</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                        <option value="44">44</option>
                        <option value="45">45</option>
                        <option value="46">46</option>
                        <option value="47">47</option>
                        <option value="48">48</option>
                        <option value="49">49</option>
                        <option value="50">50</option>
                        <option value="51">51</option>
                        <option value="52">52</option>
                        <option value="53">53</option>
                        <option value="54">54</option>
                        <option value="55">55</option>
                        <option value="56">56</option>
                        <option value="57">57</option>
                        <option value="58">58</option>
                        <option value="59">59</option>
                    </select>
                    <label htmlFor="minutes">min</label>
                    <select className="mdl-textfield__input" name="seconds" id="seconds">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                        <option value="32">32</option>
                        <option value="33">33</option>
                        <option value="34">34</option>
                        <option value="35">35</option>
                        <option value="36">36</option>
                        <option value="37">37</option>
                        <option value="38">38</option>
                        <option value="39">39</option>
                        <option value="40">40</option>
                        <option value="41">41</option>
                        <option value="42">42</option>
                        <option value="43">43</option>
                        <option value="44">44</option>
                        <option value="45">45</option>
                        <option value="46">46</option>
                        <option value="47">47</option>
                        <option value="48">48</option>
                        <option value="49">49</option>
                        <option value="50">50</option>
                        <option value="51">51</option>
                        <option value="52">52</option>
                        <option value="53">53</option>
                        <option value="54">54</option>
                        <option value="55">55</option>
                        <option value="56">56</option>
                        <option value="57">57</option>
                        <option value="58">58</option>
                        <option value="59">59</option>
                    </select>
                    <label htmlFor="seconds">s</label>
                </TimeSelects>
                <div className="create-button-wrap">
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Create</button>
                </div>
            </form>

            <div className={isDarkTheme ? "chips dark" : "chips"} onClick={handleClick}>
                {prechronos
                    ? prechronos.map(createChip)
                    : null
                }
            </div>
        </StyledPreChronos>
    )
}

export default PreChronos;