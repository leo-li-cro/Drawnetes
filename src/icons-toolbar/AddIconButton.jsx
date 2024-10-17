import { useCallback } from 'react';
import { useReactFlow } from "@xyflow/react";

let nodeId = 1;

function AddIconButton({ iconName }) {
  const reactFlowInstance = useReactFlow();

  const imgSrc = `icons/${iconName}.png`;

  const onClick = useCallback(() => {
    const id = `${nodeId++}`;

    const newNode = {
      id,
      type: 'icon',
      position: {
        x: Math.random() * 500 + 500,
        y: Math.random() * 200 + 300
      },
      data: {
        resourceType: ""+iconName,
        name: ""
      },
    };
    reactFlowInstance.addNodes(newNode);
  }, [reactFlowInstance, iconName]);

  return (
    <div
    className='w-20 h-30 flex-1 bg-pink-600 hover:bg-pink-500 text-white p-3 rounded text-center items-center cursor-pointer'
    onClick={onClick}>
      <img
        src={imgSrc}
        alt="icon"
      />
      <label className='block text-xs font-medium leading-tight pt-1 cursor-pointer'> { iconName } </label>
    </div>
  );
}

export default AddIconButton;