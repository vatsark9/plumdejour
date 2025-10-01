import { useState } from "react";

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
      <input
        type="text"
        value={input}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= maxChars) {
            setInput(value);
          }
        }}
        maxLength={maxChars}
        placeholder="Enter your log here..."
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <div
        className={`text-sm ${
          input.length === maxChars ? "text-red-500" : "text-gray-500"
        } mb-4`}
      >
        {maxChars - input.length} characters remaining
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
