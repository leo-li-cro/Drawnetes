import { useCallback, useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';

function TextInput({ id }) {
  const { updateNodeData } = useReactFlow();
  const [text, setText] = useState("");

  const onSubmit = useCallback(async (evt) => {
    evt.preventDefault();

    const fetchResponseFromTheBackend = async () => {
      try {
        const res = await fetch('http://localhost:3000/test-endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text })
        });
        const data = await res.json();
        return data.result;
      } catch(error) { console.log("Error") }
    };

    const result = await fetchResponseFromTheBackend();
    updateNodeData(id, { value: result });
  }, [id, text, updateNodeData]);

  const handleTextInput = (evt) => {
    setText(evt.target.value);
  };

  return (
    <div className="text-input">
      <form
        id="form-1"
        className="nodrag"
        onSubmit={onSubmit}>
            <label htmlFor="inputText">{ 'Enter: ' }</label>
            <input
            id="textInput-1"
            type="text"
            className="nodrag"
            onChange={handleTextInput}
            style={{
                backgroundColor: 'white',
                color: 'black',
                border: '1px solid #777',
                padding: '4px',
                borderRadius: '1px'
            }} />
            <button type="submit">Submit</button>
      </form>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default TextInput;
