import { useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

function LogInput({ maxChars, input, setInput, addLog }) {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const addTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddLog = () => {
    addLog(tags);
    setTags([]);
    setTagInput("");
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
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

      
      <div className="mb-4">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleTagKeyPress}
            placeholder="Add tags (e.g., work, personal)"
            className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={addTag}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
          >
            Add Tag
          </button>
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-sm flex items-center gap-1"
              >
                #{tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="text-indigo-600 hover:text-indigo-800 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      
      <button
        onClick={handleAddLog}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"

      >
        Add Log
      </button>
    </div>
  );
}

export default LogInput;
