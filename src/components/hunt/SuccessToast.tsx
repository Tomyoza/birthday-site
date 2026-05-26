import { motion, AnimatePresence } from "framer-motion";

interface Props {
  message: string;
  visible: boolean;
}

export default function SuccessToast({ message, visible }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          style={{
            position: "fixed",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #34d399 0%, #059669 100%)",
            color: "#fff",
            padding: "16px 28px",
            borderRadius: 50,
            fontWeight: 800,
            fontSize: 17,
            boxShadow: "0 8px 30px rgba(52,211,153,0.4)",
            whiteSpace: "nowrap",
            zIndex: 1000,
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          🎉 {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
