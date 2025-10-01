import { useState ,useEffect} from "react";

function App() {
   const [logs, setLogs] = useState(() => {
    const savedLogs = localStorage.getItem("dailyLogs");
    return savedLogs ? JSON.parse(savedLogs) : [];
  });

  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const maxChars = 200;

 
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

    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex flex-col items-center justify-start p-8 font-sans">
      <h1 className="text-4xl font-bold text-indigo-700 mb-2">plumdejour</h1>
      <p className="text-gray-700 text-lg mb-6">Daily log tracker</p>

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
          } mb-4` }
        >
          {maxChars - input.length} characters remaining
        </div>

        <button
          onClick={addLog}
          className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
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

      <div className="w-full max-w-md mt-6">
        <div className="flex gap-4">
          <button
            onClick={generateSummary}
            className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Generate Summary
          </button>
          <button
            onClick={clearLogs}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Clear Logs
          </button>
        </div>

        {summary && (
          <div className="mt-6 bg-white shadow-md rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">
              Summary
            </h2>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}
      </div>
localstorage
    
    </div>

      <footer className="mt-10 text-center text-gray-600">
  Made with 💜 for Hacktoberfest
</footer>


    </div>
  );
}

export default App;
