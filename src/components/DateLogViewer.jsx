import { extractTags } from '../utils/tagUtils';
import MarkdownRenderer from './MarkdownRenderer';

const DateLogViewer = ({ 
  selectedDate, 
  logs, 
  updateLog, 
  onTagClick,
  searchTerm = '',
  selectedTags = [],
  onEditLog
}) => {
  if (!selectedDate) {
    return (
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 transition-colors duration-300">
        <div className="text-center py-8">
          <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400 text-lg">Select a date to view logs</p>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Click on any date in the calendar above</p>
        </div>
      </div>
    );
  }

  // Get logs for the selected date
  const getLogsForSelectedDate = () => {
    const selectedDateKey = selectedDate.toLocaleDateString('en-CA'); // YYYY-MM-DD format
    
    return logs.filter(log => {
      let logDate;
      
      if (log.date) {
        if (typeof log.date === 'string') {
          logDate = new Date(log.date);
          if (isNaN(logDate.getTime())) {
            logDate = new Date(log.date.replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'));
          }
        } else {
          logDate = new Date(log.date);
        }
      } else if (log.timestamp) {
        logDate = new Date(log.timestamp);
      } else {
        return false;
      }
      
      const logDateKey = logDate.toLocaleDateString('en-CA');
      
      // Check if log is for the selected date
      const matchesDate = logDateKey === selectedDateKey;
      
      if (!matchesDate) return false;
      
      // Apply search and tag filters
      const logText = typeof log === 'string' ? log : log.text;
      
      const matchesSearch = !searchTerm || 
        logText.toLowerCase().includes(searchTerm.toLowerCase());
      
      const logTags = extractTags(logText);
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(selectedTag => 
          logTags.includes(selectedTag.toLowerCase())
        );
      
      return matchesSearch && matchesTags;
    });
  };

  const dateSpecificLogs = getLogsForSelectedDate();

  const renderLogText = (logText) => {
    const tags = extractTags(logText);
    const parts = logText.split(/#([a-zA-Z0-9_]+)/g);
    
    return parts.map((part, index) => {
      if (index % 2 === 1) { // This is a tag
        return (
          <button
            key={index}
            onClick={() => onTagClick && onTagClick(part)}
            className="inline-block mx-1 px-2 py-1 rounded-full text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors cursor-pointer"
          >
            #{part}
          </button>
        );
      }
      return <MarkdownRenderer key={index} content={part} inline={true} />;
    });
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 transition-colors duration-300">
      {/* Date Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
          📋 Logs for {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </h3>
        
        {(searchTerm || selectedTags.length > 0) && (
          <div className="text-xs text-blue-600 dark:text-blue-400">
            Showing filtered results • {dateSpecificLogs.length} log(s)
          </div>
        )}
      </div>

      {/* Logs List */}
      {dateSpecificLogs.length > 0 ? (
        <div className="space-y-3">
          {dateSpecificLogs.map((log, index) => (
            <div
              key={log.id || index}
              className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300"
            >
              <div className="text-gray-800 dark:text-gray-200 text-sm">
                {renderLogText(typeof log === 'string' ? log : log.text)}
              </div>
              
              {typeof log === 'object' && log.timestamp && (
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(log.timestamp).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <button
                    onClick={() => onEditLog && onEditLog(log)}
                    className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    title="Edit this log"
                  >
                    ✏️ Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <svg className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          
          {logs.some(log => {
            const logDate = log.date ? new Date(log.date) : new Date(log.timestamp);
            return logDate.toLocaleDateString('en-CA') === selectedDate.toLocaleDateString('en-CA');
          }) ? (
            <div>
              <p className="text-gray-500 dark:text-gray-400">No logs match your current filters</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Try adjusting your search or tag filters</p>
            </div>
          ) : (
            <div>
              <p className="text-gray-500 dark:text-gray-400">No logs for this date</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Add a new log to get started!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateLogViewer;