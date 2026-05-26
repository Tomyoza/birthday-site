import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const SLIDES: string[] = [
  '/slides/1.jpeg', '/slides/2.jpeg', '/slides/3.jpeg',
  '/slides/4.jpeg', '/slides/5.jpeg', '/slides/6.jpeg',
];

// 写真なし時のグラデーションプレースホルダー
const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(135deg, #fce7f3 0%, #ede9fe 50%, #dbeafe 100%)",
  "linear-gradient(135deg, #fef9c3 0%, #fce7f3 50%, #ede9fe 100%)",
  "linear-gradient(135deg, #d1fae5 0%, #dbeafe 50%, #fce7f3 100%)",
  "linear-gradient(135deg, #ede9fe 0%, #d1fae5 50%, #fef9c3 100%)",
];

/** 1枚ずつ表示する間隔（ミリ秒） */
const INTERVAL_MS = 4000;

/** フェード時間（秒） */
const FADE_DURATION = 1.2;

export default function SlideshowBg() {
  const hasPhotos = SLIDES.length > 0;
  const items = hasPhotos ? SLIDES : PLACEHOLDER_GRADIENTS;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: index,
            ...(hasPhotos
              ? {
                  backgroundImage: `url(${items[index]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {
                  background: items[index] as string,
                }),
          }}
        />
      </AnimatePresence>

      {/* 写真の上に薄いオーバーレイ（カードが読みやすくなる） */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hasPhotos
            ? "rgba(255,255,255,0.35)"
            : "rgba(255,255,255,0.15)",
          backdropFilter: hasPhotos ? "blur(2px)" : undefined,
        }}
      />
    </div>
  );
}
