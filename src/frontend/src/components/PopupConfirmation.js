import React from "react";

const PopupConfirmation = ({title, message, onConfirm, onCancel}) => {
    return (
        <div className="popup-confirmation">
            <div className="popup-confirmation-content">
                <h1>{title}</h1>
                <p>{message}</p>
                <div className="popup-confirmation-buttons">
                    <button onClick={onConfirm} title="Confirm">Yes</button>
                    <button onClick={onCancel} className="warning" title="Cancel">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default PopupConfirmation;