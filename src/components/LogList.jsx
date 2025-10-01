import { useState } from 'react';
import { useEffect } from 'react';
function LogList({ logs, updateLog }) {
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [filteredLogs, setFilteredLogs] = useState(logs);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const filterLogs = () => {
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            if (end) end.setHours(23, 59, 59, 999);

            const filtered = logs.filter((log) => {
                if (!startDate && !endDate) return true;
                if (!log.date) return false;

                const logDate = new Date(log.date);

                if (start && logDate < start) return false;
                if (end && logDate > end) return false;

                return true;
            });

            setFilteredLogs(filtered);
        };

        filterLogs();
    }, [logs, startDate, endDate]);

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

    return (
        <div className="w-full max-w-md mt-8 bg-white shadow-md rounded-2xl p-6">
            <div>
                <h2 className="text-xl font-semibold text-indigo-600 mb-4">Your Logs</h2>
                <div>
                    {logs.length > 0 && (
                        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg mb-4">
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => {
                                    setStartDate(e.target.value);
                                }}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                aria-label="Start Date"
                            />
                            <span className="text-gray-500">-</span>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => {
                                    setEndDate(e.target.value);
                                }}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                aria-label="End Date"
                            />
                            <button
                                onClick={clearFilters}
                                className="px-3 py-2 text-sm text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                            >
                                Clear
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {filteredLogs.length > 0 ? (
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {filteredLogs.map((log, index) => (
                        <li
                            key={index}
                            className="bg-gray-100 p-3 rounded-lg flex justify-between items-center"
                        >
                            <span className="text-gray-800">
                                {typeof log === 'string' ? log : log.text}
                            </span>
                            {typeof log === 'object' && log.date && (
                                <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                                    {log.date}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 italic">No logs added yet.</p>
            )}
        </div>
    );
}

export default LogList;
