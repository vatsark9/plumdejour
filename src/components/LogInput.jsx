import { useState } from "react";

function LogInput({ maxChars, input, setInput, addLog }) {
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
      <button
        onClick={addLog}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
      >
        Add Log
      </button>
    </div>
  );
}

export default LogInput;
