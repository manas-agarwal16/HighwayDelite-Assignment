import React from 'react';

const Input : React.FC<{value: string, setValue: React.Dispatch<React.SetStateAction<string>>, placeholder: string}> = ({value , setValue, placeholder}) => {
    return (
        <fieldset className="border border-gray-300 rounded-lg px-3">
            <legend className="text-sm text-gray-500 px-1 font-medium">{placeholder}</legend>
            <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-1 outline-none border-none focus:outline-none focus:ring-0 bg-gray-100"
            required
            />
        </fieldset>
    );
}

export default Input;
