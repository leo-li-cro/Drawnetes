import { useCallback } from 'react';
import { useReactFlow } from "@xyflow/react";

let nodeId = 20;

function AddTextInputButton() {

  const reactFlowInstance = useReactFlow();

  const onClick = useCallback(() => {
    const id = `${++nodeId}`;

    const newNode = {
      id,
      type: 'textInput',
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `Node ${id}`,
        value: ''
      },
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

  return (
      <button onClick={onClick}>Text input</button>
  );
}

export default AddTextInputButton;