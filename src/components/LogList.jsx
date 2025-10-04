import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

function LogList({ logs, updateLog }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filteredLogs, setFilteredLogs] = useState(logs);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 10;

  // Pagination calculations
  const pageCount = Math.ceil(filteredLogs.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentLogs = filteredLogs.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Filter logs by date range
  useEffect(() => {
    setCurrentPage(0);

    const filterLogsByDate = () => {
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

    filterLogsByDate();
  }, [logs, startDate, endDate]);

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
  };

  // Edit functions
  const startEdit = (log) => {
    setEditingId(log.id);
    setEditText(typeof log === "string" ? log : log.text);
  };

  const saveEdit = (id) => {
    if (editText.trim()) {
      updateLog(id, editText.trim());
      setEditingId(null);
      setEditText("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="w-full max-w-md mt-8 bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">Your Logs</h2>

      {/* Date Filter Section */}
      {logs.length > 0 && (
        <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg mb-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
            aria-label="Start Date"
          />
          <span className="text-gray-500">-</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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

      {/* Logs Display */}
      {filteredLogs.length > 0 ? (
        <>
          <ul className="space-y-3 text-gray-700">
            {currentLogs.map((log) => (
              <li
                key={log.id || log}
                className="bg-gray-100 p-3 rounded-lg flex flex-col sm:flex-row justify-between items-start gap-2"
              >
                {editingId === log.id ? (
                  <div className="w-full space-y-2">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full p-2 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      rows="3"
                      maxLength="200"
                    />
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
