const configMapString = ({ name, data }) => `
apiVersion: v1
kind: ConfigMap
metadata:
  name: ${name}
  namespace: my-namespace
data:
${data}`;

export default configMapString;