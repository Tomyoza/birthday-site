import { useState, useCallback, useEffect, useRef } from "react";
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
  const [pendingNext, setPendingNext] = useState<number | "finish" | null>(null);
  const [soundOn, setSoundOn] = useState(true);

  // Audio assets
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const sfxCorrectRef = useRef<HTMLAudioElement | null>(null);
  const sfxWrongRef = useRef<HTMLAudioElement | null>(null);
  const sfxWinRef = useRef<HTMLAudioElement | null>(null);
  const bgmStartedRef = useRef(false);

  // Audioオブジェクトをマウント時に生成し、自動再生を試みる
  useEffect(() => {
    const bgm = new Audio("/bgm/bgm.mp3");
    bgm.loop = true;
    bgm.volume = 0.1;
    bgmRef.current = bgm;

    sfxCorrectRef.current = new Audio("/bgm/correct_sound.mp3");
    sfxCorrectRef.current.volume = 0.7;
    sfxWrongRef.current = new Audio("/bgm/wrong_sound.mp3");
    sfxWrongRef.current.volume = 0.7;
    sfxWinRef.current = new Audio("/bgm/win.mp3");
    sfxWinRef.current.volume = 0.8;

    bgm.play().then(() => {
      bgmStartedRef.current = true;
    }).catch(() => {
    });

    return () => {
      bgm.pause();
    };
  }, []);

  useEffect(() => {
    const bgm = bgmRef.current;
    if (!bgm) return;
    if (soundOn) {
      void bgm.play().catch(() => {});
    } else {
      bgm.pause();
    }
  }, [soundOn]);

  const tryStartBgm = useCallback(() => {
    if (bgmStartedRef.current || !soundOn) return;
    const bgm = bgmRef.current;
    if (!bgm) return;
    bgm.play().then(() => {
      bgmStartedRef.current = true;
    }).catch(() => {});
  }, [soundOn]);

  const playSfx = useCallback(
    (which: "correct" | "wrong" | "win") => {
      if (!soundOn) return;
      const el =
        which === "correct"
          ? sfxCorrectRef.current
          : which === "wrong"
            ? sfxWrongRef.current
            : sfxWinRef.current;
      if (!el) return;
      try {
        el.currentTime = 0;
      } catch {
        // ignore
      }
      void el.play().catch(() => {});
    },
    [soundOn]
  );

  const startBgmIfAllowed = useCallback(() => {
    tryStartBgm();
  }, [tryStartBgm]);

  const TOAST_DURATION = 2800;

  // toastVisible が false になったら pendingNext を実行
  useEffect(() => {
    if (toastVisible || pendingNext === null) return;
    if (pendingNext === "finish") {
      playSfx("win");
      setFinished(true);
    } else {
      setCurrentStage(pendingNext);
    }
    setPendingNext(null);
  }, [toastVisible, pendingNext, playSfx]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), TOAST_DURATION);
  };

  const handleCorrect = useCallback(
    (successMessage: string) => {
      showToast(successMessage);
      const next = currentStage + 1;
      // タイマーではなく toastVisible の変化で切り替える
      setPendingNext(next >= STAGES.length ? "finish" : next);
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
          position: "relative",
        }}
      >
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          onClick={() => {
            setSoundOn((v) => {
              const next = !v;
              if (next) startBgmIfAllowed();
              else bgmRef.current?.pause();
              return next;
            });
          }}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            border: "2px solid rgba(167,139,250,0.35)",
            background: "rgba(255,255,255,0.8)",
            borderRadius: 999,
            padding: "8px 12px",
            cursor: "pointer",
            fontWeight: 800,
            color: "#4c1d95",
            fontFamily: "'Nunito', 'Segoe UI', sans-serif",
            boxShadow: "0 6px 20px rgba(167,139,250,0.18)",
          }}
          aria-label={soundOn ? "Mute sound" : "Unmute sound"}
          title={soundOn ? "Mute sound" : "Unmute sound"}
        >
          {soundOn ? "🔊" : "🔇"}
        </motion.button>
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
      <div style={{ width: "100%", maxWidth: finished ? "100%" : 460 }}>
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
              onWrong={() => playSfx("wrong")}
              onCorrectSfx={() => playSfx("correct")}
              onInteraction={() => startBgmIfAllowed()}
            />
          )}
        </AnimatePresence>
      </div>

      <SuccessToast message={toastMessage} visible={toastVisible} />
    </motion.div>
  );
}
