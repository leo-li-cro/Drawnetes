import { useCallback } from 'react';
import { useReactFlow } from "@xyflow/react";
import { useGlobalContext } from '../GlobalContext';

let nodeId = 1;

function AddIconButton({ iconName, index }) {
  const reactFlowInstance = useReactFlow();
  const { searchResults } = useGlobalContext();

  // Replace 'system-design' with 'k8s'
  const imgSrc = `icons/k8s/${iconName}.png`;

  const onClick = useCallback(() => {
    const id = `${nodeId++}`;

    const newNode = {
      id,
      type: 'icon',
      position: {
        x: Math.random() * 400 + 200,
        y: Math.random() * 400 + 200,
      },
      data: {
        label: `Node ${id}`,
        name: iconName
      },
    };
    reactFlowInstance.addNodes(newNode);
  }, [searchResults, reactFlowInstance]);

  return (
    <div className='w-20 h-30 flex-1 bg-pink-600 text-white p-3 rounded text-center items-center'>
      <img
        className='cursor-pointer'
        src={imgSrc}
        alt="icon"
        onClick={onClick}
      />
      <label className='block text-xs font-medium leading-tight pt-1'> { iconName } </label>
    </div>
  );
}

export default AddIconButton;