/**
 * @file Manages Firestore Database
 */
const dbModule = (function IIFE() {
    console.log('dbModule here!')
    db.enablePersistence()
        .catch(err => {
            if (err.code === 'failed-precondition') {
                // probably multiple tabs open at once
                console.log('persistence failed')
            } else if (err.code === 'unimplemented') {
                // lack of browser support
                console.log('persistence is not available')
            }
        })
})();

export default dbModule;
