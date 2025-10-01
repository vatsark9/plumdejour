import { useState } from "react";

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
                  <button
                    onClick={() => startEdit(log)}
                    className="text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 p-2 rounded transition flex-shrink-0"
                    aria-label="Edit log"
                    title="Edit this log"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
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
}

export default LogList;
