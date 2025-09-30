import { useState } from "react";

function App() {
  const [logs, setLogs] = useState([]);
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");

  const addLog = () => {
    if (input.trim() !== "") {
      setLogs([...logs, input]);
      setInput("");
    }
  };

  const generateSummary = () => {
    if (logs.length > 0) {
      setSummary(logs.join(". ") + ".");
    } else {
      setSummary("No logs for today.");
    }
  };

  const clearLogs = () => {
    setLogs([]);
    setSummary("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>plumdejour</h1>
      <p>Daily log tracker</p>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write a log..."
        style={{ padding: "8px", width: "250px", marginRight: "8px" }}
      />
      <button onClick={addLog}>Add Log</button>

      <div style={{ marginTop: "20px" }}>
        <h2>Your Logs</h2>
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={generateSummary}>Generate Summary</button>
        <button onClick={clearLogs} style={{ marginLeft: "10px" }}>
          Clear Logs
        </button>
        {summary && (
          <div style={{ marginTop: "20px" }}>
            <h2>Summary</h2>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
