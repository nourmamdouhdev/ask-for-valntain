import { motion } from "framer-motion";

export default function StepChoiceType({ onSelect }) {
  return (
    <div className="step-inner">
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Would you like to go to a restaurant or a cafe?</h1>
        <p className="subtitle">Pick the vibe that feels the most romantic.</p>
        <div className="button-row">
          <motion.button
            className="btn primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect("Restaurant")}
          >
            Restaurant
          </motion.button>
          <motion.button
            className="btn secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect("Cafe")}
          >
            Cafe
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
