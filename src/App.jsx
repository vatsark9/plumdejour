import { useState, useEffect } from "react";
import Header from "./components/Header";
import LogInput from "./components/LogInput";
import LogList from "./components/LogList";
import Summary from "./components/Summary";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [logs, setLogs] = useState([]);
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const maxChars = 200;

  useEffect(() => {
    document.title = "plumdejour - Daily Log Tracker";
  }, []);

  useEffect(() => {
    // Load logs from localStorage on initial render
    const savedLogs = localStorage.getItem("dailyLogs");
    if (savedLogs) {
      const parsedLogs = JSON.parse(savedLogs);
      // Handle migration from old string format to new object format
      const migratedLogs = parsedLogs.map((log) => {
        if (typeof log === "string") {
          return {
            id: Date.now() + Math.random(),
            text: log,
            timestamp: new Date().toISOString(),
          };
        }
        return log;
      });
      setLogs(migratedLogs);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dailyLogs", JSON.stringify(logs));
  }, [logs]);

  const addLog = () => {
    if (input.trim()) {
      const newLog = {
        id: Date.now() + Math.random(),
        text: input.trim(),
        timestamp: new Date().toISOString(),
      };
      setLogs([...logs, newLog]);
      setInput("");
    }
  };

  const updateLog = (id, newText) => {
    setLogs(
      logs.map((log) =>
        log.id === id
          ? { ...log, text: newText, timestamp: new Date().toISOString() }
          : log
      )
    );
    if (summary) {
      setSummary("");
    }
  };

  const generateSummary = () => {
    if (logs.length > 0) {
      const summaryText = logs.map((log) => log.text).join(". ") + ".";
      setSummary(summaryText);
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
      <LogInput
        maxChars={maxChars}
        input={input}
        setInput={setInput}
        addLog={addLog}
      />
      <LogList logs={logs} updateLog={updateLog} />
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
