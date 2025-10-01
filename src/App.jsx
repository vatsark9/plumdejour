import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import LogInput from "./components/LogInput";
import LogList from "./components/LogList";
import Summary from "./components/Summary";
import Footer from "./components/Footer";

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
    <div className="min-h-screen animated-gradient flex flex-col items-center p-5 font-['Inter'] relative">
      <Header />
      <LogInput
        maxChars={maxChars}
        input={input}
        setInput={setInput}
        addLog={addLog}
      />
      <LogList logs={logs} />
      <div className="w-full max-w-md mt-8 relative z-10">
        <div className="flex gap-4 justify-center">
          <button
            onClick={generateSummary}
            className="btn-ripple bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 glow-on-hover"
          >
            ✨ Generate Summary
          </button>
          <button
            onClick={clearLogs}
            className="btn-ripple bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 glow-on-hover"
          >
            🗑️ Clear Logs
          </button>
        </div>
        <Summary summary={summary} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
