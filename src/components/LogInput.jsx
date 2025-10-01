import { useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

function LogInput({ maxChars, input, setInput, addLog }) {
  const [showPreview, setShowPreview] = useState(false);

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
          placeholder="Enter your log here...&#10;&#10;Try markdown:&#10;**bold text**&#10;*italic text*&#10;`inline code`&#10;## Heading&#10;- List item"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          rows="4"
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
        onClick={addLog}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition w-full"
        disabled={!input.trim()}
      >
        Add Log
      </button>
    </div>
  );
}

export default LogInput;
