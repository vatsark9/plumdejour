
import { useState } from 'react';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';

function LogList({ logs, updateLog }) {

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editTags, setEditTags] = useState([]);
  const [editTagInput, setEditTagInput] = useState("");
  const [filterTag, setFilterTag] = useState("");

  const startEdit = (log) => {
    setEditingId(log.id);
    setEditText(typeof log === "string" ? log : log.text);
    setEditTags(log.tags || []);
  };

  const addEditTag = () => {
    const trimmedTag = editTagInput.trim().toLowerCase();
    if (trimmedTag && !editTags.includes(trimmedTag)) {
      setEditTags([...editTags, trimmedTag]);
      setEditTagInput("");
    }
  };

  const removeEditTag = (tagToRemove) => {
    setEditTags(editTags.filter(tag => tag !== tagToRemove));
  };

  const saveEdit = (id) => {
    if (editText.trim()) {
      updateLog(id, editText.trim(), editTags);
      setEditingId(null);
      setEditText("");
      setEditTags([]);
      setEditTagInput("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setEditTags([]);
    setEditTagInput("");
  };

  const getAllTags = () => {
    const tagSet = new Set();
    logs.forEach(log => {
      if (log.tags) {
        log.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  };

  const filteredLogs = filterTag 
    ? logs.filter(log => log.tags && log.tags.includes(filterTag))
    : logs;

  return (
    <div className="w-full max-w-md mt-8 bg-white shadow-md rounded-2xl p-6">
 features/TagFunctionality
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-indigo-600">Your Logs</h2>
        {getAllTags().length > 0 && (
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">All tags</option>
            {getAllTags().map((tag) => (
              <option key={tag} value={tag}>
                #{tag}
              </option>
            ))}
          </select>
        )}
      </div>
      {filteredLogs.length > 0 ? (

      <h2 className="text-xl font-semibold text-indigo-600 mb-4">Your Logs</h2>
      {logs.length > 0 ? (
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {logs.map((log, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
              <span className="text-gray-800">
                {typeof log === "string" ? log : log.text}
              </span>
              {typeof log === "object" && log.date && (
                <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{log.date}</span>

        <ul className="space-y-3 text-gray-700">
          {filteredLogs.map((log) => (
            <li key={log.id || log} className="bg-gray-100 p-3 rounded-lg">
              {editingId === log.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-2 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    rows="3"
                    maxLength="200"
                  />
                  
                  <div>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={editTagInput}
                        onChange={(e) => setEditTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addEditTag()}
                        placeholder="Add tag"
                        className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      />
                      <button
                        onClick={addEditTag}
                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition"
                      >
                        Add
                      </button>
                    </div>
                    
                    {editTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {editTags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs flex items-center gap-1"
                          >
                            #{tag}
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [filteredLogs, setFilteredLogs] = useState(logs);
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
    setCurrentPage(0);

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
                              onClick={() => removeEditTag(tag)}
                              className="text-indigo-600 hover:text-indigo-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(log.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <div className="text-gray-800">
                      {typeof log === "string" ? log : log.text}
                    </div>
                    
                    {log.tags && log.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {log.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs cursor-pointer hover:bg-blue-200 transition"
                            onClick={() => setFilterTag(filterTag === tag ? "" : tag)}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {typeof log === "object" && log.timestamp && (
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(log.timestamp).toLocaleString()}
                      </div>

                    )}
                </div>

              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">
          {filterTag ? `No logs found with tag #${filterTag}` : "No logs added yet."}
        </p>
      )}
    </div>
  );


            </div>
            {filteredLogs.length > 0 ? (
              <>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {currentLogs.map((log, index) => (
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
                <p className="text-gray-500 italic">No logs added yet.</p>
        )}
        
        </div>
    );
}

export default LogList;
