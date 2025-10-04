// Calendar utility functions

/**
 * Get the first day of the month
 * @param {Date} date - The date to get the first day for
 * @returns {Date} - First day of the month
 */
export const getFirstDayOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Get the last day of the month
 * @param {Date} date - The date to get the last day for
 * @returns {Date} - Last day of the month
 */
export const getLastDayOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Get all days in a month for calendar display
 * @param {Date} date - The date to get the month for
 * @returns {Array<Date>} - Array of dates including padding from previous/next month
 */
export const getCalendarDays = (date) => {
  const firstDay = getFirstDayOfMonth(date);
  const lastDay = getLastDayOfMonth(date);
  const startDate = new Date(firstDay);
  
  // Start from the Sunday of the week containing the first day
  startDate.setDate(startDate.getDate() - startDate.getDay());
  
  const days = [];
  const currentDate = new Date(startDate);
  
  // Generate 42 days (6 weeks) for a complete calendar grid
  for (let i = 0; i < 42; i++) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return days;
};

/**
 * Check if two dates are the same day
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {boolean} - True if same day
 */
export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Check if a date is today
 * @param {Date} date - Date to check
 * @returns {boolean} - True if today
 */
export const isToday = (date) => {
  return isSameDay(date, new Date());
};

/**
 * Check if a date is in the current month
 * @param {Date} date - Date to check
 * @param {Date} currentMonth - Current month reference
 * @returns {boolean} - True if in current month
 */
export const isCurrentMonth = (date, currentMonth) => {
  return (
    date.getFullYear() === currentMonth.getFullYear() &&
    date.getMonth() === currentMonth.getMonth()
  );
};

/**
 * Format date as YYYY-MM-DD
 * @param {Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export const formatDateKey = (date) => {
  return date.toLocaleDateString('en-CA'); // Returns YYYY-MM-DD format
};

/**
 * Parse date from YYYY-MM-DD string
 * @param {string} dateString - Date string to parse
 * @returns {Date} - Parsed date
 */
export const parseDateKey = (dateString) => {
  return new Date(dateString + 'T00:00:00');
};

/**
 * Group logs by date
 * @param {Array} logs - Array of log objects
 * @returns {Object} - Object with date keys and log arrays as values
 */
export const groupLogsByDate = (logs) => {
  const grouped = {};
  
  logs.forEach(log => {
    let logDate;
    
    if (log.date) {
      // Handle different date formats
      if (typeof log.date === 'string') {
        // Try to parse the date string
        logDate = new Date(log.date);
        if (isNaN(logDate.getTime())) {
          // If parsing fails, try to parse as local date string
          logDate = new Date(log.date.replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'));
        }
      } else {
        logDate = new Date(log.date);
      }
    } else if (log.timestamp) {
      logDate = new Date(log.timestamp);
    } else {
      logDate = new Date(); // Fallback to today
    }
    
    const dateKey = formatDateKey(logDate);
    
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    
    grouped[dateKey].push(log);
  });
  
  return grouped;
};

/**
 * Get logs for a specific date
 * @param {Array} logs - Array of log objects
 * @param {Date} date - Date to get logs for
 * @returns {Array} - Array of logs for the date
 */
export const getLogsForDate = (logs, date) => {
  const dateKey = formatDateKey(date);
  const groupedLogs = groupLogsByDate(logs);
  return groupedLogs[dateKey] || [];
};

/**
 * Get month name
 * @param {Date} date - Date to get month name for
 * @returns {string} - Month name
 */
export const getMonthName = (date) => {
  return date.toLocaleDateString('en-US', { month: 'long' });
};

/**
 * Get abbreviated day names
 * @returns {Array<string>} - Array of day names
 */
export const getDayNames = () => {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
};

/**
 * Navigate to previous month
 * @param {Date} currentDate - Current date
 * @returns {Date} - Previous month date
 */
export const getPreviousMonth = (currentDate) => {
  return new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
};

/**
 * Navigate to next month
 * @param {Date} currentDate - Current date
 * @returns {Date} - Next month date
 */
export const getNextMonth = (currentDate) => {
  return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
};