import React from "react";

import "./Loader.css";

export default function Loader() {
    return (
        <div className={`${"newtons-cradle"}`}>
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
            <div className="newtons-cradle__dot"></div>
        </div>
    )
}