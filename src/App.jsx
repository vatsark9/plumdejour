import React, { useState, useEffect } from "react";
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

import { Icon } from "@iconify-icon/react";
import "./App.css";
import { filterLogs } from "./utils/tagUtils";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

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


   const [showVoiceBtn, setShowVoiceBtn] = useState(true);

   const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
       useSpeechRecognition();

   const startListening = () => SpeechRecognition.startListening({ continuous: true });

   useEffect(() => {
       if (!browserSupportsSpeechRecognition) {
           setShowVoiceBtn(false);
       }
   }, []);

   useEffect(() => {
       if (transcript) {
           setInput(transcript);
       }
   }, [transcript]);

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
useEffect(() => {
    if (!listening && transcript) {
      resetTranscript();


    }
}, [listening, transcript]);
  return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5 font-mono">
          <Header />
          <div className="absolute left-189 top-89 ">
              {showVoiceBtn && (
                  <button
                      onClick={(e) => {
                          e.preventDefault();
                          if (listening) {
                              SpeechRecognition.stopListening();
                              if (transcript) {
                                  setInput(transcript);
                                  resetTranscript();
                              }
                          } else {
                              startListening();
                          }
                      }}
                      className="text-2xl py-1.5 px-1.5 grid place-content-center transition-all rounded-md"
                  >
                      {listening ? (
                          <span className="text-red-500 grid place-content-center">
                              <Icon icon="fluent:mic-off-24-regular" />
                          </span>
                      ) : (
                          <Icon icon="fluent:mic-24-regular" />
                      )}
                  </button>
              )}
          </div>

          <div className="flex">
              <LogInput maxChars={maxChars} input={input} setInput={setInput} addLog={addLog} />
          </div>
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-5 font-mono transition-colors duration-300">
      <Navbar />
      <Header logs={logs} />
      
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
      
      {/* Conditional Rendering based on view mode */}
      {viewMode === 'list' ? (
        <LogList 
          logs={logs} 
          updateLog={updateLog} 
          searchTerm={searchTerm}
          selectedTags={selectedTags}
          onTagClick={handleTagClick}
          onDeleteLog={handleDeleteLog}
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
          />
        </>
      )}
      
      <div className="w-full max-w-md mt-6">
        <div className="flex gap-4">
          <button
            onClick={generateSummary}
            className="summary"
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
