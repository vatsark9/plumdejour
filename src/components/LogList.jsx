function LogList({ logs }) {
  return (
    <div className="w-full max-w-md mt-8 bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">Your Logs</h2>
      {logs.length > 0 ? (
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {logs.map((log, index) => (
            <li key={index} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
              <span className="text-gray-800">
                {typeof log === "string" ? log : log.text}
              </span>
              {typeof log === "object" && log.date && (
                <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{log.date}</span>
        <ul className="space-y-3 text-gray-700">
          {logs.map((log) => (
            <li key={log.id || log} className="bg-gray-100 p-3 rounded-lg">
              <div className="text-gray-800">
                {typeof log === 'string' ? log : log.text}
              </div>
              {typeof log === 'object' && log.timestamp && (
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(log.timestamp).toLocaleString()}
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
