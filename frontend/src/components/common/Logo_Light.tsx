import { motion } from "motion/react";
import { Link } from "react-router";

type LogoListProps = {
  isAnimated?: boolean;
};

const Logo_Light = ({ isAnimated = true }: LogoListProps) => {
  return (
    <Link to={'/'} >
      <div className="flex items-center gap-2">
        <motion.div
          className="w-10 h-10 rounded-xl bg-emerald-600 backdrop-blur-lg flex items-center justify-center
      border border-emerald-600/50 shadow-lg shadow-emerald-600/20"
          animate={
            isAnimated
              ? {
                  x: [0, 2, 0, -2, 0],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }
              : undefined
          }
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </motion.div>
        <div>
          <p className="text-black font-semibold text-lg tracking-tight">
            TaskFlow
          </p>
          <p className="text-gray-500 text-xs">Manage tasks that matter</p>
        </div>
      </div>
    </Link>
  );
};

export default Logo_Light;
