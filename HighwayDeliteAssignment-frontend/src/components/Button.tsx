import React from 'react';

const Button : React.FC<{placeholder : string}> = ({placeholder}) => {
    return (
        <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold"
            >
            {placeholder}
        </button>
    );
}

export default Button;
