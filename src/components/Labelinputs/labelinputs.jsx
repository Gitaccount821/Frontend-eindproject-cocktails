import React from 'react';

const InputField = ({ id, type, value, onChange, label, placeholder }) => {
    return (
        <label htmlFor={id}>
            {label}
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </label>
    );
};

export default InputField;
