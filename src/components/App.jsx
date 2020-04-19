import React from 'react';
import Header from './Header/Header.jsx';
import Music from './Music.jsx';
import CurrentTime from './CurrentTime.jsx';
import Chronos from './Chronos.jsx';
import Stats from './Stats.jsx';
import Footer from './Footer.jsx';
import { ThemeContextProvider } from './context/ThemeContext.jsx';
import { AuthContextProvider } from './context/AuthContext.jsx';

/**
 * @file Returns the whole app by concatenating all components
 * @requires react
 */
function App() {
    return (
        <AuthContextProvider>
            <ThemeContextProvider>
                <Header />
                <Music />
                <CurrentTime />
                <Chronos />
                <Stats />
                <Footer />
            </ThemeContextProvider>
        </AuthContextProvider>
    )
}

export default App;