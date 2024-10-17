const daemonSetString = ({name, selector, image}) => `
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: ${name}
  namespace: my-namespace
spec:
  updateStrategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
  selector:
    matchLabels:
      ${selector}
  template:
    metadata:
      labels:
        ${selector}
    spec:
      containers:
        - name: my-container
          image: ${image}`;

export default daemonSetString;