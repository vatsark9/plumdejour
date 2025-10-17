import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ReactPaginate from 'react-paginate';

function LogList({ logs, updateLog, setShowAuthModal }) {
    const {user} = useAuth(); // user from context
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(0)

  const itemsPerPage = 10 ;
    
  const pageCount = Math.ceil(filteredLogs.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentLogs = filteredLogs.slice(offset, offset + itemsPerPage);
  
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

  useEffect(() => {
    // console.log('Current logs:', logs); // Debug log
    setCurrentPage(0);

        const filterLogs = () => {
            // First filter by user
            const userLogs = user ? logs.filter(log => {
                return log.userId === user.id;
            }) : [];
            
            // console.log('Filtered user logs:', userLogs); // Debug log

            // Then filter by date
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            if (end) end.setHours(23, 59, 59, 999);

            const filtered = userLogs.filter((log) => {
                if (!startDate && !endDate) return true;
                if (!log.date) return false;


                const logDate = new Date(log.date);

                if (start && logDate < start) return false;
                if (end && logDate > end) return false;

                return true;
            });

            // console.log('Final filtered logs:', filtered); // Debug log
            setFilteredLogs(filtered);
        };

        filterLogs();
    }, [logs, startDate, endDate, user]);

    const clearFilters = () => {
        setStartDate('');
        setEndDate('');
    };

    const startEdit = (log) => {
        setEditText(typeof log === 'string' ? log : log.text);
    };

    const saveEdit = (id) => {
        if (editText.trim()) {
            updateLog(id, editText.trim());
            setEditText('');
        }
    };

    const cancelEdit = () => {
        setEditText('');
    };

    if (!logs || logs.length === 0) {
        return <p>No logs yet.</p>;
    }

    return (
        <div className="w-full max-w-md mt-8 bg-white shadow-md rounded-2xl p-6">
            {user ? (
                <>
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
                      <>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            {currentLogs.map((log, index) => (
                                <li
                                    key={log.id || index}
                                    className="bg-gray-100 p-3 rounded-lg flex justify-between items-center"
                                >
                                    <span className="text-gray-800">
                                        {log.text}
                                    </span>
                                    {log.date && (
                                        <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                                            {log.date}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                        {pageCount > 1 && (
                                <ReactPaginate
                                    previousLabel="←"
                                    nextLabel="→"
                                    pageCount={pageCount}
                                    onPageChange={handlePageClick}
                                    containerClassName="flex items-center justify-center gap-2 mt-4"
                                    pageClassName="px-3 py-1 rounded hover:bg-gray-100"
                                    pageLinkClassName="text-indigo-600"
                                    previousClassName="px-3 py-1 rounded hover:bg-gray-100"
                                    nextClassName="px-3 py-1 rounded hover:bg-gray-100"
                                    previousLinkClassName="text-indigo-600"
                                    nextLinkClassName="text-indigo-600"
                                    activeClassName="bg-indigo-600"
                                    activeLinkClassName="text-white hover:text-white"
                                    disabledClassName="text-gray-300 hover:bg-transparent cursor-not-allowed"
                                />
                            )}
                            </>
                    ) : (
                        <p className="text-gray-500 italic">No logs found.</p>
                    )}
                </>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500 mb-2">Please login to view your logs</p>
                    <button
                        onClick={() => setShowAuthModal(true)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Login
                    </button>
                </div>
            )}
        </div>
    );
}

export default LogList;
