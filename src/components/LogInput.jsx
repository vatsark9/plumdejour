import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import MarkdownRenderer from "./MarkdownRenderer";

function LogInput({ maxChars, input, setInput, addLog, setShowAuthModal }) {
  const [showPreview, setShowPreview] = useState(false);
  const { user } = useAuth();

  const handleAddLog = (e) => {
    e.preventDefault();
    console.log('Add Log clicked', { user, input }); // Debug log
    
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!input.trim()) {
      return;
    }

    try {
      addLog();
      setShowPreview(false);
      // console.log('Log added successfully'); // Debug log
    } catch (error) {
      // console.error('Error adding log:', error); // Debug log
    }
  };


  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Add New Log (Markdown supported)
        </span>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className={`px-2 py-1 rounded text-xs transition ${
            showPreview
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {showPreview ? "Edit" : "Preview"}
        </button>
      </div>

      {showPreview ? (
        <div className="min-h-[80px] p-4 border border-gray-300 rounded-lg mb-2 bg-gray-50">
          {input.trim() ? (
            <MarkdownRenderer content={input} />
          ) : (
            <div className="text-gray-400 italic">
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
          placeholder={
            user
              ? "Enter your log here...\n\nTry markdown:\n**bold text**\n*italic text*\n`inline code`\n## Heading\n- List item"
              : "Please login to add logs..."
          }
          className={`w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none ${
            !user && "bg-gray-50 cursor-not-allowed"
          }`}
          rows="4"
          disabled={!user}
        />
      )}

      <div className="flex justify-between items-center mb-2">
        <div
          className={`text-sm ${
            input.length === maxChars ? "text-red-500" : "text-gray-500"
          }`}
        >
          {maxChars - input.length} characters remaining
        </div>
      </div>

      <button
        onClick={handleAddLog}
        className={`px-4 py-2 rounded transition w-full hover:cursor-pointer ${
          user && input.trim()
            ? "bg-purple-500 text-white hover:bg-purple-600"
            : "bg-purple-300 text-white"
        }`}
        disabled={!input.trim() || !user}
      >
        {user ? "Add Log" : "Login to Add Log"}
      </button>
    </div>
  );
}

export default LogInput;
