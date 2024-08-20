import { useCallback } from 'react';
import { useReactFlow } from "@xyflow/react";

let nodeId = 30;

function AddTextPreviewButton() {

  const reactFlowInstance = useReactFlow();

  const onClick = useCallback(() => {
    const id = `${++nodeId}`;

    const newNode = {
      id,
      type: 'textPreview',
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `Node ${id}`,
        value: 'Node added: '
      },
    };
    reactFlowInstance.addNodes(newNode);
  }, []);

  return (
      <button onClick={onClick}>Text preview</button>
  );
}

export default AddTextPreviewButton;