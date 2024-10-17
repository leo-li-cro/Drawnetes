import { useNodesData } from '@xyflow/react';
import { useState } from 'react';

import './styles/tooltipStyles.css';

function StatefulSetTooltip({id}) {
    const node = useNodesData(id);
    const [name, setName] = useState(node.data.name);
    const [replicas, setReplicas] = useState(node.data?.replicas);
    const [image, setImage] = useState(node.data?.image);
    const [port, setPort] = useState(node.data?.port);

    const onNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
        node.data.name = newName;
    }
    const onReplicasChange = (event) => {
        const newReplicas = event.target.value;
        setReplicas(newReplicas);
        node.data.replicas = newReplicas;
    }
    const onImageChange = (event) => {
        const newImage = event.target.value;
        setImage(newImage);
        node.data.image = newImage;
    }
    const onPortChange = (event) => {
        const newPort = event.target.value;
        setPort(newPort);
        node.data.port = newPort;
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
                <label className="mx-1 text-sm">Replicas:</label>
                <input
                type="number"
                value={replicas}
                onChange={onReplicasChange}
                className="no-spin border border-gray-300 text-sm rounded-lg block w-full p-2" />
            </div>
            <div>
                <label className="mx-1 text-sm">Image:</label>
                <input
                type="text"
                value={image}
                onChange={onImageChange}
                className="border border-gray-300 text-sm rounded-lg block w-full p-2" />
            </div>
            <div>
                <label className="mx-1 text-sm">Port:</label>
                <input
                type="number"
                value={port}
                onChange={onPortChange}
                className="no-spin border border-gray-300 text-sm rounded-lg block w-full p-2" />
            </div>
        </div>
    );
}

export default StatefulSetTooltip;