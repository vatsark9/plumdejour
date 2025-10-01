function Summary({ summary }) {
  if (!summary) return null;
  return (
    <div className="mt-6 bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 transition-colors duration-300">
      <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Summary</h2>
      <p className="text-gray-700 dark:text-gray-300">{summary}</p>
    </div>
  );
}

export default Summary;
