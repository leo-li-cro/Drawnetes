import { useNodesData } from '@xyflow/react';
import { useState, useEffect } from 'react';

import './styles/tooltipStyles.css';

function IngressTooltip({id}) {
    const node = useNodesData(id);
    const [name, setName] = useState(node.data.name);
    const [path, setPath] = useState(node.data?.path);
    const [pathType, setPathType] = useState('Prefix');

    useEffect(() => {
        setPathType(node.data.pathType);
    }, [node.data.pathType]);

    const onNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
        node.data.name = newName;
    }
    const onPathChange = (event) => {
        const newPath = event.target.value;
        setPath(newPath);
        node.data.path = newPath;
    }
    const onTypeChange = (event) => {
        const pathType = event.target.value;
        setPathType(pathType);
        node.data.pathType = pathType;
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
                <label className="mx-1 text-sm">Path type:</label>
                <select
                id="service-type"
                className="border border-gray-300 text-sm rounded-lg block w-full p-2 focus:ring-blue-500"
                value={pathType}
                onChange={onTypeChange}>
                    <option value="Prefix">Prefix</option>
                    <option value="Exact">Exact</option>
                </select>
            </div>
            <div>
                <label className="mx-1 text-sm">Path:</label>
                <input
                type="text"
                value={path}
                onChange={onPathChange}
                className="no-spin border border-gray-300 text-sm rounded-lg block w-full p-2" />
            </div>
        </div>
    );
}

export default IngressTooltip;