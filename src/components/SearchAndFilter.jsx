import { useState } from 'react';
import { getAllTags } from '../utils/tagUtils';

const SearchAndFilter = ({ 
  logs, 
  searchTerm, 
  setSearchTerm, 
  selectedTags, 
  setSelectedTags 
}) => {
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const allTags = getAllTags(logs);

  const handleTagSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setShowTagSuggestions(false);
  };

  const handleTagRemove = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  const hasActiveFilters = searchTerm.trim() || selectedTags.length > 0;

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        🔍 Search & Filter
      </h3>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search logs..."
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors duration-300 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>

      {/* Tag Suggestions */}
      {allTags.length > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Available Tags
            </span>
            <button
              onClick={() => setShowTagSuggestions(!showTagSuggestions)}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
            >
              {showTagSuggestions ? 'Hide' : 'Show'}
            </button>
          </div>
          
          {showTagSuggestions && (
            <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagSelect(tag)}
                  disabled={selectedTags.includes(tag)}
                  className={`px-2 py-1 rounded-full text-xs transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-indigo-200 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 cursor-not-allowed'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 cursor-pointer'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            Active Filters:
          </span>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
              >
                #{tag}
                <button
                  onClick={() => handleTagRemove(tag)}
                  className="ml-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
                  aria-label={`Remove ${tag} filter`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full bg-gray-500 dark:bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors duration-300 text-sm"
        >
          Clear All Filters
        </button>
      )}

      {/* Filter Stats */}
      {hasActiveFilters && (
        <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 text-center">
          {searchTerm && `Search: "${searchTerm}"`}
          {searchTerm && selectedTags.length > 0 && ' • '}
          {selectedTags.length > 0 && `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''} selected`}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;