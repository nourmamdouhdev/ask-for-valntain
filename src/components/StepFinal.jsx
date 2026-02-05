import { motion } from "framer-motion";
import Confetti from "react-confetti";
import useWindowSize from "../hooks/useWindowSize";

export default function StepFinal({ summary }) {
  const { width, height } = useWindowSize();

  return (
    <div className="step-inner">
      <Confetti width={width} height={height} numberOfPieces={220} recycle={false} />
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>You don’t know how much this means to me.</h1>
        <p className="subtitle">I can’t wait to make this night unforgettable.</p>

        <div className="summary">
          <div>
            <span className="summary-label">Type</span>
            <span>{summary.type}</span>
          </div>
          <div>
            <span className="summary-label">Place</span>
            <span>{summary.place}</span>
          </div>
          <div>
            <span className="summary-label">Date</span>
            <span>{summary.date}</span>
          </div>
          <div>
            <span className="summary-label">Time</span>
            <span>{summary.time}</span>
          </div>
        </div>

        <motion.div
          className="pulse-heart"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}
