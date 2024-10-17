import { useNodesData } from '@xyflow/react';
import { useState } from 'react';

import './styles/tooltipStyles.css';

function PersistentVolumeClaimTooltip({id}) {
    const node = useNodesData(id);
    const [name, setName] = useState(node.data.name);
    const [storage, setStorage] = useState(node.data?.storage);

    const onNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
        node.data.name = newName;
    }
    const onStorageChange = (event) => {
        const newStorage = event.target.value;
        setStorage(newStorage);
        node.data.storage = newStorage;
    }

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
                <label className="mx-1 text-sm">Storage:</label>
                <input
                type="number"
                value={storage}
                onChange={onStorageChange}
                className="border border-gray-300 text-sm rounded-lg block w-full p-2" />
            </div>
        </div>
    );
}

export default PersistentVolumeClaimTooltip;