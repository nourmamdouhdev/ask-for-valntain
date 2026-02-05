import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

const SPRING = { type: "spring", stiffness: 320, damping: 18 };

export default function StepProposal({ onYes }) {
  const noRef = useRef(null);
  const [noPos, setNoPos] = useState({ x: 0, y: 0, rotate: 0 });

  const moveNo = useCallback(() => {
    const padding = 12;
    const button = noRef.current;
    if (!button) {
      return;
    }

    const rect = button.getBoundingClientRect();
    const maxX = Math.max(padding, window.innerWidth - rect.width - padding);
    const maxY = Math.max(padding, window.innerHeight - rect.height - padding);

    const targetX = padding + Math.random() * (maxX - padding);
    const targetY = padding + Math.random() * (maxY - padding);
    const rotate = Math.random() * 24 - 12;

    setNoPos((current) => {
      const baseLeft = rect.left - current.x;
      const baseTop = rect.top - current.y;
      const nextX = targetX - baseLeft;
      const nextY = targetY - baseTop;
      return { x: nextX, y: nextY, rotate };
    });
  }, []);

  return (
    <div className="step-inner">
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Do you want to be my Valentine?</h1>
        <p className="subtitle">I promise a night full of smiles and sweet surprises.</p>
        <div className="button-row">
          <motion.button
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
            onMouseEnter={moveNo}
            onPointerDown={(event) => {
              event.preventDefault();
              moveNo();
            }}
            onTouchStart={moveNo}
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
