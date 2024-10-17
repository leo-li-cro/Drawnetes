import { useNodesData } from '@xyflow/react';
import { useState } from 'react';

import './styles/tooltipStyles.css';

function DaemonSetTooltip({id}) {
    const node = useNodesData(id);
    const [name, setName] = useState(node.data.name);
    const [image, setImage] = useState(node.data?.image);

    const onNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
        node.data.name = newName;
    }
    const onImageChange = (event) => {
        const newImage = event.target.value;
        setImage(newImage);
        node.data.image = newImage;
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
                <label className="mx-1 text-sm">Image:</label>
                <input
                type="text"
                value={image}
                onChange={onImageChange}
                className="border border-gray-300 text-sm rounded-lg block w-full p-2" />
            </div>
        </div>
    );
}

export default DaemonSetTooltip;