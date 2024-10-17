
const deploymentString = ({name, replicas, selector, image, port}) => `
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${name}
  namespace: my-namespace
spec:
  replicas: ${replicas}
  selector:
    matchLabels:
      ${selector}
  template:
    metadata:
      labels:
        ${selector}
    spec:
      containers:
        - name: my-app
          image: ${image}
          ports:
            - containerPort: ${port}`;

export default deploymentString;
