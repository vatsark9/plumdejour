const ViewToggle = ({ currentView, onViewChange }) => {
  const views = [
    {
      id: 'list',
      name: 'List View',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
      description: 'View logs in a list format'
    },
    {
      id: 'calendar',
      name: 'Calendar View',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      description: 'View logs organized by date'
    }
  ];

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-2xl p-4 transition-colors duration-300">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          📅 View Mode
        </h3>
      </div>
      
      <div className="flex space-x-2">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className={`
              flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg
              transition-all duration-200 text-sm font-medium
              ${currentView === view.id
                ? 'bg-indigo-500 dark:bg-indigo-600 text-white shadow-md transform scale-105'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
            `}
            title={view.description}
          >
            {view.icon}
            <span>{view.name}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 text-center">
        {currentView === 'list' ? 'Showing all logs in chronological order' : 'Click on any date to view logs for that day'}
      </div>
    </div>
  );
};

export default ViewToggle;