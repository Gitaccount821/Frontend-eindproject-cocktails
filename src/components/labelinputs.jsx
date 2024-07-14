import React from 'react';

export const PasswordInput = ({ id, value, onChange }) => {
    return (
        <label htmlFor={id}>
            Wachtwoord:
            <input
                type="password"
                id={id}
                value={value}
                onChange={onChange}
                placeholder="Vul hier je wachtwoord in"
            />
        </label>
    );
};

export const UsernameInput = ({ id, value, onChange }) => {
    return (
        <label htmlFor={id}>
            Gebruikersnaam:
            <input
                type="text"
                id={id}
                value={value}
                onChange={onChange}
                placeholder="Vul hier je gebruikersnaam in"
            />
        </label>
    );
};


export const EmailInput = ({ id, value, onChange }) => {
    return (
        <label htmlFor={id}>
            Emailadres:
            <input
                type="email"
                id={id}
                name="email"
                value={value}
                onChange={onChange}
                placeholder="Vul hier je email in"
            />
        </label>
    );
};