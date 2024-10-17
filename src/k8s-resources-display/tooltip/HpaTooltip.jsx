import { useNodesData } from '@xyflow/react';
import { useState } from 'react';

import './styles/tooltipStyles.css';

function HpaTooltip({id}) {
    const node = useNodesData(id);
    const [minReplicas, setMinReplicas] = useState(node.data?.minReplicas);
    const [maxReplicas, setMaxReplicas] = useState(node.data?.maxReplicas);
    const [cpuUtilization, setCpuUtilization] = useState(node.data?.cpuUtilization);

    const onMinReplicasChange = (event) => {
        const newMinReplicas = event.target.value;
        setMinReplicas(newMinReplicas);
        node.data.minReplicas = newMinReplicas;
    }

    const onMaxReplicasChange = (event) => {
        const newMaxReplicas = event.target.value;
        setMaxReplicas(newMaxReplicas);
        node.data.maxReplicas = newMaxReplicas;
    }

    const onCpuUtilizationChange = (event) => {
        const newCpuUtilization = event.target.value;
        setCpuUtilization(newCpuUtilization);
        node.data.cpuUtilization = newCpuUtilization;
    }

    return (
        <div
        className="w-48 absolute bg-white p-1.5 rounded-md shadow-md"
        style={{ transform: 'translate(35%, -70%)' }}>
            <div>
                <label className="mx-1 text-sm">Min replicas:</label>
                <input
                type="number"
                value={minReplicas}
                onChange={onMinReplicasChange}
                className="no-spin border border-gray-300 text-sm rounded-lg block w-full p-2" />
            </div>
            <div>
                <label className="mx-1 text-sm">Max replicas:</label>
                <input
                type="number"
                value={maxReplicas}
                onChange={onMaxReplicasChange}
                className="no-spin border border-gray-300 text-sm rounded-lg block w-full p-2" />
            </div>
            <div>
                <label className="mx-1 text-sm">Desired CPU utilization [%]</label>
                <input
                type="number"
                value={cpuUtilization}
                onChange={onCpuUtilizationChange}
                className="no-spin border border-gray-300 text-sm rounded-lg block w-full p-2" />
            </div>
        </div>
    );
}

export default HpaTooltip;