
import { useState } from 'react';
import { useEffect } from 'react';
import { extractTags, filterLogs } from '../utils/tagUtils';
import MarkdownRenderer from './MarkdownRenderer';

function LogList({ 
  logs, 
  updateLog, 
  searchTerm = '', 
  selectedTags = [], 
  onTagClick 
}) {
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [filteredLogs, setFilteredLogs] = useState(logs);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const applyFilters = () => {
            // First apply search and tag filters
            let filtered = filterLogs(logs, searchTerm, selectedTags);
            
            // Then apply date filters
            if (startDate || endDate) {
                const start = startDate ? new Date(startDate) : null;
                const end = endDate ? new Date(endDate) : null;

                if (end) end.setHours(23, 59, 59, 999);

                filtered = filtered.filter((log) => {
                    if (!log.date) return false;

                    const logDate = new Date(log.date);

                    if (start && logDate < start) return false;
                    if (end && logDate > end) return false;

                    return true;
                });
            }

            setFilteredLogs(filtered);
        };

        applyFilters();
    }, [logs, searchTerm, selectedTags, startDate, endDate]);

    const clearFilters = () => {
        setStartDate('');
        setEndDate('');
    };

    const startEdit = (log) => {
        setEditingId(log.id);
        setEditText(typeof log === 'string' ? log : log.text);
    };

    const saveEdit = (id) => {
        if (editText.trim()) {
            updateLog(id, editText.trim());
            setEditingId(null);
            setEditText('');
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditText('');
    };

    const handleTagClick = (tag) => {
        if (onTagClick) {
            onTagClick(tag);
        }
    };

    const renderLogText = (logText) => {
        const tags = extractTags(logText);
        const parts = logText.split(/#([a-zA-Z0-9_]+)/g);
        
        return parts.map((part, index) => {
            if (index % 2 === 1) { // This is a tag
                return (
                    <button
                        key={index}
                        onClick={() => handleTagClick(part)}
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
        <div className="w-full max-w-md mt-8 bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 transition-colors duration-300">
            <div>
                <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">Your Logs</h2>
                <div>
                    {logs.length > 0 && (
                        <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-4 transition-colors duration-300">
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => {
                                    setStartDate(e.target.value);
                                }}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-md text-sm transition-colors duration-300"
                                aria-label="Start Date"
                            />
                            <span className="text-gray-500 dark:text-gray-400">-</span>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => {
                                    setEndDate(e.target.value);
                                }}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-md text-sm transition-colors duration-300"
                                aria-label="End Date"
                            />
                            <button
                                onClick={clearFilters}
                                className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-300"
                            >
                                Clear
                            </button>
                        </div>

                    )}
                </div>
            </div>
            
            {/* Results summary */}
            {(searchTerm || selectedTags.length > 0) && (
                <div className="mb-4 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                        Showing {filteredLogs.length} of {logs.length} logs
                        {searchTerm && ` matching "${searchTerm}"`}
                        {selectedTags.length > 0 && ` with tags: ${selectedTags.map(tag => `#${tag}`).join(', ')}`}
                    </p>
                </div>
            )}
            
            {filteredLogs.length > 0 ? (
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    {filteredLogs.map((log, index) => (
                        <li
                            key={log.id || index}
                            className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg transition-colors duration-300"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    {editingId === log.id ? (
                                        <div className="space-y-2">
                                            <textarea
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                                className="w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-white rounded-md text-sm transition-colors duration-300"
                                                rows="3"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => saveEdit(log.id)}
                                                    className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={cancelEdit}
                                                    className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="text-gray-800 dark:text-gray-200">
                                                {renderLogText(typeof log === 'string' ? log : log.text)}
                                            </div>
                                            {typeof log === 'object' && log.date && (
                                                <div className="flex justify-between items-center mt-2">
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {log.date}
                                                    </span>
                                                    <button
                                                        onClick={() => startEdit(log)}
                                                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 dark:text-gray-400 italic text-center py-4">
                    {logs.length === 0 
                        ? "No logs added yet." 
                        : "No logs match your current filters."}
                </p>
            )}
        </div>
    );
}

export default LogList;
