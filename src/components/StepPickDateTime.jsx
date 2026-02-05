import { motion } from "framer-motion";

export default function StepPickDateTime({ date, time, onDateChange, onTimeChange, onNext }) {
  const today = new Date().toISOString().split("T")[0];
  const canContinue = Boolean(date && time);

  return (
    <div className="step-inner">
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Pick the perfect date & time</h1>
        <p className="subtitle">I want it to be just right for us.</p>
        <div className="input-row">
          <label className="input-label">
            Date
            <input
              type="date"
              value={date}
              onChange={(event) => onDateChange(event.target.value)}
              min={today}
            />
          </label>
          <label className="input-label">
            Time
            <input
              type="time"
              value={time}
              onChange={(event) => onTimeChange(event.target.value)}
            />
          </label>
        </div>
        <div className="button-row">
          <motion.button
            className="btn primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            disabled={!canContinue}
          >
            Confirm
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
