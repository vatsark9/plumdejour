function Summary({ summary }) {
  if (!summary) return null;
  return (
    <div className="mt-6 bg-white shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-indigo-600 mb-2">Summary</h2>
      <p className="text-gray-700">{summary}</p>
    </div>
  );
}

export default Summary;
