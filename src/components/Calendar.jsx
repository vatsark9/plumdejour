import { useState } from 'react';
import {
  getCalendarDays,
  getDayNames,
  getMonthName,
  getPreviousMonth,
  getNextMonth,
  isToday,
  isCurrentMonth,
  isSameDay,
  getLogsForDate,
  formatDateKey
} from '../utils/calendarUtils';

const Calendar = ({ 
  logs, 
  selectedDate, 
  onDateSelect, 
  searchTerm = '', 
  selectedTags = [] 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const calendarDays = getCalendarDays(currentMonth);
  const dayNames = getDayNames();
  
  const navigateToPrevious = () => {
    setCurrentMonth(getPreviousMonth(currentMonth));
  };
  
  const navigateToNext = () => {
    setCurrentMonth(getNextMonth(currentMonth));
  };
  
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    onDateSelect(today);
  };
  
  const handleDateClick = (date) => {
    onDateSelect(date);
  };
  
  const getDateLogCount = (date) => {
    const logsForDate = getLogsForDate(logs, date);
    
    // Apply search and tag filters if provided
    if (searchTerm || selectedTags.length > 0) {
      return logsForDate.filter(log => {
        const logText = typeof log === 'string' ? log : log.text;
        
        const matchesSearch = !searchTerm || 
          logText.toLowerCase().includes(searchTerm.toLowerCase());
        
        const logTags = logText.match(/#([a-zA-Z0-9_]+)/g) || [];
        const normalizedLogTags = logTags.map(tag => tag.substring(1).toLowerCase());
        
        const matchesTags = selectedTags.length === 0 || 
          selectedTags.every(selectedTag => 
            normalizedLogTags.includes(selectedTag.toLowerCase())
          );
        
        return matchesSearch && matchesTags;
      }).length;
    }
    
    return logsForDate.length;
  };
  
  const renderDateCell = (date) => {
    const logCount = getDateLogCount(date);
    const isSelected = selectedDate && isSameDay(date, selectedDate);
    const isTodayDate = isToday(date);
    const isCurrentMonthDate = isCurrentMonth(date, currentMonth);
    
    return (
      <button
        key={formatDateKey(date)}
        onClick={() => handleDateClick(date)}
        className={`
          relative w-10 h-10 text-sm border border-gray-200 dark:border-gray-600 
          transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700
          ${isSelected 
            ? 'bg-indigo-500 text-white border-indigo-500 dark:border-indigo-400' 
            : isCurrentMonthDate 
              ? 'text-gray-900 dark:text-gray-100 hover:border-gray-300 dark:hover:border-gray-500' 
              : 'text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400'
          }
          ${isTodayDate && !isSelected 
            ? 'bg-indigo-100 dark:bg-indigo-900 font-semibold border-indigo-300 dark:border-indigo-700' 
            : ''
          }
        `}
      >
        {date.getDate()}
        
        {/* Log count indicator */}
        {logCount > 0 && (
          <div className={`
            absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center
            ${isSelected 
              ? 'bg-white text-indigo-500' 
              : 'bg-indigo-500 dark:bg-indigo-400 text-white'
            }
          `}>
            {logCount > 9 ? '9+' : logCount}
          </div>
        )}
        
        {/* Today indicator dot */}
        {isTodayDate && !isSelected && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-indigo-500 dark:bg-indigo-400 rounded-full" />
        )}
      </button>
    );
  };
  
  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 transition-colors duration-300">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={navigateToPrevious}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            📅 {getMonthName(currentMonth)} {currentMonth.getFullYear()}
          </h3>
          <button
            onClick={goToToday}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            Today
          </button>
        </div>
        
        <button
          onClick={navigateToNext}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Next month"
        >
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Day Names Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map(renderDateCell)}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-indigo-100 dark:bg-indigo-900 border border-indigo-300 dark:border-indigo-700 rounded" />
          <span>Today</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-indigo-500 rounded-full" />
          <span>Has logs</span>
        </div>
      </div>
      
      {/* Selected Date Info */}
      {selectedDate && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Selected: {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {getDateLogCount(selectedDate)} log(s) on this date
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;