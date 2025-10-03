
import { filterLogs, highlightTags } from '../utils/tagUtils';
import MarkdownRenderer from './MarkdownRenderer';

const LogList = ({ 
  logs, 
  searchTerm, 
  selectedTags, 
  onTagClick, 
  onEditLog 
}) => {
  // Filter logs based on search and tags
  const filteredLogs = filterLogs(logs, searchTerm, selectedTags);

  if (filteredLogs.length === 0) {
    return (
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Your Daily Logs
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          {logs.length === 0 ? 'No logs yet. Start writing!' : 'No logs match your current filters.'}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Your Daily Logs
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
          ({filteredLogs.length} {filteredLogs.length === 1 ? 'entry' : 'entries'})
        </span>
      </h2>
      
      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <div 
            key={log.id} 
            className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(log.timestamp || log.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
              <button
                onClick={() => onEditLog(log)}
                className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                title="Edit this log"
              >
                ✏️ Edit
              </button>
            </div>
            
            <div className="text-gray-800 dark:text-gray-200">
              <MarkdownRenderer 
                content={highlightTags(log.text, onTagClick, searchTerm)} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogList;
