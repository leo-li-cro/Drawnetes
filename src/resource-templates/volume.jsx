
const volumeString = ({name, property, indentProperty, value}) => `
      volumes:
        - name: ${name}
          ${property}:
            ${indentProperty}: ${value}`;

export default volumeString;