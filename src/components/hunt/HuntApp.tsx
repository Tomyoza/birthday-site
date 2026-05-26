import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { STAGES } from "../../data/stages";
import StageCard from "./StageCard";
import FinalScreen from "./FinalScreen";
import SuccessToast from "./SuccessToast";

const BG_GRADIENTS = [
  "linear-gradient(160deg, #fdf4ff 0%, #e0f2fe 100%)",
  "linear-gradient(160deg, #fef9c3 0%, #fce7f3 100%)",
  "linear-gradient(160deg, #d1fae5 0%, #e0f2fe 100%)",
  "linear-gradient(160deg, #ede9fe 0%, #fce7f3 100%)",
  "linear-gradient(160deg, #d1fae5 0%, #fef9c3 100%)",
];

export default function HuntApp() {
  const [currentStage, setCurrentStage] = useState(0);
  const [finished, setFinished] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  };

  const handleCorrect = useCallback(
    (successMessage: string) => {
      showToast(successMessage);
      const next = currentStage + 1;
      setTimeout(() => {
        if (next >= STAGES.length) {
          setFinished(true);
        } else {
          setCurrentStage(next);
        }
      }, 900);
    },
    [currentStage]
  );

  const bg = BG_GRADIENTS[currentStage % BG_GRADIENTS.length];

  return (
    <motion.div
      animate={{ background: bg }}
      transition={{ duration: 0.8 }}
      style={{
        minHeight: "100dvh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px 48px",
        fontFamily: "'Nunito', 'Segoe UI', sans-serif",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          marginBottom: 28,
          textAlign: "center",
          userSelect: "none",
        }}
      >
        <div style={{ fontSize: 38, marginBottom: 4 }}>🗝️✨</div>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 900,
            background: "linear-gradient(135deg, #f472b6, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "0.02em",
          }}
        >
          Treasure Hunt
        </h1>
      </motion.div>

      {/* Main content */}
      <div style={{ width: "100%", maxWidth: 460 }}>
        <AnimatePresence mode="wait">
          {finished ? (
            <FinalScreen key="final" />
          ) : (
            <StageCard
              key={`stage-${currentStage}`}
              stage={STAGES[currentStage]}
              currentStage={currentStage}
              totalStages={STAGES.length}
              onCorrect={handleCorrect}
            />
          )}
        </AnimatePresence>
      </div>

      <SuccessToast message={toastMessage} visible={toastVisible} />
    </motion.div>
  );
}
