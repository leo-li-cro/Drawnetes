import { Handle, useNodes } from '@xyflow/react';
import { useGlobalContext } from '../GlobalContext';

import ServiceTooltip from '../k8s-resources-display/tooltip/ServiceTooltip';
import DeploymentTooltip from '../k8s-resources-display/tooltip/DeploymentTooltip';
import StatefulSetTooltip from '../k8s-resources-display/tooltip/StatefulSetTooltip';
import IngressTooltip from '../k8s-resources-display/tooltip/IngressTooltip';
import JobTooltip from '../k8s-resources-display/tooltip/JobTooltip';
import PersistentVolumeTooltip from '../k8s-resources-display/tooltip/PersistentVolumeTooltip';
import PersistentVolumeClaimTooltip from '../k8s-resources-display/tooltip/PersistentVolumeClaimTooltip';
import CronJobTooltip from '../k8s-resources-display/tooltip/CronJobTooltip';
import ReplicaSetTooltip from '../k8s-resources-display/tooltip/ReplicaSetTooltip';
import DaemonSetTooltip from '../k8s-resources-display/tooltip/DaemonSetTooltip';
import ConfigMapTooltip from '../k8s-resources-display/tooltip/ConfigMapTooltip';
import HpaTooltip from '../k8s-resources-display/tooltip/HpaTooltip';
import SecretTooltip from '../k8s-resources-display/tooltip/SecretTooltip';

import validConnections from './validConnections';

function Icon(props) {
  const { id, data, selected } = props;
  const nodeType = data.resourceType;
  const nodes = useNodes();
  const imgSrc = `icons/${nodeType}.png`;

  const { selectedNodeTooltipId, setSelectedNodeTooltipId } = useGlobalContext();

  const handleDoubleClick = () => {
    if (id === selectedNodeTooltipId)
      setSelectedNodeTooltipId(null);
    else setSelectedNodeTooltipId(id);
  }

  const renderTooltipByNodeType = () => {
    switch(nodeType) {
      case 'deployment':
        return <DeploymentTooltip id={id}/>
      case 'service':
        return <ServiceTooltip id={id}/>
      case 'stateful set':
        return <StatefulSetTooltip id={id}/>
      case 'replica set':
        return <ReplicaSetTooltip id={id}/>
      case 'daemon set':
        return <DaemonSetTooltip id={id}/>
      case 'autoscaling':
        return <HpaTooltip id={id}/>
      case 'ingress':
        return <IngressTooltip id={id}/>
      case 'job':
        return <JobTooltip id={id}/>
      case 'cronjob':
        return <CronJobTooltip id={id}/>
      case 'secret':
        return <SecretTooltip id={id}/>
      case 'config map':
        return <ConfigMapTooltip id={id}/>
      case 'persistent volume':
        return <PersistentVolumeTooltip id={id}/>
      case 'persistent volume claim':
        return <PersistentVolumeClaimTooltip id={id}/>
      default:
        return null;
    }
  }

  const renderHandles = () => {
    switch(nodeType) {
      case 'job':
      case 'cronjob':
        break;
      default:
        return <>
        <Handle id='1' type='target' position='top'
        isValidConnection={(con) => isValidConnection(con)} />
        <Handle id='2' type='target' position='left'
        isValidConnection={(con) => isValidConnection(con)} />
        <Handle id='3' type='source' position='right'
        isValidConnection={(con) => isValidConnection(con)} />
        <Handle id='4' type='source' position='bottom'
        isValidConnection={(con) => isValidConnection(con)} />
      </>
    }
  }

  const isValidConnection = (con) => {
    const sourceId = con.source;
    const sourceNode = nodes.find(node => node.id === sourceId);
    const sourceResourceType = sourceNode.data.resourceType;
    const targetId = con.target;
    const targetNode = nodes.find(node => node.id === targetId);
    const targetResourceType = targetNode.data.resourceType;
    return validConnections[sourceResourceType]?.includes(targetResourceType) || false;
  }

  return (
    <>
    <div
    className={`border-2 ${selected ? 'border-blue-400' : ''} relative bg-white`}
    onDoubleClick={handleDoubleClick}>
      <img src={imgSrc} style={{ width: 60, height: 60 }} />
      {renderHandles()}
    </div>
    {id === selectedNodeTooltipId && renderTooltipByNodeType()}
    </>
  );
}

export default Icon;