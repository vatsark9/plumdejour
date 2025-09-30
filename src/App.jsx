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
      <button
  onClick={addLog}
  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
>
  Add Log
</button>


      <div style={{ marginTop: "20px" }}>
        <h2>Your Logs</h2>
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: "20px" }}>
      <button
  onClick={generateSummary}
  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition ml-2"
>
  Generate Summary
</button>

<button
  onClick={clearLogs}
  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition ml-2"
>
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
