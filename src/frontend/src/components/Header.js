import React from 'react';
import Icon from "./Icon";

export default function Header() {
    return (
        <header>
            <Icon/>
            <select>
                <option value="english">English</option>
                <option value="dutch">Nederland</option>
            </select>
        </header>
    );
}
