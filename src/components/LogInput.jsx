import { useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import { getAllTags, getTagSuggestions, extractTags } from "../utils/tagUtils";

function LogInput({ maxChars, input, setInput, addLog, logs = [] }) {
  const [showPreview, setShowPreview] = useState(false);
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  const allTags = getAllTags(logs);
  const tagSuggestions = getTagSuggestions(allTags, input);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setInput(value);
      setCursorPosition(e.target.selectionStart);
      
      // Show tag suggestions when typing #
      const lastChar = value[e.target.selectionStart - 1];
      setShowTagSuggestions(lastChar === '#' || tagSuggestions.length > 0);
    }
  };

  const handleTagSuggestionClick = (suggestion) => {
    const lastHashIndex = input.lastIndexOf('#');
    if (lastHashIndex !== -1) {
      const beforeHash = input.substring(0, lastHashIndex + 1);
      const afterCursor = input.substring(cursorPosition);
      const newInput = beforeHash + suggestion + ' ' + afterCursor;
      setInput(newInput);
    }
    setShowTagSuggestions(false);
  };

  const currentTags = extractTags(input);

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 transition-colors duration-300">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Add New Log (Markdown & #tags supported)
        </span>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className={`px-2 py-1 rounded text-xs transition ${
            showPreview
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {showPreview ? "Edit" : "Preview"}
        </button>
      </div>

      {showPreview ? (
        <div className="min-h-[80px] p-4 border border-gray-300 dark:border-gray-600 rounded-lg mb-2 bg-gray-50 dark:bg-gray-700 transition-colors duration-300">
          {input.trim() ? (
            <MarkdownRenderer content={input} />
          ) : (
            <div className="text-gray-400 dark:text-gray-500 italic">
              Preview will appear here...
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <textarea
            value={input}
            onChange={handleInputChange}
            onFocus={() => setShowTagSuggestions(tagSuggestions.length > 0)}
            onBlur={() => setTimeout(() => setShowTagSuggestions(false), 150)}
            maxLength={maxChars}
            placeholder="Enter your log here...&#10;&#10;Try markdown & hashtags:&#10;**bold text** #work&#10;*italic text* #personal&#10;`inline code` #coding&#10;## Heading #ideas"
            className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none transition-colors duration-300 placeholder-gray-500 dark:placeholder-gray-400"
            rows="4"
          />
          
          {/* Tag Suggestions Dropdown */}
          {showTagSuggestions && tagSuggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-32 overflow-y-auto">
              {tagSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleTagSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm text-gray-700 dark:text-gray-300 transition-colors"
                >
                  #{suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Current Tags Display */}
      {currentTags.length > 0 && (
        <div className="mb-2">
          <span className="text-xs text-gray-600 dark:text-gray-400 block mb-1">
            Tags in this log:
          </span>
          <div className="flex flex-wrap gap-1">
            {currentTags.map((tag, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 rounded-full text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-2">
        <div
          className={`text-sm ${
            input.length === maxChars ? "text-red-500" : "text-gray-500 dark:text-gray-400"
          } transition-colors duration-300`}
        >
          {maxChars - input.length} characters remaining
        </div>
      </div>

      <button
        onClick={addLog}
        className="bg-purple-500 dark:bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-600 dark:hover:bg-purple-700 transition-colors duration-300 w-full"
        disabled={!input.trim()}
      >
        Add Log
      </button>
    </div>
  );
}

export default LogInput;
