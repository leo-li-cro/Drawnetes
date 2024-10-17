
const jobString = ({ name, completions, parallelism, image, command }) => `
apiVersion: batch/v1
kind: Job
metadata:
  name: ${name}
  namespace: my-namespace
spec:
  completions: ${completions}${parallelism ? `\n  parallelism: ${completions}` : ''}
  template:
    spec:
      containers:
      - name: pi
        image: ${image}
        command: ${command}
      restartPolicy: Never
  backoffLimit: 4
`;

export default jobString;