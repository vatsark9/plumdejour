import { useState, useEffect } from "react";
import Header from "./components/Header";
import LogInput from "./components/LogInput";
import OpenAI from "openai";
import LogList from "./components/LogList";
import Summary from "./components/Summary";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const client = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const [logs, setLogs] = useState(() => {
    // Initialize state with data from localStorage
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
      return migratedLogs;
    }
    return [];
  });

  const [input, setInput] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
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
      const newLog = {
        date: new Date().toLocaleDateString(),
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

  const generateSummary = async () => {
    if (logs.length > 0) {
      const combinedLogs = logs.map((log) => log.text).join("\n");

      try {
        setLoading(true);
        const res = await client.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: `Summarize these logs into a short paragraph:\n${combinedLogs}`,
            },
          ],
        });

        setSummary(res.choices[0].message.content);
      } catch (err) {
        console.error(err);
        setSummary("Error generating summary. Please try again.");
      } finally {
        setLoading(false);
      }
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
            disabled={loading}
            className={`px-4 py-2 rounded transition ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {loading ? "Summarizing..." : "Generate Summary"}
          </button>

          <button
            onClick={clearLogs}
            disabled={loading}
            className={`px-4 py-2 rounded transition ml-2 ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            Clear Logs
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center mt-4 text-gray-600">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Generating summary...
          </div>
        )}

        <Summary summary={summary} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
