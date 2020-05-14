import React, { useEffect } from 'react';
import Header from './Header/Header.jsx';
import Music from './Music.jsx';
import Time from './Time.jsx';
import Stats from './Stats.jsx';
import Footer from './Footer.jsx';
import { ThemeContextProvider } from './context/ThemeContext.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';
import GlobalStyles from './styled/GlobalStyles.js';

/**
 * @file Returns the whole app by concatenating all components
 * @requires react
 */
const App = () => {
    /**
     * Set window listeners
     */
    useEffect(() => {
        if (window) {
            const congratulations = document.querySelector('.congratulations-music')
            const pauseCongratulationsMusic = () => {
                congratulations.pause()
             }
            window.addEventListener('keydown', pauseCongratulationsMusic)

            const concentration = document.querySelector('.concentration-music')
            concentration.volume = 0.2
            concentration.loop = true
            const toggleConcentrationMusic = e => {
                if (e.key === "1") {
                    concentration.paused
                    ? concentration.play()
                    : concentration.pause()
                }
            }
            window.addEventListener('keydown', toggleConcentrationMusic)
        } else {
            console.error("window obj not available !")
        }

        return () => {
            window.removeEventListener('keydown', pauseCongratulationsMusic)
            window.removeEventListener('keydown', toggleConcentrationMusic)
        }

    }, [])

    return (
        <>
            <GlobalStyles></GlobalStyles>
            <AuthContextProvider>
                <ThemeContextProvider>
                    <Header />
                    <Music />
                    <Time />
                    <Stats />
                    <Footer />
                </ThemeContextProvider>
            </AuthContextProvider>
        </>
    )
}

export default App;