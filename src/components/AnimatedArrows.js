import { motion } from "framer-motion";

export default function AnimatedArrows({ content, className }) {
  return (
    <div className={`relative flex ${className}`}>
      {/* Left Arrow Animation */}
      <motion.span
        initial={{ x: -10 }}
        animate={{ x: 0 }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 10,
          repeat: Infinity,
          repeatType: "reverse",
          duration: 0.6,
        }}
      >
        ▸
      </motion.span>

      <span>{content}</span>

      {/* Right Arrow Animation */}
      <motion.span
        initial={{ x: 10 }}
        animate={{ x: 0 }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 10,
          repeat: Infinity,
          repeatType: "reverse",
          duration: 0.6,
        }}
      >
        ◂
      </motion.span>
    </div>
  );
}
