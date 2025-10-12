import { motion, AnimatePresence } from 'framer-motion';

function Summary({ summary }) {
  if (!summary) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        className="mt-8 glassmorphism rounded-2xl p-6 glow-on-hover"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.95 }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 100
        }}
        whileHover={{ y: -5 }}
      >
        <motion.h2 
          className="text-2xl font-semibold text-slate-700 mb-4 text-center flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <span>📋</span>
          Daily Summary
          <span>✨</span>
        </motion.h2>
        
        <motion.div 
          className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-slate-700 leading-relaxed text-center italic">
            "{summary}"
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-slate-600 text-sm">
            Generated with 💜
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Summary;
