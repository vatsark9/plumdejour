
import { useState, useEffect } from "react";
import Header from "./components/Header";
import LogInput from "./components/LogInput";
import LogList from "./components/LogList";
import Summary from "./components/Summary";
import Footer from "./components/Footer";

function App() {
  const [logs, setLogs] = useState(() => {
    // Initialize state with data from localStorage
    const savedLogs = localStorage.getItem("dailyLogs");
    return savedLogs ? JSON.parse(savedLogs) : [];
  });
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const maxChars = 200;

  useEffect(() => {
    document.title = "plumdejour - Daily Log Tracker";
  }, []);

  useEffect(() => {
    // Save logs to localStorage whenever logs change
    localStorage.setItem("dailyLogs", JSON.stringify(logs));
  }, [logs]);

  const addLog = () => {
    if (input.trim()) {
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
      <Header />
      <LogInput maxChars={maxChars} input={input} setInput={setInput} addLog={addLog} />
      <LogList logs={logs} />
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
        <Summary summary={summary} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
