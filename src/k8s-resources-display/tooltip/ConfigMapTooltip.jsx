import { useNodesData } from '@xyflow/react';
import { useState, useEffect } from 'react';

import './styles/tooltipStyles.css';

function ConfigMapTooltip({id}) {
    const node = useNodesData(id);
    const [name, setName] = useState(node.data.name);
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    const [map, setMap] = useState(new Map());
    const [dropdownOptions, setDropdownOptions] = useState([]);

    const onNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
        node.data.name = newName;
    }
    const addKeyValuePair = () => {
        if (key && value) {
            setMap(previousMap => {
                const updatedMap = new Map(previousMap);
                updatedMap.set(key, value);
                node.data.map = updatedMap;
                return updatedMap;
            })
            setKey("");
            setValue("");
        }
    }

    useEffect(() => {
        const keyValuePairs = Array.from(map).map(([key, value]) => `${key} - ${value}`);
        setDropdownOptions(keyValuePairs);
      }, [map]);

    return (
        <div
        className="w-48 absolute bg-white p-1.5 rounded-md shadow-md"
        style={{ transform: 'translate(35%, -70%)' }}>
            <div>
                <label className="mx-1 text-sm">Name:</label>
                <input
                type="text"
                value={name}
                onChange={onNameChange}
                className="border border-gray-300 text-sm rounded-lg block w-full p-2" />
            </div>
            <div>
                <div className='grid grid-cols-2 gap-1 my-1'>
                    <label className="mx-1 text-sm">Key:</label>
                    <label className="mx-1 text-sm">Value:</label>
                    <input
                    type="text"
                    value={key}
                    onChange={e => setKey(e.target.value)}
                    className="border border-gray-300 text-sm rounded-lg block w-full p-2" />
                    <input
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    className="border border-gray-300 text-sm rounded-lg block w-full p-2" />
                </div>
            </div>
            <div className='flex justify-center items-center my-2'>
                <button
                className="text-white bg-blue-600 hover:bg-blue-500 px-2 py-1 rounded-2xl"
                onClick={addKeyValuePair}>
                    Add key-value pair
                </button>
            </div>
            <div className="flex justify-center items-center my-2">
                <select className="border border-gray-300 text-sm rounded-lg block w-full p-2">
                    <option value="">Key-value pairs</option>
                        {dropdownOptions.map((keyOption, index) => (
                        <option key={index} value={keyOption}>
                            {keyOption}
                        </option>
                        ))}
                </select>
            </div>
        </div>
    );
}

export default ConfigMapTooltip;