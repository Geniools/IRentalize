import React from 'react';

export default function InputField(props) {
    if (props.order === "label-first" || props.order === undefined) {
        return (
            <div className="input-field-container">
                <label className={props.labelClassName} htmlFor={props.name}>{props.label}</label>
                <input
                    className={props.className}
                    type={props.type}
                    checked={props.checked}
                    name={props.name}
                    id={props.name}
                    value={props.value}
                    required={props.required}
                    minLength={props.minLength}
                    placeholder={props.placeholder}
                    onChange={props.onChange}/>
            </div>
        )
    } else if (props.order === "input-first") {
        return (
            <div className="input-field-container">
                <input
                    className={props.className}
                    type={props.type}
                    checked={props.checked}
                    name={props.name}
                    id={props.name}
                    value={props.value}
                    required={props.required}
                    minLength={props.minLength}
                    placeholder={props.placeholder}
                    onChange={props.onChange}/>
                <label htmlFor={props.name}>{props.label}</label>
            </div>
        )
    }
}