import { motion } from "framer-motion";
import { STAGES } from "../../data/stages";

interface Props {
  currentStage: number;
}

const STAGE_DOTS = STAGES.filter((s) => s.type !== "login");

export default function ProgressBar({ currentStage }: Props) {
  // currentStage 0 = login (not shown), 1+ = real stages
  const activeIndex = currentStage - 1;

  if (currentStage === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        marginBottom: 24,
      }}
    >
      {STAGE_DOTS.map((s, i) => {
        const done = i < activeIndex;
        const active = i === activeIndex;
        return (
          <motion.div
            key={s.id}
            initial={false}
            animate={{
              scale: active ? 1.3 : 1,
              backgroundColor: done
                ? "#34d399"
                : active
                ? "#f472b6"
                : "#e2e8f0",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              boxShadow: active ? "0 0 0 4px #f9a8d4" : "none",
            }}
          />
        );
      })}
    </div>
  );
}
