import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const COLORS = [
  "#f472b6",
  "#a78bfa",
  "#34d399",
  "#fbbf24",
  "#60a5fa",
  "#f87171",
];

function launchConfetti() {
  const duration = 4500;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 70,
      origin: { x: 0 },
      colors: COLORS,
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 70,
      origin: { x: 1 },
      colors: COLORS,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };

  // Big initial burst
  confetti({
    particleCount: 180,
    spread: 100,
    origin: { y: 0.55 },
    colors: COLORS,
  });

  requestAnimationFrame(frame);
}

// Swap for the real photo: put it in /public and change this path e.g. "/wife.jpg"
const WIFE_PHOTO = "/public/wife.png";

export default function FinalScreen() {
  const fired = useRef(false);

  useEffect(() => {
    if (!fired.current) {
      fired.current = true;
      launchConfetti();
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 }}
      style={{
        width: "100%",
        maxWidth: 420,
        margin: "0 auto",
        padding: "40px 28px 48px",
        borderRadius: 32,
        background: "#fff",
        boxShadow:
          "0 8px 40px rgba(167,139,250,0.22), 0 2px 8px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        textAlign: "center",
      }}
    >
      {/* Wife's photo */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        style={{
          width: 160,
          height: 160,
          position: "relative",
          borderRadius: "50%",
          flexShrink: 0,
        }}
      >
        {/* Inner circular frame keeps the photo clipped; outer wrapper allows overlay */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            border: "5px solid #f472b6",
            boxShadow:
              "0 0 0 6px #fce7f3, 0 8px 32px rgba(244,114,182,0.3)",
          }}
        >
        <img
          src={WIFE_PHOTO}
          alt="Birthday star"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        </div>

        {/* Live favicon badge on the photo frame */}
        <div
          style={{
            position: "absolute",
            top: -14,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            padding: 4,
            background: "rgba(255,255,255,0.95)",
            borderRadius: 999,
            border: "2px solid #f472b6",
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <img
            src="/favicon.svg"
            alt="Birthday clown"
            style={{ display: "block", width: 28, height: 28 }}
          />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: 32,
          fontWeight: 900,
          background: "linear-gradient(135deg, #f472b6, #a78bfa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1.2,
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        Mission Accomplished!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: "#4c1d95",
          lineHeight: 1.6,
        }}
      >
        You cracked every code and followed every clue.
        <br />
        Now go find your real present! 🎁
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{
          marginTop: 8,
          background: "linear-gradient(135deg, #fef9c3 0%, #fce7f3 100%)",
          borderRadius: 20,
          padding: "20px 24px",
          border: "2px dashed #f9a8d4",
          width: "100%",
        }}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#a855f7",
            marginBottom: 10,
          }}
        >
          🎁 Your Present is Waiting At…
        </p>
        <p
          style={{
            fontSize: 17,
            color: "#374151",
            fontWeight: 700,
            lineHeight: 1.6,
          }}
        >
          Your loved one has it!
        </p>
      </motion.div>

      {/* Re-trigger confetti button */}
      <motion.button
        whileTap={{ scale: 0.93 }}
        whileHover={{ scale: 1.05 }}
        onClick={launchConfetti}
        style={{
          marginTop: 8,
          padding: "14px 36px",
          borderRadius: 50,
          border: "none",
          background: "linear-gradient(135deg, #f472b6 0%, #a78bfa 100%)",
          color: "#fff",
          fontSize: 17,
          fontWeight: 800,
          cursor: "pointer",
          boxShadow: "0 6px 24px rgba(167,139,250,0.35)",
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        🎊 More Confetti!
      </motion.button>
    </motion.div>
  );
}
