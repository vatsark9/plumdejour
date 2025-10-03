import { useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

function LogInput({ 
  maxChars, 
  input, 
  setInput, 
  addLog, 
  editingLog, 
  saveEdit, 
  cancelEdit 
}) {
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = () => {
    if (editingLog) {
      saveEdit();
    } else {
      addLog();
    }
  };

  const isEditing = !!editingLog;

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      {isEditing && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
          <div className="flex items-center text-blue-800 dark:text-blue-200">
            <span className="mr-2">✏️</span>
            <span className="text-sm font-medium">Editing log from {editingLog.date}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {isEditing ? 'Edit Log' : 'Add New Log'} (Markdown supported)
        </span>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className={`px-2 py-1 rounded text-xs transition ${
            showPreview
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
          }`}
        >
          {showPreview ? "Edit" : "Preview"}
        </button>
      </div>

      {showPreview ? (
        <div className="min-h-[80px] p-4 border border-gray-300 dark:border-gray-600 rounded-lg mb-2 bg-gray-50 dark:bg-gray-700">
          {input.trim() ? (
            <MarkdownRenderer content={input} />
          ) : (
            <div className="text-gray-400 dark:text-gray-500 italic">
              Preview will appear here...
            </div>
          )}
        </div>
      ) : (
        <textarea
          value={input}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= maxChars) {
              setInput(value);
            }
          }}
          maxLength={maxChars}
          placeholder="Enter your log here...&#10;&#10;Try markdown:&#10;**bold text**&#10;*italic text*&#10;`inline code`&#10;## Heading&#10;- List item&#10;#tags #work #personal"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          rows="4"
        />
      )}

      <div className="flex justify-between items-center mb-2">
        <div
          className={`text-sm ${
            input.length === maxChars ? "text-red-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {maxChars - input.length} characters remaining
        </div>
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSubmit}
              className="bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded hover:bg-green-600 dark:hover:bg-green-700 transition flex-1"
              disabled={!input.trim()}
            >
              💾 Save Changes
            </button>
            <button
              onClick={cancelEdit}
              className="bg-gray-500 dark:bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-600 dark:hover:bg-gray-700 transition"
            >
              ✖️ Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-purple-500 dark:bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-600 dark:hover:bg-purple-700 transition w-full"
            disabled={!input.trim()}
          >
            ➕ Add Log
          </button>
        )}
      </div>
    </div>
  );
}

export default LogInput;
