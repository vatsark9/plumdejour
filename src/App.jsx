import { useState, useEffect } from "react";
import Header from "./components/Header";
import LogInput from "./components/LogInput";
import LogList from "./components/LogList";
import Summary from "./components/Summary";
import Footer from "./components/Footer";

function App() {
  const [logs, setLogs] = useState([]);
  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const maxChars = 200;

  useEffect(() => {
    document.title = "plumdejour - Daily Log Tracker";
  }, []);

  useEffect(() => {
    // Load logs from localStorage on initial render
    const savedLogs = localStorage.getItem("dailyLogs");
    if (savedLogs) {
      try {
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
      } catch (error) {
        console.error("Error parsing saved logs:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Only save to localStorage after initial load is complete
    if (isLoaded) {
      localStorage.setItem("dailyLogs", JSON.stringify(logs));
    }
  }, [logs, isLoaded]);
  
  const addLog = () => {
    if (input.trim()) {
      const newLog = {
        text: input.trim(),
        id: Date.now() + Math.random(),
        // Ensure timestamp is used, as the LogList Canvas file relies on it for display
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5 font-mono">
      <Header />
      <LogInput
        maxChars={maxChars}
        input={input}
        setInput={setInput}
        addLog={addLog}
      />
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