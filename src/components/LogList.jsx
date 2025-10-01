function LogList({ logs, deleteLog }) {
  return (
    <div className="w-full max-w-md mt-8 bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">Your Logs</h2>
      {logs.length > 0 ? (
        <ul className="space-y-3 text-gray-700">
          {logs.map((log) => (
            <li
              key={log.id || log}
              className="bg-gray-100 p-3 rounded-lg flex justify-between items-start gap-3"
            >
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
                onClick={() => deleteLog(log.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition flex-shrink-0"
                aria-label="Delete log"
                title="Delete this log"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
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
