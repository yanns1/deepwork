import React, { useContext } from "react"
import { AuthContext } from '../context/AuthContext.jsx';

const Label = ({
    label,
    setLabel
}) => {
    // Contexts
    const { userCred } = useContext(AuthContext)

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === 'label') {
            setLabel(() => value);
        }
    }

    if (!userCred) return null
    return (
        <div className="label-input mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" name="label" pattern="[a-z_]+" title="Only lowercases and underscores are valid. Don't let white spaces !" placeholder="Label..." value={label} onChange={handleChange} />
            <label className="mdl-textfield__label" htmlFor="label"></label>
        </div>
    )
}

export default Label