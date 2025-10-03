import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
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
  const [editingLog, setEditingLog] = useState(null); // For editing existing logs
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

  const startEditing = (log) => {
    setEditingLog(log);
    setInput(log.text);
  };

  const saveEdit = () => {
    if (editingLog && input.trim()) {
      setLogs(logs.map(log => 
        log.id === editingLog.id 
          ? { ...log, text: input.trim(), timestamp: new Date().toISOString() }
          : log
      ));
      setEditingLog(null);
      setInput("");
      
      // Clear summary if it exists
      if (summary) {
        setSummary("");
      }
    }
  };

  const cancelEdit = () => {
    setEditingLog(null);
    setInput("");
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-5 font-mono transition-colors duration-300">
      <Navbar />
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
        editingLog={editingLog}
        saveEdit={saveEdit}
        cancelEdit={cancelEdit}
      />
      
      {/* Conditional Rendering based on view mode */}
      {viewMode === 'list' ? (
        <LogList 
          logs={logs} 
          updateLog={updateLog} 
          searchTerm={searchTerm}
          selectedTags={selectedTags}
          onTagClick={handleTagClick}
          onEditLog={startEditing}
        />
      ) : (
        <>
          <Calendar
            logs={logs}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            searchTerm={searchTerm}
            selectedTags={selectedTags}
          />
          <DateLogViewer
            selectedDate={selectedDate}
            logs={logs}
            updateLog={updateLog}
            onTagClick={handleTagClick}
            searchTerm={searchTerm}
            selectedTags={selectedTags}
            onEditLog={startEditing}
          />
        </>
      )}
      
      <div className="w-full max-w-md mt-6">
        <div className="flex gap-4">
          <button
            onClick={generateSummary}
            className="bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded hover:bg-green-600 dark:hover:bg-green-700 transition-colors duration-300"
            title={
              viewMode === 'calendar' && selectedDate
                ? `Generate summary from logs on ${selectedDate.toLocaleDateString()}`
                : filteredLogs.length !== logs.length
                ? `Generate summary from ${filteredLogs.length} filtered logs`
                : "Generate summary from all logs"
            }
          >
            {getSummaryButtonText()}
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
      <WeeklySummaryGraph logs={logs} />
      <Footer />
    </div>
  );
}
