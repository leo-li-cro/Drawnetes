import { useCallback, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';

function NumberInput({ id, data }) {
  const { updateNodeData } = useReactFlow();
  const { getNode } = useReactFlow();
  const [number, setNumber] = useState(data.value);

  const onChange = useCallback((evt) => {
    const cappedNumber = Math.round(
      Math.min(255, Math.max(0, evt.target.value)),
    );
    setNumber(cappedNumber);
    updateNodeData(id, { value: cappedNumber });
  }, []);

  return (
    <div className="number-input">
      <div>{data.label}</div>
      <input
        id={`number-${id}`}
        name="number"
        type="number"
        min="0"
        max="255"
        onChange={onChange}
        className="nodrag"
        value={number}
        style={{
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid #777',
          padding: '4px',
          borderRadius: '1px'
        }}
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default NumberInput;
