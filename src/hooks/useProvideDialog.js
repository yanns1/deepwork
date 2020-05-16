import { useState } from 'react'
import dialogPolyfill from 'dialog-polyfill';


const useProvideDialog = dialogSel => {
    const [isOpen, setIsOpen] = useState(false)

    /**
     * Show dialog
     * (it's important to get the dialog ref inside the function
     * because trying to get it once in the hook and use it in
     * both show and close functions would not work.
     * Indeed, because the hook is called in the context provider,
     * getting the ref would return null and never update since then)
     */
    const show = () => {
        const dialog = document.querySelector(dialogSel)
        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        dialog.showModal();
        setIsOpen(true)
    }

    /**
     * Close dialog
     * (it's important to get the dialog ref inside the function
     * because trying to get it once in the hook and use it in
     * both show and close functions would not work.
     * Indeed, because the hook is called in the context provider,
     * getting the ref would return null and never update since then)
     */
    const close = () => {
        const dialog = document.querySelector(dialogSel)
        dialog.close();
        setIsOpen(false)
    }

    return { isOpen, show, close }
}

export default useProvideDialog