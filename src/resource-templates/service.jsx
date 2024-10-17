
const serviceString = ({name, type, selector, port}) => `
apiVersion: v1
kind: Service
metadata:
  name: ${name}
  namespace: my-namespace
spec:
  type: ${type}
  selector:
    ${selector}
  ports:
    - protocol: TCP
      port: ${port}
      targetPort: 9376`;

export default serviceString;