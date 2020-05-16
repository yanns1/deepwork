import React from "react"
import { useAuth } from '../context/AuthContext.jsx';

const Label = ({
    label,
    setLabel
}) => {
    const { user } = useAuth();

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === 'label') {
            setLabel(() => value);
        }
    }

    if (!user) return null
    return (
        <div className="label-input mdl-textfield mdl-js-textfield">
            <input className="mdl-textfield__input" type="text" name="label" pattern="[a-z_]+" title="Only lowercases and underscores are valid. Don't let white spaces !" placeholder="Label..." value={label} onChange={handleChange} />
            <label className="mdl-textfield__label" htmlFor="label"></label>
        </div>
    )
}

export default Label