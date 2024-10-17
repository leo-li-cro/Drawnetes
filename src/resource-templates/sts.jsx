const statefulSetString = ({name, replicas, selector, image, port}) => `
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: ${name}
  namespace: my-namespace
spec:
  selector:
    matchLabels:
      ${selector}
  replicas: ${replicas}
  minReadySeconds: 10
  template:
    metadata:
      labels:
        ${selector}
    spec:
      terminationGracePeriodSeconds: 10
      containers:
        - name: my-app
          image: ${image}
          ports:
            - containerPort: ${port}`;

export default statefulSetString;