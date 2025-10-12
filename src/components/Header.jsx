import { motion } from 'framer-motion';

function Header() {
  return (
    <motion.header 
      className="mb-8 text-center relative z-10"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1 
        className="text-5xl font-bold bg-gradient-to-r from-slate-700 to-indigo-600 bg-clip-text text-transparent mb-2 tracking-tight"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        plumdejour
      </motion.h1>
      <motion.p 
        className="text-xl text-slate-600 font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        ✨ Your Beautiful Daily Log Tracker ✨
      </motion.p>
      <motion.div 
        className="mt-4 w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"
        initial={{ width: 0 }}
        animate={{ width: 96 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
      />
    </motion.header>
  );
}
