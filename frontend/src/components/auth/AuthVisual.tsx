import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Logo from "@/components/common/Logo.tsx";

const CARDS = [
  {
    id: 1,
    tag: "Sprint Planning",
    tagColor: "bg-sky-400",
    title: "Design system review",
    desc: "Audit component library and update tokens for v2",
    progress: 72,
    members: ["A", "J", "K"],
    memberColors: ["bg-sky-500", "bg-violet-400", "bg-amber-400"],
  },
  {
    id: 2,
    tag: "In Progress",
    tagColor: "bg-amber-400",
    title: "API integration",
    desc: "Connect frontend to new REST endpoints and test flows",
    progress: 45,
    members: ["M", "S"],
    memberColors: ["bg-emerald-400", "bg-rose-400"],
  },
  {
    id: 3,
    tag: "Completed",
    tagColor: "bg-emerald-400",
    title: "User onboarding flow",
    desc: "Multi-step wizard with progress tracking and validation",
    progress: 100,
    members: ["R", "L", "P", "D"],
    memberColors: [
      "bg-emerald-400",
      "bg-amber-400",
      "bg-sky-400",
      "bg-rose-400",
    ],
  },
  {
    id: 4,
    tag: "Backlog",
    tagColor: "bg-slate-400",
    title: "Performance audit",
    desc: "Lighthouse scores, bundle analysis, and lazy loading",
    progress: 20,
    members: ["J"],
    memberColors: ["bg-violet-400"],
  },
];

const CARD_INTERVAL = 3500;

const SlideCard = ({
  card,
  direction,
}: {
  card: (typeof CARDS)[number];
  direction: number;
}) => (
  <motion.div
    key={card.id}
    initial={{ opacity: 0, x: direction > 0 ? 180 : -180, scale: 0.92 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: direction > 0 ? -180 : 180, scale: 0.92 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="absolute inset-0 flex items-center justify-center"
  >
    <div className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/12 shadow-2xl">
      {/* Tag */}
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-2.5 h-2.5 rounded-full ${card.tagColor}`} />
        <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">
          {card.tag}
        </span>
      </div>

      {/* Title & desc */}
      <h3 className="text-white text-xl font-bold leading-snug mb-2">
        {card.title}
      </h3>
      <p className="text-white/50 text-sm leading-relaxed mb-5">{card.desc}</p>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-white/40 text-xs font-medium">Progress</span>
          <span className="text-white/70 text-xs font-semibold">
            {card.progress}%
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${card.progress}%` }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`h-full rounded-full ${
              card.progress === 100 ? "bg-emerald-400" : "bg-emerald-400"
            }`}
          />
        </div>
      </div>

      {/* Avatars */}
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {card.members.map((m, i) => (
            <div
              key={i}
              className={`w-7 h-7 rounded-full ${card.memberColors[i]} flex items-center justify-center text-white text-xs font-bold border-2 border-emerald-700/50`}
            >
              {m}
            </div>
          ))}
        </div>
        <span className="text-white/40 text-xs ml-1">
          {card.members.length} member{card.members.length > 1 ? "s" : ""}
        </span>
      </div>
    </div>
  </motion.div>
);

const AuthVisual = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % CARDS.length);
    }, CARD_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-linear-to-br from-emerald-600 via-emerald-800 to-emerald-700">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow orbs */}
      <motion.div
        className="absolute top-[18%] left-[12%] w-80 h-80 rounded-full blur-3xl bg-emerald-400/25"
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.35, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[18%] right-[8%] w-72 h-72 rounded-full blur-3xl bg-emerald-700/20"
        animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Center headline — sits above the card */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center pointer-events-none z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-white text-3xl xl:text-4xl font-bold leading-tight mb-3"
        >
          Where teams
          <br />
          move forward
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/50 text-base max-w-xs mb-8"
        >
          Organize, track, and deliver — all in one flow.
        </motion.p>

        {/* Card carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-sm h-64"
        >
          <AnimatePresence mode="popLayout" custom={direction}>
            <SlideCard
              key={CARDS[current].id}
              card={CARDS[current]}
              direction={direction}
            />
          </AnimatePresence>
        </motion.div>

        {/* Dots indicator */}
        <div className="flex gap-2 mt-5">
          {CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-white w-6" : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Branding — top left */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-6 left-8 flex items-center gap-3 z-10"
      >
        <Logo />
      </motion.div>
    </div>
  );
};

export default AuthVisual;
