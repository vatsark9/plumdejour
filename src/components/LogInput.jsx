import { useState } from "react";

function LogInput({ maxChars, input, setInput, addLog }) {
  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 transition-colors duration-300">
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
        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition-colors duration-200"
      />
      <div
        className={`text-sm ${
          input.length === maxChars ? "text-red-500 dark:text-red-400" : "text-gray-500 dark:text-gray-400"
        } mb-4`}
      >
        {maxChars - input.length} characters remaining
      </div>
      <button
        onClick={addLog}
        className="bg-purple-500 dark:bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-600 dark:hover:bg-purple-700 transition-colors duration-200"
      >
        Add Log
      </button>
    </div>
  );
}

export default LogInput;
