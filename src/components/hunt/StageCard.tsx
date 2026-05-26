import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Stage } from "../../data/stages";
import PasscodeInput from "./PasscodeInput";
import ProgressBar from "./ProgressBar";
import PhotoModal from "./PhotoModal";

interface Props {
  stage: Stage;
  currentStage: number;
  totalStages: number;
  onCorrect: (successMessage: string) => void;
}

const EMOJI_BY_TYPE: Record<string, string> = {
  login: "🔐",
  stage: "🗺️",
  final: "🏆",
};

export default function StageCard({ stage, currentStage, onCorrect }: Props) {
  const [shakeKey, setShakeKey] = useState(0);
  const [locked, setLocked] = useState(false);
  const [modal, setModal] = useState<"wrong" | "correct" | null>(null);

  const handleSubmit = (value: string) => {
    if (value === stage.passcode) {
      setLocked(true);
      setModal("correct");
      // Auto-dismiss correct modal and advance after 2s
      setTimeout(() => {
        setModal(null);
        onCorrect(stage.successMessage);
      }, 2000);
    } else {
      setShakeKey((k) => k + 1);
      setModal("wrong");
    }
  };

  const hintLines = stage.hint.split("\n");

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -60, scale: 0.92 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        style={{
          width: "100%",
          maxWidth: 420,
          margin: "0 auto",
          padding: "32px 28px 36px",
          borderRadius: 32,
          background: "#fff",
          boxShadow:
            "0 8px 40px rgba(167,139,250,0.18), 0 2px 8px rgba(0,0,0,0.06)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <ProgressBar currentStage={currentStage} />

        <div style={{ textAlign: "center" }}>
          <motion.span
            animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{ fontSize: 52, display: "inline-block" }}
          >
            {EMOJI_BY_TYPE[stage.type]}
          </motion.span>
        </div>

        <h2
          style={{
            textAlign: "center",
            fontSize: 22,
            fontWeight: 900,
            color: "#4c1d95",
            lineHeight: 1.3,
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          {stage.title}
        </h2>

        <div
          style={{
            background: "linear-gradient(135deg, #fef9c3 0%, #fce7f3 100%)",
            borderRadius: 20,
            padding: "18px 20px",
            border: "2px dashed #f9a8d4",
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#a855f7",
              marginBottom: 8,
            }}
          >
            🔍 Your Clue
          </p>
          {hintLines.map((line, i) => (
            <p
              key={i}
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: "#374151",
                marginTop: i > 0 ? 8 : 0,
              }}
            >
              {line}
            </p>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!locked ? (
            <PasscodeInput
              key="input"
              onSubmit={handleSubmit}
              shakeKey={shakeKey}
            />
          ) : (
            <motion.div
              key="success"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              style={{ textAlign: "center", fontSize: 40 }}
            >
              ✅
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <PhotoModal
        type={modal}
        onDismiss={() => setModal(null)}
      />
    </>
  );
}
