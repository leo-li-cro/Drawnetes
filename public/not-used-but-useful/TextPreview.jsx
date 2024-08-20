import { Handle, useHandleConnections, useNodesData } from '@xyflow/react';

function TextPreview() {
  const connections = useHandleConnections({ type: 'target' });
  const nodeData = useNodesData(connections?.[0]?.source);
  const text = nodeData?.data?.value ?? 'No nodes connected';

  return (
    <div
      className="text-preview"
    >
      { text }
      <Handle type="target" position="left" />
    </div>
  );
}

export default TextPreview;
