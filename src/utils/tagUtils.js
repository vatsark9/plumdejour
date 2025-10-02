// Utility functions for handling hashtags and search

/**
 * Extract hashtags from text
 * @param {string} text - The text to extract hashtags from
 * @returns {string[]} - Array of hashtags without the # symbol
 */
export const extractTags = (text) => {
  if (!text) return [];
  const tagRegex = /#([a-zA-Z0-9_]+)/g;
  const matches = text.match(tagRegex);
  return matches ? matches.map(tag => tag.substring(1).toLowerCase()) : [];
};

/**
 * Get all unique tags from an array of logs
 * @param {Array} logs - Array of log objects
 * @returns {string[]} - Array of unique tags
 */
export const getAllTags = (logs) => {
  const allTags = new Set();
  logs.forEach(log => {
    const logText = typeof log === 'string' ? log : log.text;
    const tags = extractTags(logText);
    tags.forEach(tag => allTags.add(tag));
  });
  return Array.from(allTags).sort();
};

/**
 * Filter logs based on search term and selected tags
 * @param {Array} logs - Array of log objects
 * @param {string} searchTerm - Search term to filter by
 * @param {string[]} selectedTags - Array of selected tags
 * @returns {Array} - Filtered logs
 */
export const filterLogs = (logs, searchTerm, selectedTags) => {
  return logs.filter(log => {
    const logText = typeof log === 'string' ? log : log.text;
    const logTags = extractTags(logText);
    
    // Check search term
    const matchesSearch = !searchTerm || 
      logText.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Check tags (all selected tags must be present in the log)
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(selectedTag => 
        logTags.includes(selectedTag.toLowerCase())
      );
    
    return matchesSearch && matchesTags;
  });
};

/**
 * Highlight hashtags in text
 * @param {string} text - Text to highlight
 * @returns {string} - HTML string with highlighted hashtags
 */
export const highlightTags = (text) => {
  if (!text) return '';
  return text.replace(/#([a-zA-Z0-9_]+)/g, '<span class="tag-highlight">#$1</span>');
};

/**
 * Get tag suggestions based on existing tags and current input
 * @param {string[]} allTags - All available tags
 * @param {string} currentInput - Current input text
 * @returns {string[]} - Array of suggested tags
 */
export const getTagSuggestions = (allTags, currentInput) => {
  if (!currentInput) return [];
  
  // Find partial hashtag at the end of input
  const lastHashIndex = currentInput.lastIndexOf('#');
  if (lastHashIndex === -1) return [];
  
  const partialTag = currentInput.substring(lastHashIndex + 1).toLowerCase();
  if (!partialTag) return allTags.slice(0, 5); // Show first 5 tags when just typed #
  
  return allTags.filter(tag => 
    tag.toLowerCase().startsWith(partialTag)
  ).slice(0, 5);
};