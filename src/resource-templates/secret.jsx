
const secretString = ({name, data}) => `
apiVersion: v1
kind: Secret
metadata:
  name: ${name}
type: Opaque
data:
${data}`;

export default secretString;