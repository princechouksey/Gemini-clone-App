import { motion } from 'framer-motion';

function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center p-4"
    >
      <div className="loading-dots flex space-x-2">
        <motion.div
          animate={{
            y: ["0%", "-50%", "0%"],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-3 h-3 bg-purple-500 rounded-full"
        />
        <motion.div
          animate={{
            y: ["0%", "-50%", "0%"],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
          className="w-3 h-3 bg-purple-500 rounded-full"
        />
        <motion.div
          animate={{
            y: ["0%", "-50%", "0%"],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
          className="w-3 h-3 bg-purple-500 rounded-full"
        />
      </div>
    </motion.div>
  );
}

export default LoadingSpinner; 