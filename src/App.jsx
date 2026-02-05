import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import HeartsBackground from "./components/HeartsBackground.jsx";
import StepChoiceType from "./components/StepChoiceType.jsx";
import StepFinal from "./components/StepFinal.jsx";
import StepPickDateTime from "./components/StepPickDateTime.jsx";
import StepPickPlace from "./components/StepPickPlace.jsx";
import StepProposal from "./components/StepProposal.jsx";
import { cafePlaces, restaurantPlaces } from "./data/places.js";

// Simple state-machine flow to keep the steps predictable.
const STEPS = {
  PROPOSAL: "proposal",
  TYPE: "type",
  PLACE: "place",
  DATETIME: "datetime",
  FINAL: "final"
};

const stepVariants = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -24, scale: 0.98 }
};

export default function App() {
  const [step, setStep] = useState(STEPS.PROPOSAL);
  const [choiceType, setChoiceType] = useState(null);
  const [place, setPlace] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const places = useMemo(() => {
    return choiceType === "Cafe" ? cafePlaces : restaurantPlaces;
  }, [choiceType]);

  const handleTypeSelect = (type) => {
    setChoiceType(type);
    setPlace(null);
    setDate("");
    setTime("");
    setStep(STEPS.PLACE);
  };

  const summary = {
    type: choiceType ?? "",
    place: place?.name ?? "",
    date,
    time
  };

  return (
    <div className="app">
      <HeartsBackground />
      <AnimatePresence mode="wait">
        {step === STEPS.PROPOSAL && (
          <motion.div
            key="proposal"
            className="step-shell"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <StepProposal onYes={() => setStep(STEPS.TYPE)} />
          </motion.div>
        )}

        {step === STEPS.TYPE && (
          <motion.div
            key="type"
            className="step-shell"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <StepChoiceType onSelect={handleTypeSelect} />
          </motion.div>
        )}

        {step === STEPS.PLACE && (
          <motion.div
            key="place"
            className="step-shell"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <StepPickPlace
              type={choiceType}
              places={places}
              selected={place}
              onSelect={setPlace}
              onNext={() => setStep(STEPS.DATETIME)}
            />
          </motion.div>
        )}

        {step === STEPS.DATETIME && (
          <motion.div
            key="datetime"
            className="step-shell"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <StepPickDateTime
              date={date}
              time={time}
              onDateChange={setDate}
              onTimeChange={setTime}
              onNext={() => setStep(STEPS.FINAL)}
            />
          </motion.div>
        )}

        {step === STEPS.FINAL && (
          <motion.div
            key="final"
            className="step-shell"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <StepFinal summary={summary} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
