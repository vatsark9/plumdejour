import { useState } from "react";

function App() {
  const [logs, setLogs] = useState([]);
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const maxChars = 200;

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
    <div className="min-h-screen bg-gray-100 p-5 font-mono">


      <h1>plumdejour</h1>
      <p>Daily log tracker</p>

      <input
        type="text"
        value={input}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= maxChars) {
            setInput(value);
          }
        }}
        maxLength={maxChars}
        placeholder="Enter your log here..."
        style={{ padding: "8px", width: "250px", marginRight: "8px" }}
      />
      <div style={{ fontSize: "12px", color: input.length === maxChars ? "red" : "gray", marginBottom: "8px" }}>
        {maxChars - input.length} characters remaining
      </div>
      <button
  onClick={addLog}
  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
>
  Add Log
</button>


      <div style={{ marginTop: "20px" }}>
        <h2>Your Logs</h2>
<div>
  {logs.length === 0 ? (
    <p className="text-gray-500">No logs yet</p>
  ) : (
    <ul>
      {logs.map((log, index) => (
        <li key={index} className="px-2 py-1 rounded hover:bg-gray-200 transition">
          {log}
        </li>
      ))}
    </ul>
  )}
</div>



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
