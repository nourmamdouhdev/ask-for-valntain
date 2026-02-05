import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

const SPRING = { type: "spring", stiffness: 320, damping: 18 };

export default function StepProposal({ onYes }) {
  const cardRef = useRef(null);
  const yesRef = useRef(null);
  const noRef = useRef(null);
  const [noPos, setNoPos] = useState({ x: 0, y: 0, rotate: 0 });

  const moveNo = useCallback(() => {
    const padding = 16;
    const card = cardRef.current;
    const yesButton = yesRef.current;
    const button = noRef.current;
    if (!button || !card || !yesButton) {
      return;
    }

    const cardRect = card.getBoundingClientRect();
    const yesRect = yesButton.getBoundingClientRect();
    const rect = button.getBoundingClientRect();

    const maxX = Math.max(padding, cardRect.width - rect.width - padding);
    const maxY = Math.max(padding, cardRect.height - rect.height - padding);

    const yesLeft = yesRect.left - cardRect.left;
    const yesTop = yesRect.top - cardRect.top;

    const baseX = yesLeft + yesRect.width + 16;
    const baseY = yesTop;

    const offsetX = (Math.random() * 2 - 1) * 80;
    const offsetY = (Math.random() * 2 - 1) * 20;

    const rawX = baseX + offsetX;
    const rawY = baseY + offsetY;
    const targetX = Math.min(maxX, Math.max(padding, rawX));
    const targetY = Math.min(maxY, Math.max(padding, rawY));
    const rotate = Math.random() * 24 - 12;

    setNoPos((current) => {
      const baseLeft = rect.left - current.x;
      const baseTop = rect.top - current.y;
      const targetAbsLeft = cardRect.left + targetX;
      const targetAbsTop = cardRect.top + targetY;
      return {
        x: targetAbsLeft - baseLeft,
        y: targetAbsTop - baseTop,
        rotate
      };
    });
  }, []);

  return (
    <div className="step-inner">
      <motion.div
        ref={cardRef}
        className="card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Do you want to be my Valentine?</h1>
        <p className="subtitle">I promise a night full of smiles and sweet surprises.</p>
        <div className="button-row">
          <motion.button
            ref={yesRef}
            className="btn primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={onYes}
          >
            Yes
          </motion.button>
          <motion.button
            ref={noRef}
            className="btn ghost no-btn"
            animate={{ x: noPos.x, y: noPos.y, rotate: noPos.rotate }}
            transition={SPRING}
            whileHover={{ scale: 1.05 }}
            onPointerDown={(event) => {
              event.preventDefault();
              moveNo();
            }}
            onClick={(event) => {
              event.preventDefault();
              moveNo();
            }}
            aria-label="No"
          >
            No
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
