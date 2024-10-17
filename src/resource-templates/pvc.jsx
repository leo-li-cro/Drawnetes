
const pvcString = ({name, storage}) => `
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: ${name}
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: ${storage}`;

export default pvcString;