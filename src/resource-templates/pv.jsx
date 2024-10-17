
const pvString = ({name, storage, volumeMode}) => `
apiVersion: v1
kind: PersistentVolume
metadata:
  name: ${name}
spec:
  capacity:
    storage: ${storage}
  volumeMode: ${volumeMode}
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /data
    type: DirectoryOrCreate`;

export default pvString;