const volumeMountString = ({mountPath, name}) => `
          volumeMounts:
            - mountPath: ${mountPath}
              name: ${name}`;

export default volumeMountString;