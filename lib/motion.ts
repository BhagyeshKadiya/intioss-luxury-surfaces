export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export const fadeInRise = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: LUXURY_EASE,
    },
  },
};

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const imageReveal = {
  hidden: {
    clipPath: "inset(0% 0% 100% 0%)",
    scale: 1.12,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: {
      duration: 1.1,
      ease: LUXURY_EASE,
    },
  },
};

export const hexagonDrawVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.2, ease: "easeInOut" },
      opacity: { duration: 0.3 },
    },
  },
};

export const curtainVariants = {
  initial: { y: "0%" },
  animate: {
    y: "-100%",
    transition: {
      duration: 0.9,
      ease: LUXURY_EASE,
      delay: 0.2,
    },
  },
  exit: {
    y: "0%",
    transition: {
      duration: 0.6,
      ease: LUXURY_EASE,
    },
  },
};
