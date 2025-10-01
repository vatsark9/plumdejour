import { useState, useEffect } from "react";

function App() {
  const [logs, setLogs] = useState([]);
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const maxChars = 200;

  useEffect(() => {
    document.title = "plumdejour - Daily Log Tracker";
  }, []);

  useEffect(() => {
    localStorage.setItem("dailyLogs", JSON.stringify(logs));
  }, [logs]);

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
    localStorage.removeItem("dailyLogs");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5 font-mono">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-purple-600">plumdejour</h1>
        <p className="text-lg text-gray-600">Your Daily Log Tracker</p>
      </header>

      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
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
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <div
          className={`text-sm ${
            input.length === maxChars ? "text-red-500" : "text-gray-500"
          } mb-4`}
        >
          {maxChars - input.length} characters remaining
        </div>
        <button
          onClick={addLog}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          Add Log
        </button>
      </div>

      <div className="w-full max-w-md mt-8 bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">Your Logs</h2>
        {logs.length > 0 ? (
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {logs.map((log, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded-lg">
                {log}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No logs added yet.</p>
        )}
      </div>

      <div className="w-full max-w-md mt-6">
        <div className="flex gap-4">
          <button
            onClick={generateSummary}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Generate Summary
          </button>
          <button
            onClick={clearLogs}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition ml-2"
          >
            Clear Logs
          </button>
        </div>
        {summary && (
          <div className="mt-6 bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">Summary</h2>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}
      </div>

      <footer className="mt-10 text-center text-gray-600">
        Made with 💜 for Hacktoberfest
      </footer>
    </div>
  );
}

export default App;


