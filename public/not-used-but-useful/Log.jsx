
function Log({ logs }) {
  console.log(logs);
  return (
    <div>
        <h2>Connection logs</h2>
        <ul>
            {logs.map((log, index) => (
                <li key={index}>{log}</li>
            ))}
        </ul>
    </div>
  );
}

export default Log;
