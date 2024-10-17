
const cronJobString = ({ name, schedule, image, command }) => `
apiVersion: batch/v1
kind: CronJob
metadata:
  name: ${name}
  namespace: my-namespace
spec:
  schedule: "${schedule}"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: hello
            image: ${image}
            imagePullPolicy: IfNotPresent
            command: ${command}
          restartPolicy: OnFailure
`;

export default cronJobString;