import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Header from "./components/Header";
import LogInput from "./components/LogInput";
import LogList from "./components/LogList";
import SearchAndFilter from "./components/SearchAndFilter";
import Summary from "./components/Summary";
import Footer from "./components/Footer";
import { filterLogs } from "./utils/tagUtils";
import "./App.css";

function App() {
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const maxChars = 200;

  // Filter logs based on search and tags
  const filteredLogs = filterLogs(logs, searchTerm, selectedTags);

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

  const generateSummary = () => {
    // Generate summary from filtered logs
    const logsToSummarize = filteredLogs.length > 0 ? filteredLogs : logs;
    
    if (logsToSummarize.length > 0){
      const summaryText = logsToSummarize.map((log) => log.text).join(". ") + ".";
      setSummary(summaryText);
    } else {
      setSummary("No logs for today.");
    }
  };

  const clearLogs = () => {
    setLogs([]);
    setSummary("");
    setSearchTerm("");
    setSelectedTags([]);
    localStorage.removeItem("dailyLogs");
  };

  const handleTagClick = (tag) => {
    // Add tag to selected tags if not already selected
    if (!selectedTags.includes(tag.toLowerCase())) {
      setSelectedTags([...selectedTags, tag.toLowerCase()]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-5 font-mono transition-colors duration-300">
      <Navbar />
      <Header />
      
      {/* Search and Filter Section */}
      <SearchAndFilter
        logs={logs}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
      />
      
      <LogInput
        maxChars={maxChars}
        input={input}
        setInput={setInput}
        addLog={addLog}
        logs={logs}
      />
      
      <LogList 
        logs={logs} 
        updateLog={updateLog} 
        searchTerm={searchTerm}
        selectedTags={selectedTags}
        onTagClick={handleTagClick}
      />
      
      <div className="w-full max-w-md mt-6">
        <div className="flex gap-4">
          <button
            onClick={generateSummary}
            className="bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-300"
            title={filteredLogs.length !== logs.length ? `Generate summary from ${filteredLogs.length} filtered logs` : "Generate summary from all logs"}
          >
            Generate Summary {filteredLogs.length !== logs.length && `(${filteredLogs.length})`}
          </button>
          <button
            onClick={clearLogs}
            className="bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded hover:bg-red-600 dark:hover:bg-red-700 transition-colors duration-300 ml-2"
          >
            Clear All
          </button>
        </div>
        <Summary summary={summary} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
