function LogList({ logs }) {
  return (
    <div className="w-full max-w-md mt-8 bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">Your Logs</h2>
      {logs.length > 0 ? (
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {logs.map((log, index) => (
            <li key={index} className="bg-gray-100 p-2 rounded-lg">
              {log}
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
