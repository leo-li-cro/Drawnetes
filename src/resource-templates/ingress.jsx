
const ingressString = ({name, path, pathType, serviceName}) => `
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${name}
  namespace: my-namespace
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
    http:
      paths:
      - path: ${path}
        pathType: ${pathType}
        backend:
          service:
            name: ${serviceName}
            port:
              number: 80`;

export default ingressString;