import { motion } from "framer-motion";

export default function StepPickPlace({ type, places, selected, onSelect, onNext }) {
  return (
    <div className="step-inner">
      <motion.div
        className="card card-wide"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>{type === "Restaurant" ? "Choose a restaurant" : "Choose a cafe"}</h1>
        <p className="subtitle">Here are some romantic picks around Zamalek and Cairo.</p>
        <div className="place-grid">
          {places.map((place) => (
            <motion.button
              key={place.name}
              type="button"
              className={`place-card${selected?.name === place.name ? " selected" : ""}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(place)}
            >
              <h3>{place.name}</h3>
              <p>{place.vibe}</p>
            </motion.button>
          ))}
        </div>
        <div className="button-row">
          <motion.button
            className="btn primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            disabled={!selected}
          >
            Continue
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
