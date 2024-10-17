import React from 'react';

const ToggleButton = ({ value, setValue }) => {

    return (
            <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={value}
                        onChange={setValue}
                    />
                    <div className={`w-14 h-8 rounded-full transition-colors duration-300 ${value ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                    <div className={`absolute w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 transform ${value ? 'translate-x-7' : 'translate-x-1'}`}></div>
                </label>
            </div>
    );
};

export default ToggleButton;