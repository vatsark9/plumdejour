import { getAllTags, getTagSuggestions } from '../utils/tagUtils';

const SearchAndFilter = ({ 
  logs, 
  searchTerm, 
  setSearchTerm, 
  selectedTags, 
  setSelectedTags 
}) => {
  const allTags = getAllTags(logs);
  const tagSuggestions = getTagSuggestions(searchTerm, allTags);

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-6">
      <div className="space-y-4">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            🔍 Search logs
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search in logs or type # for tags..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          
          {/* Tag Suggestions */}
          {searchTerm.startsWith('#') && tagSuggestions.length > 0 && (
            <div className="mt-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md p-2">
              <div className="flex flex-wrap gap-1">
                {tagSuggestions.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchTerm('');
                      handleTagToggle(tag);
                    }}
                    className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Available Tags */}
        {allTags.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              🏷️ Filter by tags
            </label>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active Filters */}
        {(searchTerm || selectedTags.length > 0) && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Active filters:</span>
              {searchTerm && (
                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">
                  Search: "{searchTerm}"
                </span>
              )}
              {selectedTags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                  #{tag}
                </span>
              ))}
            </div>
            <button
              onClick={clearAllFilters}
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;