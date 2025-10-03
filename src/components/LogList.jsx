
import { useState } from 'react';
import { useEffect } from 'react';

function LogList({ logs, updateLog, deleteLog }) {
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [filteredLogs, setFilteredLogs] = useState(logs);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

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

    const confirmDelete = (id) => {
        setShowDeleteConfirm(id);
    };

    const handleDelete = (id) => {
        deleteLog(id);
        setShowDeleteConfirm(null);
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(null);
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
                <ul className="space-y-3 text-gray-700">
                    {filteredLogs.map((log, index) => (
                        <li key={log.id || index} className="bg-gray-100 p-4 rounded-lg">
                            {editingId === log.id ? (
                                <div className="space-y-3">
                                    <textarea
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                        rows="3"
                                        placeholder="Edit your log..."
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => saveEdit(log.id)}
                                            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : showDeleteConfirm === log.id ? (
                                <div className="space-y-3">
                                    <div className="text-gray-800">
                                        <p className="font-medium text-red-600 mb-2">Are you sure you want to delete this log?</p>
                                        <p className="text-sm italic">"{typeof log === 'string' ? log : log.text}"</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleDelete(log.id)}
                                            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={cancelDelete}
                                            className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-between items-start gap-3">
                                    <div className="flex-1">
                                        <div className="text-gray-800 mb-2">
                                            {typeof log === 'string' ? log : log.text}
                                        </div>
                                        {typeof log === 'object' && log.date && (
                                            <div className="text-xs text-gray-500">
                                                {log.date}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-1 flex-shrink-0">
                                        <button
                                            onClick={() => startEdit(log)}
                                            className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded transition"
                                            title="Edit log"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => confirmDelete(log.id)}
                                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition"
                                            title="Delete log"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
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
