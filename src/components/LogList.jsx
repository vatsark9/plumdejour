import { motion, AnimatePresence } from 'framer-motion';

function LogList({ logs }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <motion.div 
      className="w-full max-w-md mt-8 glassmorphism rounded-2xl p-6 relative z-10 glow-on-hover"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <motion.h2 
        className="text-2xl font-semibold text-slate-700 mb-6 text-center"
        whileHover={{ scale: 1.05 }}
      >
        📝 Your Daily Journey
      </motion.h2>
      
      {logs.length > 0 ? (
        <motion.ul className="space-y-3">
          <AnimatePresence>
            {logs.map((log, index) => (
              <motion.li
                key={log.id || `${log}-${index}`}
                className="bg-white/30 backdrop-blur-sm p-4 rounded-xl border border-white/40 hover:bg-white/40 transition-all duration-300 group"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 8px 25px rgba(148, 163, 184, 0.2)"
                }}
                layout
              >
                <div className="text-slate-700 leading-relaxed group-hover:text-slate-800 transition-colors">
                  {typeof log === 'string' ? log : log.text}
                </div>
                {typeof log === 'object' && log.timestamp && (
                  <div className="text-xs text-slate-500 mt-2 flex items-center group-hover:text-slate-600 transition-colors">
                    <span className="mr-1">⏰</span>
                    {formatTime(log.timestamp)}
                  </div>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div 
            className="text-6xl mb-4"
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            📚
          </motion.div>
          <p className="text-slate-600 italic text-lg">
            Your story starts here...
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Add your first log to begin! ✨
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default LogList;
