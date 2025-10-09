import { motion } from 'framer-motion';

function Footer() {
  return (
    <motion.footer 
      className="mt-12 text-center relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <motion.div 
        className="text-slate-600 font-medium"
        whileHover={{ scale: 1.05, color: "rgb(71, 85, 105)" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Made with 
        <motion.span
          className="inline-block mx-1"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -10, 10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          💜
        </motion.span>
        for Hacktoberfest
      </motion.div>
      
      <motion.div 
        className="mt-2 text-slate-500 text-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        ✨ Track your journey, one log at a time ✨
      </motion.div>
    </motion.footer>
  );
}

export default Footer;
