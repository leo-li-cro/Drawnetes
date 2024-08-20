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
 
import { GlobalProvider } from './GlobalContext.jsx';

import NumberInput from '../public/not-used-but-useful/NumberInput.jsx';
import ColorPreview from '../public/not-used-but-useful/ColorPreview.jsx';
import LightnessNode from '../public/not-used-but-useful/LightnessNode.jsx';
import Log from '../public/not-used-but-useful/Log.jsx';
import TextInput from '../public/not-used-but-useful/TextInput.jsx';
import TextPreview from '../public/not-used-but-useful/TextPreview.jsx';
import SelectDragToolbar from './select-drag-toolbar/SelectDragToolbar.jsx';
import Util from './util/Util.jsx';
import IconsToolbar from './icons-toolbar/IconsToolbar.jsx';
import Icon from './custom-nodes/Icon.jsx';

import DeletableEdge from '../public/not-used-but-useful/DeletableEdge.jsx';

import '@xyflow/react/dist/style.css';
import './App.css';
 
import initialNodes from './nodes.jsx';
import initialEdges from './edges.jsx';
import SetUtil from './util/SetUtil.jsx';
import { UtilProvider } from './util/UtilContext.jsx';

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isSelect, setIsSelect] = useState(true);
  const [logs, setLogs] = useState([]);

  const nodeTypes = {
    numberInput: NumberInput,
    colorPreview: ColorPreview,
    lightnessNode: LightnessNode,
    log: Log,
    textInput: TextInput,
    textPreview: TextPreview,
    toolbar: SelectDragToolbar,
    icon: Icon
  };
  const edgeTypes = {
    deletableEdge: DeletableEdge
  };
 
  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
    const sourceNodeId = params.source;
    const targetNodeId = params.target;
    const sourceNode = nodes.filter((node) => node.id === sourceNodeId)[0];
    const targetNode = nodes.filter((node) => node.id === targetNodeId)[0];
    const newLog = `${sourceNode.data.name}(${sourceNodeId}) connected to ${targetNode.data.name}(${targetNodeId})`;
    setLogs((prev) => [...prev, newLog]);
  },[nodes, setEdges]);

  const toggleSelect = () => {
    setIsSelect((prev) => !prev);
  };

  const isDeleteKeyPressed = useKeyPress('Delete');

  const deleteSelectedNodes = useCallback(() => {
    const selectedNodes = nodes.filter((node) => node.selected);

    if (selectedNodes.length > 0) {
      const nodeIdsToRemove = selectedNodes.map((node) => node.id);
      console.log(nodes);
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
        edgeTypes={edgeTypes}
        colorMode='light'
        panOnDrag={!isSelect}
        selectionOnDrag={isSelect}
        selectionMode='partial'
        proOptions={{ hideAttribution: true }}
      >
        <Panel position="top-left">

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

/*
  add this as a parameter to the div in return statement: oncClick={onCanvasClick}
  const onCanvasClick = useCallback((event) => {
    const { clientX, clientY } = event;
    const position = {
      x: clientX,
      y: clientY,
    };

    const newNode = {
      id: (nodes.length + 30).toString(),
      position,
      data: { label: `Node ${nodes.length + 30}` },
    };

    setNodes((nds) => nds.concat(newNode));
  }, []);*/