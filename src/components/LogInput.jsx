import { useState } from "react";
import { motion } from "framer-motion";

function LogInput({ maxChars, input, setInput, addLog }) {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      addLog();
    }
  };

  return (
    <motion.div 
      className="w-full max-w-md glassmorphism rounded-2xl p-6 relative z-10 glow-on-hover"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ y: -5 }}
    >
      <motion.div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= maxChars) {
              setInput(value);
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyPress={handleKeyPress}
          maxLength={maxChars}
          placeholder="What's on your mind today? ✨"
          className={`w-full bg-white/30 backdrop-blur-sm border-2 rounded-xl px-4 py-3 mb-3 text-slate-700 placeholder-slate-500 focus:outline-none transition-all duration-300 ${
            isFocused ? 'border-indigo-400 shadow-lg shadow-indigo-400/30' : 'border-white/40'
          }`}
        />
        {isFocused && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl -z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          />
        )}
      </motion.div>
      
      <div className="flex justify-between items-center mb-4">
        <div
          className={`text-sm font-medium ${
            input.length === maxChars ? "text-red-500" : "text-slate-600"
          }`}
        >
          {maxChars - input.length} characters remaining
        </div>
        <div className="text-xs text-slate-500">
          Press Enter to add
        </div>
      </div>
      
      <motion.button
        onClick={addLog}
        disabled={!input.trim()}
        className={`btn-ripple w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all duration-300 ${
          input.trim() 
            ? 'hover:shadow-xl hover:scale-105 glow-on-hover' 
            : 'opacity-50 cursor-not-allowed'
        }`}
        whileTap={{ scale: 0.95 }}
        whileHover={input.trim() ? { scale: 1.02 } : {}}
      >
        ➕ Add Log
      </motion.button>
    </motion.div>
  );
}

export default LogInput;
