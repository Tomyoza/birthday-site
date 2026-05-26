import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onSubmit: (value: string) => void;
  shakeKey: number;
  disabled?: boolean;
}

const shakeVariants = {
  idle: { x: 0 },
  shake: {
    x: [0, -10, 10, -10, 10, -6, 6, -3, 3, 0],
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function PasscodeInput({ onSubmit, shakeKey, disabled }: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().length === 0) return;
    onSubmit(value.trim());
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <motion.div
        key={shakeKey}
        variants={shakeVariants}
        initial="idle"
        animate={shakeKey > 0 ? "shake" : "idle"}
        style={{ width: "100%" }}
      >
        <input
          ref={inputRef}
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter passcode…"
          disabled={disabled}
          maxLength={12}
          style={{
            width: "100%",
            fontSize: 28,
            fontWeight: 700,
            textAlign: "center",
            letterSpacing: "0.25em",
            padding: "18px 20px",
            borderRadius: 20,
            border: "3px solid #f9a8d4",
            background: "#fff",
            color: "#1e1b4b",
            outline: "none",
            boxShadow: "0 4px 20px rgba(244,114,182,0.18)",
            transition: "border-color 0.2s",
            fontFamily: "'Nunito', 'Fredoka One', sans-serif",
          }}
        />
      </motion.div>

      <motion.button
        type="submit"
        disabled={disabled || value.trim().length === 0}
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.04 }}
        style={{
          marginTop: 16,
          width: "100%",
          padding: "18px 0",
          borderRadius: 50,
          border: "none",
          background: "linear-gradient(135deg, #f472b6 0%, #a78bfa 100%)",
          color: "#fff",
          fontSize: 20,
          fontWeight: 800,
          cursor: "pointer",
          boxShadow: "0 6px 24px rgba(167,139,250,0.35)",
          letterSpacing: "0.04em",
          fontFamily: "'Nunito', 'Fredoka One', sans-serif",
        }}
      >
        🔓 Unlock
      </motion.button>

      <AnimatePresence>
        {shakeKey > 0 && (
          <motion.p
            key="error-msg"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              marginTop: 12,
              textAlign: "center",
              color: "#f43f5e",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            ❌ Wrong passcode — try again!
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
