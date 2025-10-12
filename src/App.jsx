import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import LogInput from "./components/LogInput";
import LogList from "./components/LogList";
import SearchAndFilter from "./components/SearchAndFilter";
import ViewToggle from "./components/ViewToggle";
import Calendar from "./components/Calendar";
import DateLogViewer from "./components/DateLogViewer";
import Summary from "./components/Summary";
import WeeklySummaryGraph from "./components/WeeklySummaryGraph";
import Footer from "./components/Footer";
import { filterLogs } from "./utils/tagUtils";
import "./App.css";

export default function App() {
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
            date: new Date().toLocaleDateString(),
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
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [selectedDate, setSelectedDate] = useState(null);
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
      
      // If in calendar view and no date selected, select today
      if (viewMode === 'calendar' && !selectedDate) {
        setSelectedDate(new Date());
      }
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
    let logsToSummarize = filteredLogs;
    
    // If in calendar view and a date is selected, use logs from that date
    if (viewMode === 'calendar' && selectedDate) {
      const selectedDateKey = selectedDate.toLocaleDateString('en-CA');
      logsToSummarize = logs.filter(log => {
        const logDate = log.date ? new Date(log.date) : new Date(log.timestamp);
        return logDate.toLocaleDateString('en-CA') === selectedDateKey;
      });
      logsToSummarize = filterLogs(logsToSummarize, searchTerm, selectedTags);
    }
    
    if (logsToSummarize.length > 0){
      const summaryText = logsToSummarize.map((log) => log.text).join(". ") + ".";
      setSummary(summaryText);
    } else {
      setSummary("No logs for the selected criteria.");
    }
  };

  const clearLogs = () => {
    setLogs([]);
    setSummary("");
    setSearchTerm("");
    setSelectedTags([]);
    setSelectedDate(null);
    localStorage.removeItem("dailyLogs");
  };

  const handleTagClick = (tag) => {
    // Add tag to selected tags if not already selected
    if (!selectedTags.includes(tag.toLowerCase())) {
      setSelectedTags([...selectedTags, tag.toLowerCase()]);
    }
  };

  const handleViewChange = (newView) => {
    setViewMode(newView);
    if (newView === 'calendar' && !selectedDate) {
      setSelectedDate(new Date()); // Select today by default
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const getSummaryButtonText = () => {
    if (viewMode === 'calendar' && selectedDate) {
      const dateStr = selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return `Summary (${dateStr})`;
    }
    if (filteredLogs.length !== logs.length) {
      return `Summary (${filteredLogs.length})`;
    }
    return 'Generate Summary';
  };

  // Delete log by index (or use a unique id if available)
  const handleDeleteLog = (index) => {
    const updatedLogs = logs.filter((_, i) => i !== index);
    setLogs(updatedLogs);
    localStorage.setItem("logs", JSON.stringify(updatedLogs));
  };

  return (
    <div className="min-h-screen animated-gradient flex flex-col items-center p-5 font-['Inter'] relative">
      <Header />
      
      {/* View Toggle */}
      <ViewToggle currentView={viewMode} onViewChange={handleViewChange} />
      
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
      <WeeklySummaryGraph logs={logs} />
      <Footer />
    </div>
  );
}
