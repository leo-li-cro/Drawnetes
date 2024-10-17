import { useNodesData } from '@xyflow/react';
import { useState, useEffect } from 'react';

import './styles/tooltipStyles.css';

function ServiceTooltip({id}) {
    const node = useNodesData(id);
    const [name, setName] = useState(node.data.name);
    const [port, setPort] = useState(node.data?.port);
    const [serviceType, setServiceType] = useState('ClusterIP');

    useEffect(() => {
        setServiceType(node.data.serviceType);
    }, [node.data.serviceType]);

    const onNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
        node.data.name = newName;
    }
    const onPortChange = (event) => {
        const newPort = event.target.value;
        setPort(newPort);
        node.data.port = newPort;
    }
    const onTypeChange = (event) => {
        const serviceType = event.target.value;
        setServiceType(serviceType);
        node.data.serviceType = serviceType;
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
                <label className="mx-1 text-sm">Type:</label>
                <select
                id="service-type"
                className="border border-gray-300 text-sm rounded-lg block w-full p-2 focus:ring-blue-500"
                value={serviceType}
                onChange={onTypeChange}>
                    <option value="ClusterIP">Cluster IP</option>
                    <option value="NodePort">Node Port</option>
                    <option value="LoadBalancer">Load Balancer</option>
                    <option value="ExternalName">External Name</option>
                </select>
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

export default ServiceTooltip;