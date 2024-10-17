const replicaSetString = ({name, replicas, selector, image}) => `
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: ${name}
  namespace: my-namespace
spec:
  selector:
    matchLabels:
      ${selector}
  replicas: ${replicas}
  template:
    metadata:
      labels:
        ${selector}
    spec:
      containers:
        - name: my-app
          image: ${image}`;

export default replicaSetString;