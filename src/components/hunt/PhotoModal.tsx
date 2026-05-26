import { motion, AnimatePresence } from "framer-motion";

interface Props {
  type: "wrong" | "correct" | null;
  onDismiss: () => void;
}

// Swap these paths for real photos: put them in /public and use e.g. "/face-happy.jpg"
const PHOTO_WRONG = "/public/wrong.png";
const PHOTO_CORRECT = "/public/correct.png";

const CONFIG = {
  wrong: {
    photo: PHOTO_WRONG,
    emoji: "😬",
    message: "Nope… that's not it!",
    caption: "Try again 👇",
    accent: "#f43f5e",
    bg: "rgba(244,63,94,0.12)",
    btnLabel: "Let me try again",
    btnColor: "linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)",
  },
  correct: {
    photo: PHOTO_CORRECT,
    emoji: "🥳",
    message: "YES! That's correct!",
    caption: "Moving to the next clue…",
    accent: "#34d399",
    bg: "rgba(52,211,153,0.12)",
    btnLabel: null,
    btnColor: "",
  },
};

export default function PhotoModal({ type, onDismiss }: Props) {
  const cfg = type ? CONFIG[type] : null;

  return (
    <AnimatePresence>
      {type && cfg && (
        <motion.div
          key={type + "-backdrop"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={type === "wrong" ? onDismiss : undefined}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
            padding: 24,
          }}
        >
          <motion.div
            key={type + "-card"}
            initial={{ scale: 0.7, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 380, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 28,
              padding: "28px 24px 24px",
              maxWidth: 340,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              boxShadow: `0 12px 48px ${cfg.bg}, 0 2px 8px rgba(0,0,0,0.1)`,
              border: `3px solid ${cfg.accent}`,
            }}
          >
            {/* Photo */}
            <motion.div
              animate={type === "wrong" ? { rotate: [-2, 2, -2, 2, 0] } : { scale: [1, 1.04, 1] }}
              transition={{ duration: 0.5 }}
              style={{
                width: 180,
                height: 180,
                borderRadius: "50%",
                overflow: "hidden",
                border: `4px solid ${cfg.accent}`,
                boxShadow: `0 4px 20px ${cfg.bg}`,
                flexShrink: 0,
              }}
            >
              <img
                src={cfg.photo}
                alt={type === "wrong" ? "Wrong answer face" : "Correct answer face"}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </motion.div>

            {/* Text */}
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 36, lineHeight: 1 }}>{cfg.emoji}</p>
              <p
                style={{
                  marginTop: 8,
                  fontSize: 22,
                  fontWeight: 900,
                  color: cfg.accent,
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                {cfg.message}
              </p>
              <p
                style={{
                  marginTop: 4,
                  fontSize: 15,
                  color: "#6b7280",
                  fontWeight: 600,
                }}
              >
                {cfg.caption}
              </p>
            </div>

            {/* Button — only shown for wrong */}
            {cfg.btnLabel && (
              <motion.button
                whileTap={{ scale: 0.93 }}
                whileHover={{ scale: 1.04 }}
                onClick={onDismiss}
                style={{
                  width: "100%",
                  padding: "14px 0",
                  borderRadius: 50,
                  border: "none",
                  background: cfg.btnColor,
                  color: "#fff",
                  fontSize: 17,
                  fontWeight: 800,
                  cursor: "pointer",
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                {cfg.btnLabel}
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
