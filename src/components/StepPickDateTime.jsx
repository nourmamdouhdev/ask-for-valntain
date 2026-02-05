import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));
const PERIODS = ["AM", "PM"];

function HappySelect({ label, value, options, placeholder, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handlePointer = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div className="input-label happy-select" ref={wrapperRef}>
      <span>{label}</span>
      <button
        type="button"
        className="happy-select-button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={value ? "" : "placeholder"}>{value || placeholder}</span>
        <span className={`chevron${open ? " open" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            className="happy-select-menu"
            role="listbox"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
          >
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  className={`happy-select-option${option === value ? " selected" : ""}`}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                >
                  {option}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function StepPickDateTime({ date, time, onDateChange, onTimeChange, onNext }) {
  const today = new Date().toISOString().split("T")[0];
  const canContinue = Boolean(date && time.hour && time.minute && time.period);

  return (
    <div className="step-inner">
      <motion.div
        className="card datetime-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="datetime-sparkles" aria-hidden="true">
          <span className="sparkle s1" />
          <span className="sparkle s2" />
          <span className="sparkle s3" />
        </div>

        <motion.div
          className="datetime-header"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1>Pick the perfect date & time</h1>
          <p className="subtitle">Let’s lock in a magical moment together.</p>
        </motion.div>

        <div className="datetime-body">
          <motion.div
            className="datetime-panel"
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="glow-ring" />
            <div className="clock-face" aria-hidden="true">
              <span className="clock-hand short" />
              <span className="clock-hand long" />
              <span className="clock-dot" />
            </div>
            <p className="panel-title">Our Happy Date</p>
            <p className="panel-text">A sweet, dreamy time just for us.</p>
          </motion.div>

          <motion.div
            className="datetime-form"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <label className="input-label">
              Date
              <input
                type="date"
                value={date}
                onChange={(event) => onDateChange(event.target.value)}
                min={today}
              />
            </label>

            <div className="time-selects">
              <HappySelect
                label="Hour"
                value={time.hour}
                placeholder="--"
                options={HOURS}
                onChange={(value) =>
                  onTimeChange((current) => ({ ...current, hour: value }))
                }
              />
              <HappySelect
                label="Minute"
                value={time.minute}
                placeholder="--"
                options={MINUTES}
                onChange={(value) =>
                  onTimeChange((current) => ({ ...current, minute: value }))
                }
              />
              <HappySelect
                label="AM/PM"
                value={time.period}
                placeholder="--"
                options={PERIODS}
                onChange={(value) =>
                  onTimeChange((current) => ({ ...current, period: value }))
                }
              />
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
      </motion.div>
    </div>
  );
}
