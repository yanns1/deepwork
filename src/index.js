import './styles/index.scss';
import './scripts/db.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js')
//             .then(registration => {
//                 console.log(`Service worker has been successfully registered at scope: ${registration.scope}`)
//             })
//             .catch(err => console.error(`Service worker registration failed: ${err}`))
//     })
// } else {
//     console.log('Service worker failed to register');
// }



