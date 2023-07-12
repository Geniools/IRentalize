import React from 'react';

export default function InputField(props) {
    if (props.order === "label-first" || props.order === undefined) {
        return (
            <div className="authentication-field">
                <label htmlFor={props.name}>{props.label}</label>
                <input
                    className="authentication-input"
                    type={props.type}
                    checked={props.checked}
                    name={props.name}
                    id={props.name}
                    value={props.value}
                    placeholder={props.placeholder}
                    onChange={props.onChange}/>
            </div>
        )
    } else if (props.order === "input-first") {
        return (
            <div className="authentication-field">
                <input
                    className="authentication-input"
                    type={props.type}
                    checked={props.checked}
                    name={props.name}
                    id={props.name}
                    value={props.value}
                    placeholder={props.placeholder}
                    onChange={props.onChange}/>
                <label htmlFor={props.name}>{props.label}</label>
            </div>
        )
    }
}