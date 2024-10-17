
import { useRef } from 'react';
import { useEdges, useNodes, getConnectedEdges } from '@xyflow/react';

import deploymentString from '../resource-templates/deployment';
import statefulSetString from '../resource-templates/sts';
import replicaSetString from '../resource-templates/rs';
import daemonSetString from '../resource-templates/ds';
import hpaString from '../resource-templates/hpa';
import serviceString from '../resource-templates/service';
import ingressString from '../resource-templates/ingress';
import jobString from '../resource-templates/job';
import cronJobString from '../resource-templates/cronjob';
import configMapString from '../resource-templates/cm';
import secretString from '../resource-templates/secret';
import pvString from '../resource-templates/pv';
import pvcString from '../resource-templates/pvc';

import volumeMountString from '../resource-templates/volumeMount';
import volumeString from '../resource-templates/volume';

function CreateManifestButton() {
    const downloadLinkRef = useRef(null);
    const manifestParts = [];
    let selectorId = 1;

    const generateFilenameWithTimestamp = () => {
        const timestamp = extractTimestamp();
        const filename = `manifest_${timestamp}.yaml`;
        return filename;
    }

    const extractTimestamp = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timestamp = `${month}-${day}-${year}_${hours}-${seconds}`;
        return timestamp;
    }

    const downloadMafiestFile = (yamlString) => {
        const file = new Blob([yamlString], { type: "text/yaml" });
        const url = URL.createObjectURL(file);
        downloadLinkRef.current.href = url;
        downloadLinkRef.current.download = generateFilenameWithTimestamp();
        downloadLinkRef.current.click();
        URL.revokeObjectURL(url);
    }

    const nodes = useNodes();
    const edges = useEdges();

    const createManifestYaml = () => {
        nodes.forEach((node) => {
            const connectedEdges = getConnectedEdges([node], edges);
            switch(node.data.resourceType) {
                case "deployment":
                    handleDeployment(node, connectedEdges);
                    break;
                case "stateful set":
                    handleStatefulSet(node, connectedEdges);
                    break;
                case "replica set":
                    handleReplicaSet(node, connectedEdges);
                    break;
                case "daemon set":
                    handleDaemonSet(node, connectedEdges);
                    break;
                case 'autoscaling':
                    handleHpa(node, connectedEdges);
                    break;
                case "service":
                    handleService(node, connectedEdges);
                    break;
                case "ingress":
                    handleIngress(node, connectedEdges);
                    break;
                case "job":
                    handleJob(node);
                    break;
                case "cronjob":
                    handleCronJob(node);
                    break;
                case "config map":
                    handleConfigMap(node);
                    break;
                case "secret":
                    handleSecret(node);
                    break;
                case "persistent volume":
                    handlePersistentVolume(node);
                    break;
                case "persistent volume claim":
                    handlePersistentVolumeClaim(node);
                    break;
                default:
                    console.log("Unknown resources type");
            }
        });
        const finalYaml = manifestParts.join("\n---").trimStart();
        downloadMafiestFile(finalYaml);
    }

    const handleDeployment = (node, connectedEdges) => {
        const selector = handleConnectedService(connectedEdges);
        const volumes = handleVolumes(connectedEdges);
        node.data.selector = selector;
        const tooltipValues = {
            name: node.data.name,
            replicas: node.data.replicas ?? 1,
            selector: node.data.selector,
            image: node.data.image,
            port: node.data.port ?? 80
        }
        const rawYaml = deploymentString(tooltipValues);
        const volumesString = getVolumesString(volumes);
        const yaml = rawYaml + volumesString;
        manifestParts.push(yaml);
    }

    const handleStatefulSet = (node, connectedEdges) => {
        const selector = handleConnectedService(connectedEdges);
        const volumes = handleVolumes(connectedEdges);
        node.data.selector = selector;
        const tooltipValues = {
            name: node.data.name,
            replicas: node.data.replicas ?? 1,
            selector: node.data.selector,
            image: node.data.image,
            port: node.data.port ?? 80
        }
        const rawYaml = statefulSetString(tooltipValues);
        const volumesString = getVolumesString(volumes);
        const yaml = rawYaml + volumesString;
        manifestParts.push(yaml);
    }

    const handleReplicaSet = (node, connectedEdges) => {
        const selector = handleConnectedService(connectedEdges);
        const volumes = handleVolumes(connectedEdges);
        node.data.selector = selector;
        const tooltipValues = {
            name: node.data.name,
            replicas: node.data.replicas ?? 1,
            selector: node.data.selector,
            image: node.data.image
        }
        const rawYaml = replicaSetString(tooltipValues);
        const volumesString = getVolumesString(volumes);
        const yaml = rawYaml + volumesString;
        manifestParts.push(yaml);
    }

    const handleDaemonSet = (node, connectedEdges) => {
        const selector = handleConnectedService(connectedEdges);
        const volumes = handleVolumes(connectedEdges);
        node.data.selector = selector;
        const tooltipValues = {
            name: node.data.name,
            selector: node.data.selector,
            image: node.data.image
        }
        const rawYaml = daemonSetString(tooltipValues);
        const volumesString = getVolumesString(volumes);
        const yaml = rawYaml + volumesString;
        manifestParts.push(yaml);
    }

    const handleHpa = (node, connectedEdges) => {
        const tooltipValues = {
            minReplicas: node.data.minReplicas ?? 1,
            maxReplicas: node.data.maxReplicas ?? 2,
            cpuUtilization: node.data.cpuUtilization
        }
        const resourceData = getHpaResourceData(node, connectedEdges);
        const yaml = hpaString(tooltipValues, resourceData);
        manifestParts.push(yaml);
    }

    const getHpaResourceData = (node, connectedEdges) => {
        const edge = connectedEdges.find((edge) => edge.source === node.id || edge.target === node.id);
        if (edge) {
            if (edge.source === node.id) {
                const resource = nodes.find(node => node.id === edge.target);
                return {
                    resourceKind: getKindByType(resource.data.resourceType),
                    resourceName: resource.data.name
                };
            } else if (edge.target === node.id) {
                const resource = nodes.find(node => node.id === edge.source);
                return {
                    resourceKind: getKindByType(resource.data.resourceType),
                    resourceName: resource.data.name
                };
            }
        }
        connectedEdges.forEach((edge) => {
            if (edge.source === node.id) {
                const node = nodes.find(node => node.id === edge.target);
                return {
                    resourceKind: getKindByType(node.data.resourceType),
                    resourceName: node.data.name
                };
            } else if (edge.target === node.id) {
                const node = nodes.find(node => node.id === edge.source);
                return {
                    resourceKind: getKindByType(node.data.resourceType),
                    resourceName: node.data.name
                };
            }
        })
    }

    const getKindByType = (resourceType) => {
        switch(resourceType) {
            case "deployment":
                return "Deployment";
            case "replica set":
                return "ReplicaSet";
            case "stateful set":
                return "StatefulSet";
            default:
                console.log("This resource isn't supported.");
        }
    }

    const handleConnectedService = (connectedEdges) => {
        const ids = [];
        const services = [];
        const selector = 'app: selector'+selectorId++;
        connectedEdges.forEach((edge) => {
            ids.push(edge.source);
            ids.push(edge.target);
        });
        for (const id of ids) {
            const node = nodes.find(node => node.id === id);
            if (node.data.resourceType === "service") {
                services.push(node);
                break;
            }
        }
        if (services.length > 0) {
            const service = services[0];
            service.data.selector = selector;
        }
        return selector;
    }

    const handleVolumes = (connectedEdges) => {
        const ids = [];
        connectedEdges.forEach((edge) => {
            ids.push(edge.source);
            ids.push(edge.target);
        });
        const cms = [];
        const secrets = [];
        const vols = [];
        const pvcs = [];
        ids.forEach((id) => {
            const node = nodes.find(node => node.id === id);
            const resourceType = node.data.resourceType;
            switch(resourceType){
                case "config map":
                    cms.push(node);
                    break;
                case "secret":
                    secrets.push(node);
                    break;
                case "volume":
                    vols.push(node);
                    break;
                case "persistent volume claim":
                    pvcs.push(node);
                    break;
            }
        });
        const volumeMounts = [];
        const volumes = [];
        processConfigMaps(cms, volumeMounts, volumes);
        processSecrets(secrets, volumeMounts, volumes);
        processVols(vols, volumeMounts, volumes);
        processPvcs(pvcs, volumeMounts, volumes);
        return { volumeMounts, volumes };
    }

    const processConfigMaps = (cms, volumeMounts, volumes) => {
        cms.forEach(cm => {
            volumeMounts.push({
                "name": "config-map-volume",
                "mountPath": "/etc/config"
            });
            volumes.push({
                "name": "config-map-volume",
                "property": "configMap",
                "indentProperty": "name",
                "value": cm.data.name
            });
        });
    }
    const processSecrets = (secrets, volumeMounts, volumes) => {
        secrets.forEach(secret => {
            volumeMounts.push({
                "name": "secret-volume",
                "mountPath": "/etc/secret"
            });
            volumes.push({
                "name": "secret-volume",
                "property": "secret",
                "indentProperty": "secretName",
                "value": secret.data.name
            });
        });
    }
    const processVols = (vols, volumeMounts, volumes) => {
        vols.forEach(vol => {
            volumeMounts.push({
                "name": "hostPath-volume",
                "mountPath": "/mnt/hostPath"
            });
            volumes.push({
                "name": "hostPath-volume",
                "property": "hostPath",
                "indentProperty": "path",
                "value": vol.data.path
            });
        });
    }
    const processPvcs = (pvcs, volumeMounts, volumes) => {
        pvcs.forEach(pvc => {
            volumeMounts.push({
                "name": "pvc-volume",
                "mountPath": "/mnt/pvc"
            });
            volumes.push({
                "name": "pvc-volume",
                "property": "persistentVolumeClaim",
                "indentProperty": "claimname",
                "value": pvc.data.name
            });
        });
    }

    const getVolumesString = (volumes) => {
        let volumesYaml = [];
        for (const volumeMount of volumes.volumeMounts) {
            volumesYaml.push(volumeMountString(volumeMount));
        }
        for (const volume of volumes.volumes) {
            volumesYaml.push(volumeString(volume));
        }
        return volumesYaml.join('');
    }

    const handleService = (node) => {
        const tooltipValues = {
            name: node.data.name,
            type: node.data.serviceType || 'ClusterIP',
            selector: node.data.selector,
            port: node.data.port ?? 80
        }
        const yaml = serviceString(tooltipValues);
        manifestParts.push(yaml);
    }

    const handleIngress = (node, connectedEdges) => {
        const serviceName = extractServiceName(connectedEdges);
        const tooltipValues = {
            name: node.data.name,
            path: node.data.path,
            pathType: node.data.pathType,
            serviceName: serviceName
        }
        const yaml = ingressString(tooltipValues);
        manifestParts.push(yaml);
    }

    const extractServiceName = (connectedEdges) => {
        const ids = [];
        const serviceNames = [];
        connectedEdges.forEach((edge) => {
            ids.push(edge.source);
            ids.push(edge.target);
        });
        ids.forEach((id) => {
            const node = nodes.find(node => node.id === id);
            if (node.data.resourceType === "service")
                serviceNames.push(node.data.name);
        });
        return serviceNames?.[0];
    }

    const handleJob = (node) => {
        const tooltipValues = {
            name: node.data.name,
            completions: node.data.completions,
            image: node.data.image,
            command: node.data.command,
            parallelism: node.data.parallelism
        }
        const yaml = jobString(tooltipValues);
        manifestParts.push(yaml);
    }

    const handleCronJob = (node) => {
        const tooltipValues = {
            name: node.data.name,
            schedule: node.data.schedule,
            image: node.data.image,
            command: node.data.command
        }
        const yaml = cronJobString(tooltipValues);
        manifestParts.push(yaml);
    }

    const handleConfigMap = (node) => {
        const map = node.data.map;
        let mapString = '';
        map?.forEach((value, key) => {
            mapString += `  ${key}: ${value}\n`;
        });
        mapString = mapString.slice(0, -1);
        const tooltipValues = {
            name: node.data.name,
            data: mapString
        }
        const yaml = configMapString(tooltipValues);
        manifestParts.push(yaml);
    }

    const handleSecret = (node) => {
        const map = node.data.map;
        let mapString = '';
        map?.forEach((value, key) => {
            mapString += `  ${key}: ${value}\n`;
        });
        mapString = mapString.slice(0, -1);
        const tooltipValues = {
            name: node.data.name,
            data: mapString
        }
        const yaml = secretString(tooltipValues);
        manifestParts.push(yaml);
    }

    const handlePersistentVolume = (node) => {
        const tooltipValues = {
            name: node.data.name,
            storage: node.data.storage,
            volumeMode: node.data.volumeMode
        }
        const yaml = pvString(tooltipValues);
        manifestParts.push(yaml);
    }

    const handlePersistentVolumeClaim = (node) => {
        const tooltipValues = {
            name: node.data.name,
            storage: node.data.storage
        }
        const yaml = pvcString(tooltipValues);
        manifestParts.push(yaml);
    }

    return (
        <>
            <button
            className="mb-2 text-white bg-pink-600 hover:bg-pink-500 px-2 py-1 rounded-2xl"
            onClick={createManifestYaml}>
                Create manifest
            </button>
            <a ref={downloadLinkRef} style={{ display: 'none' }}>Download</a>
        </>
    );
  }
  
  export default CreateManifestButton;
  