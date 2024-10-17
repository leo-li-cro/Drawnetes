
const hpaString = (tooltipValues, resourceData) => `
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  namespace: my-namespace
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: ${resourceData?.resourceKind}
    name: ${resourceData?.resourceName}
  minReplicas: ${tooltipValues.minReplicas}
  maxReplicas: ${tooltipValues.maxReplicas}
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: ${tooltipValues.cpuUtilization}`

export default hpaString;