import { useNodesData } from '@xyflow/react';
import { useState } from 'react';

import './styles/tooltipStyles.css';
import ToggleButton from './ToggleButton';

function JobTooltip({id}) {
    const node = useNodesData(id);
    const [name, setName] = useState(node.data.name);
    const [image, setImage] = useState(node.data?.image);
    const [command, setCommand] = useState(node.data?.command);
    const [completions, setCompletions] = useState(node.data?.completions);
    const [parallelism, setParallelism] = useState(false);

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
    const onCommandChange = (event) => {
        const newCommand = event.target.value;
        setCommand(newCommand);
        node.data.command = newCommand;
    }
    const onCompletionsChange = (event) => {
        const newCompletions = event.target.value;
        setCompletions(newCompletions);
        node.data.completions = newCompletions;
    }
    const onParallelismChange = () => {
        node.data.parallelism = !parallelism;
        setParallelism(!parallelism);
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
            <div>
                <label className="mx-1 text-sm">Command:</label>
                <input
                type="text"
                value={command}
                onChange={onCommandChange}
                className="no-spin border border-gray-300 text-sm rounded-lg block w-full p-2" />
            </div>
            <div>
                <label className="mx-1 text-sm">Number of executions:</label>
                <input
                type="number"
                value={completions}
                onChange={onCompletionsChange}
                className="no-spin border border-gray-300 text-sm rounded-lg block w-full p-2" />
            </div>
            <div className='flex items-center my-2'>
                <label className="mx-1 mr-6 text-sm">Parallelism:</label>
                <ToggleButton value={parallelism} setValue={onParallelismChange} />
            </div>
        </div>
    );
}

export default JobTooltip;