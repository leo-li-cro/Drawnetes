import React, { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Panel,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useKeyPress,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
 
import { GlobalProvider } from './GlobalContext.jsx';
import { UtilProvider } from './util/UtilContext.jsx';

import SelectDragToolbar from './select-drag-toolbar/SelectDragToolbar.jsx';
import IconsToolbar from './icons-toolbar/IconsToolbar.jsx';
import K8sToolbar from './k8s-resources-display/K8sToolbar.jsx';
import Util from './util/Util.jsx';
import SetUtil from './util/SetUtil.jsx';
 
import nodeTypeList from './custom-nodes/nodeTypeList.jsx';

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isSelect, setIsSelect] = useState(true);

  const nodeTypes = nodeTypeList;
 
  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge({...params, animated: true}, eds));
  },[setEdges]);

  const toggleSelect = () => {
    setIsSelect((prev) => !prev);
  };

  const isDeleteKeyPressed = useKeyPress('Delete');

  const deleteSelectedNodes = useCallback(() => {
    const selectedNodes = nodes.filter((node) => node.selected);

    if (selectedNodes.length > 0) {
      const nodeIdsToRemove = selectedNodes.map((node) => node.id);
      setNodes((nds) => nds.filter((node) => !nodeIdsToRemove.includes(node.id)));
      setEdges((eds) =>
        eds.filter(
          (edge) => !nodeIdsToRemove.includes(edge.source) && !nodeIdsToRemove.includes(edge.target)
        )
      );
    }
  }, [nodes, setNodes, setEdges]);

  const deleteSelectedEdges = useCallback(() => {
    const selectedEdges = edges.filter((edge) => edge.selected);

    if (selectedEdges.length > 0) {
      const edgeIdsToRemove = selectedEdges.map((edge) => edge.id);

      setEdges((edges) => edges.filter((edge) => !edgeIdsToRemove.includes(edge.id)));
    }
  }, [edges, setEdges]);

  useEffect(() => {
    if (isDeleteKeyPressed) {
      deleteSelectedNodes();
      deleteSelectedEdges();
    }
  }, [isDeleteKeyPressed, deleteSelectedNodes, deleteSelectedEdges]);

  return (
    <div style={{ width: '100vw', height: '100vh', '': '' }} >
      <GlobalProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        colorMode='light'
        panOnDrag={!isSelect}
        selectionOnDrag={isSelect}
        selectionMode='partial'
        proOptions={{ hideAttribution: true }}
      >
        <Panel position="top-left">
          <K8sToolbar />
        </Panel>
        <Panel position="top-center">
          <IconsToolbar />
        </Panel>
        <Panel position="top-right">
          <UtilProvider>
            <Util />
            <SetUtil />
          </UtilProvider>
        </Panel>
        <Panel position="bottom-center">
          <SelectDragToolbar toggleSelect={toggleSelect} isSelect={isSelect}/>
        </Panel>
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
      </GlobalProvider>
    </div>
  );
}

export default function () {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}