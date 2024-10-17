import { useReactFlow } from "@xyflow/react";
import { useGlobalContext } from '../GlobalContext';
import ResourceItem from "./ResourceItem";


function DisplayK8sResources() {
    const { getNodes } = useReactFlow();
    const nodes = getNodes();

    const { selectedNodeTooltipId, setSelectedNodeTooltipId } = useGlobalContext();

    const handleItemClick = (nodeId) => {
        if (selectedNodeTooltipId === nodeId)
            setSelectedNodeTooltipId(null);
        else setSelectedNodeTooltipId(nodeId);
    }

    return (
        <div className="w-full h-full mt-1 self-start px-4">
            <h3 className="mb-1">Resources</h3>
            <div className="border border-gray h-56 rounded overflow-y-auto">
                <ul>
                    {nodes.map((node) => (
                        <li
                        key={node.id}
                        onClick={() => handleItemClick(node.id)}
                        className={`flex justify-center items-center border ${
                            selectedNodeTooltipId === node.id ? 'border-blue-600' : ''
                        }`}>
                            <ResourceItem id={node.id}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DisplayK8sResources;