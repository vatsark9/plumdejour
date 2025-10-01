import { useState } from "react";

function LogList({ logs, updateLog }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

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
      {logs.length > 0 ? (
        <ul className="space-y-3 text-gray-700">
          {logs.map((log) => (
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
        <p className="text-gray-500 italic">No logs added yet.</p>
      )}
    </div>
  );
}

export default LogList;
